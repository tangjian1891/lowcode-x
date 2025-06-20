import { instance } from "@/api/request";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Router } from "vue-router";

// 菜单类型枚举
export enum MenuType {
  FOLDER = "folder", // 目录
  MENU = "menu", // 菜单
  PERMISSION = "permission", // 按钮。权限code
}
// 菜单子类型枚举
export enum SubMenuType {
  GENERAL_FORM = "general", // 通用表单  value： formId。注册时，动态包装。
  INTERNAL = "internal", // 自定义表单  value： 路由的name。路由的name需要和组件name保持一致，这样才能keep-alive
  EXTERNAL_MENU = "external", // 外部菜单 。内部iframe嵌入。
}

export class Menu {
  id: string = nanoid(); // 菜单ID
  name: string = ""; // 菜单名称
  type: MenuType = MenuType.FOLDER; // 菜单类型，1：目录，2：菜单，3：按钮
  subType: SubMenuType | null = null; // 菜单子类型，1：通用表单，2：自定义表单，3：外部菜单
  value: string = ""; // 菜单值，路由地址或权限标识
  icon?: string; // 菜单图标
  parentId: string = ""; // 父菜单ID
  children: Menu[] = []; // 子菜单列表
  order: number = 0; // 菜单排序
  constructor(menu: Partial<Menu> = {}) {
    Object.assign(this, menu);
  }
}

class JasLayout {
  systemId: string = ""; // 系统ID
  menuList: Menu[] = []; // 菜单列表
  keepAliveList: string[] = []; // 需要缓存的路由列表
  constructor(systemId: string) {
    this.systemId = systemId;
  }

  async getMenuListBySystemId() {}

  // 根据menuId查找菜单项
  static findMenuById(menuId: string, menus: Menu[]): Menu | null {
    for (const menuItem of menus) {
      if (menuItem.id === menuId) {
        return menuItem;
      }
      if (menuItem.children && menuItem.children.length > 0) {
        const found = JasLayout.findMenuById(menuId, menuItem.children);
        if (found) return found;
      }
    }
    return null;
  }

  static async removeMenu(menu: Menu) {
    try {
      await ElMessageBox.confirm("确认删除", "提示", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      });
      let res = await instance.request({
        url: "menu",
        method: "DELETE",
        data: { ids: [menu.id] },
      });
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    } catch (error) {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    }
  }

  static goRoute(router: Router, menu: Menu) {
    const currentRoute = router.currentRoute.value;
    router.push({
      path: `/jas-layout/${currentRoute.params.systemId}/${menu.id}`,
    });
  }

  static goDesign(router: Router, menu: Menu) {
    console.log(menu);

    router.push({
      name: "design",
      params: {
        formId: menu.id,
      },
    });
  }
  static menuSelect(menuId, menuTree, router) {
    const menu = JasLayout.findMenuById(menuId, menuTree);
    console.log("找到了", menu);
    router.push({
      name: "menu",
      params: {
        menuId: menu.id,
      },
    });
  }
}

export { JasLayout };
