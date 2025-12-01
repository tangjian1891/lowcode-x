import { cloneDeep, get, set } from "lodash-es";
import { createSmartResetter } from "./utils-components/create-smart-resetter";

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

  createSmartResetter,
};
