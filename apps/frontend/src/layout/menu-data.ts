import { Menu } from "./index";

// 系统管理模块的静态菜单数据
export const systemManagementMenus: Menu[] = [];

// 一个使用示例函数，用于初始化系统菜单
export function initSystemMenu(systemId: string): Menu[] {
  return systemManagementMenus.map((menu) => {
    // 深拷贝菜单，避免修改原始数据
    return JSON.parse(JSON.stringify(menu));
  });
}
