import { cloneDeep, get, set } from "lodash-es";

type ResetConfig = string[] | { include?: string[]; exclude?: string[] } | ((path: string, value: any) => boolean) | undefined;

/**
 * 创建一个智能重置器函数，用于根据模板数据重置目标对象的属性（深克隆模板值），但保留目标对象的引用。
 * 仅适用于 Vue 的响应式对象（如 reactive/ref），不会替换目标对象本身，只会重置其属性值。
 *
 * 支持的重置方式：
 * 1. resetTarget(obj) - 重置对象的所有属性为初始值。
 * 2. resetTarget(obj, ['name', 'user']) - 重置指定的属性（会完整重置整个属性及子属性）。
 * 3. resetTarget(obj, { exclude: ['id', 'createdAt'] }) - 重置除了指定属性外的所有属性。
 * 4. resetTarget(obj, { include: ['user'], exclude: ['user.password'] }) - 重置user属性但排除user.password。
 * 5. resetTarget(obj, (path, value) => boolean) - 通过自定义过滤函数决定重置哪些属性。
 *
 * 注意：include 中的 'user' 会重置整个 user 对象，等同于 'user.*' 或 'user.**'
 *
 * @template T 对象类型
 * @param originalData 模板数据，作为重置的初始值来源
 * @returns 智能重置函数 resetTarget
 */
export function createSmartResetter<T extends Record<string, any>>(originalData: T) {
  const template = cloneDeep(originalData);

  // 缓存所有路径，避免重复计算
  const allPaths = getAllPaths(template);

  // 获取对象所有路径（用于函数配置和exclude精确匹配）
  function getAllPaths(obj: any, prefix = ""): string[] {
    const paths: string[] = [];

    function traverse(current: any, currentPath: string) {
      if (currentPath) paths.push(currentPath);

      if (typeof current === "object" && current !== null && !Array.isArray(current)) {
        Object.keys(current).forEach((key) => {
          const newPath = currentPath ? `${currentPath}.${key}` : key;
          traverse(current[key], newPath);
        });
      }
    }

    traverse(obj, prefix);
    return paths;
  }

  // 检查路径是否应该被排除
  function shouldExclude(path: string, excludePatterns: string[]): boolean {
    return excludePatterns.some((pattern) => {
      // 精确匹配
      if (pattern === path) return true;
      // 前缀匹配：如果 exclude 'user'，则排除所有 'user.xxx' 路径
      if (path.startsWith(pattern + ".")) return true;
      return false;
    });
  }

  // 根据配置确定要重置的路径
  function getResetPaths(config: any): string[] {
    // 无配置：重置所有根级属性
    if (config === undefined) {
      return Object.keys(template);
    }

    // 数组配置：重置指定的路径
    if (Array.isArray(config)) {
      return config;
    }

    // 对象配置：处理 include 和 exclude
    if (typeof config === "object" && config !== null && !(config instanceof Function)) {
      const { include, exclude } = config;
      let pathsToReset: string[] = [];

      if (include && include.length > 0) {
        // 有 include：使用 include 的路径
        pathsToReset = [...include];
      } else {
        // 无 include：使用所有根级属性
        pathsToReset = Object.keys(template);
      }

      // 应用 exclude 过滤
      if (exclude && exclude.length > 0) {
        const finalPaths: string[] = [];

        pathsToReset.forEach((resetPath) => {
          // 检查这个路径是否被完全排除
          if (shouldExclude(resetPath, exclude)) {
            return; // 跳过这个路径
          }

          // 检查是否有子路径被排除
          const excludedSubPaths = exclude.filter((excludePath: string) => excludePath.startsWith(resetPath + ".") && excludePath !== resetPath);

          if (excludedSubPaths.length === 0) {
            // 没有子路径被排除，直接重置整个路径
            finalPaths.push(resetPath);
          } else {
            // 有子路径被排除，只重置未被排除的子路径
            const subPaths = allPaths.filter((path: string) => path.startsWith(resetPath + ".") && !shouldExclude(path, exclude));

            finalPaths.push(...subPaths);
          }
        });

        return [...new Set(finalPaths)];
      }

      return pathsToReset;
    }

    // 函数配置：遍历所有路径
    if (typeof config === "function") {
      return allPaths.filter((path) => {
        const value = get(template, path);
        return config(path, value);
      });
    }

    return [];
  }

  return function resetTarget(target: T, config?: ResetConfig): T {
    const pathsToReset = getResetPaths(config);
    console.log("看一下路径", pathsToReset);

    pathsToReset.forEach((path) => {
      const templateValue = get(template, path);
      set(target, path, cloneDeep(templateValue));
    });

    return target;
  };
}
