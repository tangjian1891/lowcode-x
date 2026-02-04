import { instance } from "@/api/request";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Router } from "vue-router";
import { Menu } from "@backend/menu/menu.model";

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

  // 递归查找第一个页面类型的菜单
  static findFirstPage(menus: Menu[]): Menu | null {
    for (const menu of menus) {
      if (menu.type === Menu.Type.PAGE) {
        return menu;
      }
      if (menu.children && menu.children.length > 0) {
        const found = JasLayout.findFirstPage(menu.children);
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
      const res = await instance.request({
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
      path: `/app-layout/${currentRoute.params.systemId}/${menu.id}`,
    });
  }

  static goDesign(router: Router, menu: Menu) {
    console.log(menu);

    router.push({
      name: "form-design",
      params: {
        menuId: menu.id,
      },
    });
  }
  static menuSelect(menuId: string, menuTree: Menu[], router: Router) {
    const menu = JasLayout.findMenuById(menuId, menuTree);
    console.log("找到了", menu);
    if (menu) {
      router.push({
        name: "app-form",
        params: {
          menuId: menu.id!,
        },
      });
    }
  }
}

export { JasLayout, Menu };
