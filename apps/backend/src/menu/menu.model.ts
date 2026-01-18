enum Type {
  FOLDER = "folder",
  PAGE = "page",
  BUTTON = "button",
}

enum PageType {
  LINK = "link", //http://www.baidu.com
  VIEW = "view", //内部视图
  FORM = "form", //自动表单
}

export class Menu {
  static Type = Type;
  static PageType = PageType;
  id?: string;
  name: string = "";

  type: Type = Type.FOLDER;

  pageType?: PageType = PageType.FORM;

  value: string;

  icon?: string;

  parentId: string;

  order: number;

  systemId: string;

  children?: Menu[];
}
