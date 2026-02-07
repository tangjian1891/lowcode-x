// 定义一个基础约束，告诉 TS 这些字段一定存在
export interface BaseNode {
  id: string;
  parentId?: string | null;
  children?: BaseNode[];
  [key: string]: any; // 允许其他任意属性
}

export function listToTree<T extends BaseNode>(list: T[]) {
  const tree: T[] = [];
  const map = new Map<string, T>();

  list.forEach((item) => {
    const node = { ...item, children: [] };
    map.set(item.id, node);
  });

  list.forEach((item) => {
    const parent = map.get(item.parentId!);
    const node = map.get(item.id);
    if (parent) {
      parent.children!.push(node!);
    } else {
      tree.push(node!);
    }
  });
  return tree;
}

export function treeToList<T extends BaseNode>(tree: T[]) {
  const list: T[] = [];

  function traverse(items: T[]) {
    items.forEach((item) => {
      const { children, ...rest } = item as any;
      list.push(rest as T);

      if (children && children.length > 0) {
        traverse(children);
      }
    });
  }

  traverse(tree);
  return list;
}

// 带引用
export function flattenTreeToMapping<T extends BaseNode>(tree: T[]) {
  const mapping = {} as Record<string, T>;

  function traverse(items: T[]) {
    items.forEach((item) => {
      mapping[item.id] = item;
      if (item.children && item.children.length > 0) {
        traverse(item.children as T[]);
      }
    });
  }

  traverse(tree);
  return mapping;
}

export function resetObjectProperties(obj: any, excludes: string[] = []) {
  Object.keys(obj).forEach((key) => {
    if (!excludes.includes(key)) {
      if (typeof obj[key] === "string") {
        obj[key] = "";
      } else if (typeof obj[key] === "number") {
        obj[key] = 0;
      } else if (Array.isArray(obj[key])) {
        obj[key] = [];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        resetObjectProperties(obj[key], excludes);
      }
    }
  });
}

export function findParentNode<T extends BaseNode>(tree: T[], targetId: string): T[] | null {
  for (const node of tree) {
    if (node.children) {
      if (node.children.some((child) => child.id === targetId)) {
        return node.children as T[];
      }
      const parent = findParentNode(node.children as T[], targetId);
      if (parent) return parent;
    }
  }
  return null;
}
