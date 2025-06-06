import { cloneDeep, get, set } from "lodash-es";

export const utils = {
  /**
   * 重置对象属性，只适合最外层
   * @param object
   * @param exclude  保留得属性
   */
  resetObjectProperties(object: Record<string, any>, exclude: string[] = []) {
    for (const key in object) {
      if (!exclude.includes(key)) {
        object[key] = undefined;
      }
    }
  },
  /**
   * 根据子节点的值查找父节点
   * @param tree 树形数据
   * @param childValue 子节点的值
   * @param options 配置项：{ idKey, childrenKey }
   * @returns 父节点对象，如果未找到返回null
   */
  findParentNode(tree: any[], childValue: any, props = { id: "id", children: "children" }): any | null {
    const { id = "id", children = "children" } = props;

    function helper(nodes: any[], parent: any = null): any | null {
      for (const node of nodes) {
        if (node[id] === childValue) {
          return parent;
        }
        if (Array.isArray(node[children])) {
          const found = helper(node[children], node);
          if (found) return found;
        }
      }
      return null;
    }

    return helper(tree, tree);
  },

  /**
   * 创建一个智能重置器函数，用于根据模板数据重置目标对象的属性（深克隆模板值），但保留目标对象的引用。
   * 仅适用于 Vue 的响应式对象（如 reactive/ref），不会替换目标对象本身，只会重置其属性值。
   *
   * 支持的重置方式：
   * 1. resetTarget(obj) - 重置对象的所有属性为初始值。
   * 2. resetTarget(obj, ['name', 'age']) - 重置指定的属性（支持点路径）。
   * 3. resetTarget(obj, { include: ['name'], exclude: ['id'] }) - 通过包含/排除列表重置属性。
   * 4. resetTarget(obj, (key, value) => boolean) - 通过自定义过滤函数决定重置哪些属性。
   *
   * @template T 对象类型
   * @param originalData 模板数据，作为重置的初始值来源
   * @returns 智能重置函数 resetTarget
   */
  createSmartResetter<T extends Record<string, any>>(originalData: T) {
    const template = cloneDeep(originalData);

    return function resetTarget(
      target: T,
      config?: string[] | { include?: string[]; exclude?: string[] } | ((key: string, value: any) => boolean) | undefined,
    ): T {
      if (config === undefined) {
        Object.keys(template).forEach((key) => {
          target[key] = cloneDeep(template[key]);
        });
        return target;
      }

      if (Array.isArray(config)) {
        config.forEach((path) => {
          set(target, path, cloneDeep(get(template, path)));
        });
        return target;
      }

      if (typeof config === "object" && config !== null && !(config instanceof Function)) {
        const { include, exclude } = config;
        Object.keys(template).forEach((key) => {
          let shouldReset = true;
          if (include && include.length > 0) shouldReset = include.includes(key);
          if (exclude && exclude.length > 0) shouldReset = shouldReset && !exclude.includes(key);
          if (shouldReset) target[key] = cloneDeep(template[key]);
        });
        return target;
      }

      if (typeof config === "function") {
        Object.keys(template).forEach((key) => {
          if (config(key, template[key])) {
            target[key] = cloneDeep(template[key]);
          }
        });
        return target;
      }

      return target;
    };
  },
};
