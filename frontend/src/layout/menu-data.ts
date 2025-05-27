import { Menu, MenuType, SubMenuType } from "./index";

// 系统管理模块的静态菜单数据
export const systemManagementMenus: Menu[] = [
  // 系统管理目录
  new Menu({
    id: nanoid(),
    name: "系统管理",
    type: MenuType.FOLDER,
    icon: "Setting",
    order: 1,
    children: [
      // 用户管理菜单 - 通用表单类型
      new Menu({
        id: "1",
        name: "用户管理",
        type: MenuType.MENU,
        subType: SubMenuType.GENERAL_FORM,
        value: "user-manage-form",
        icon: "User",
        order: 1,
        children: [],
      }),

      // 角色管理菜单 - 自定义表单类型
      new Menu({
        id: nanoid(),
        name: "角色管理",
        type: MenuType.MENU,
        subType: SubMenuType.INTERNAL,
        value: "role-management",
        icon: "UserFilled",
        order: 2,
        children: [],
      }),
      // 外链百度 - 外部菜单类型
      new Menu({
        id: nanoid(),
        name: "外链百度",
        type: MenuType.MENU,
        subType: SubMenuType.EXTERNAL_MENU,
        value: "https://www.baidu.com",
        icon: "Link",
        order: 3,
        children: [],
      }),
    ],
  }),

  // 数据管理目录
  new Menu({
    id: nanoid(),
    name: "数据管理",
    type: MenuType.FOLDER,
    icon: "DataLine",
    order: 2,
    children: [
      // 数据字典 - 外部菜单类型
      new Menu({
        id: nanoid(),
        name: "数据字典",
        type: MenuType.MENU,
        subType: SubMenuType.EXTERNAL_MENU,
        value: "https://example.com/data-dictionary",
        icon: "Document",
        order: 1,
        children: [],
      }),

      // 数据报表 - 通用表单类型
      new Menu({
        id: nanoid(),
        name: "数据报表",
        type: MenuType.MENU,
        subType: SubMenuType.GENERAL_FORM,
        value: "data-report-form",
        icon: "PieChart",
        order: 2,
        children: [],
      }),
    ],
  }),

  // 开发工具目录
  new Menu({
    id: nanoid(),
    name: "开发工具",
    type: MenuType.FOLDER,
    icon: "Tools",
    order: 3,
    children: [
      // 表单设计器 - 自定义表单类型
      new Menu({
        id: nanoid(),
        name: "表单设计器",
        type: MenuType.MENU,
        subType: SubMenuType.INTERNAL,
        value: "form-designer",
        icon: "Edit",
        order: 1,
        children: [],
      }),

      // 代码生成器 - 自定义表单类型
      new Menu({
        id: nanoid(),
        name: "代码生成器",
        type: MenuType.MENU,
        subType: SubMenuType.INTERNAL,
        value: "code-generator",
        icon: "CPU",
        order: 2,
        children: [],
      }),
    ],
  }),
];

// 一个使用示例函数，用于初始化系统菜单
export function initSystemMenu(systemId: string): Menu[] {
  return systemManagementMenus.map((menu) => {
    // 深拷贝菜单，避免修改原始数据
    return JSON.parse(JSON.stringify(menu));
  });
}
