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
