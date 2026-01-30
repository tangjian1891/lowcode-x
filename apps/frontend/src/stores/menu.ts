import { defineStore } from "pinia";
import type { Router } from "vue-router";
import { api } from "@/api";
import { Menu } from "@backend/menu/menu.model";
import { JasLayout } from "@/layout";
import { flattenTreeToMapping } from "@shared/tree";
import AppPage from "@/core-components/app-page.vue";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menuTree: [] as Menu[], // 侧边栏菜单树
    openedMenus: [] as Menu[], // 用户打开的菜单
    activeMenuId: "", // 当前激活的菜单ID
    systemInfo: {} as any, // 当前系统信息
  }),

  actions: {
    // 获取菜单树
    async fetchMenuTree(systemId: string) {
      try {
        this.menuTree = await api.menu.tree(systemId);
        return this.menuTree;
      } catch (error) {
        console.error("获取菜单树失败:", error);
        this.menuTree = [];
        return [];
      }
    },

    // 设置系统信息
    setSystemInfo(info: any) {
      this.systemInfo = info;
    },

    // 获取系统信息并加载菜单
    async initSystemMenu(systemId: string, router: Router) {
      try {
        this.systemInfo = await api.system.detail(systemId);
        await this.fetchMenuTree(this.systemInfo.id);
        const mapping = flattenTreeToMapping(this.menuTree);

        for (const key in mapping) {
          const element = mapping[key];
          if (element.type == "page") {
            router.addRoute("app-layout", {
              name: element.id,
              path: `app-form/:menuId`,
              component: {
                name: element.id,
                render() {
                  return h(AppPage);
                },
              },
            });
          }
        }
      } catch (error) {
        console.error("初始化系统菜单失败:", error);
      }
    },

    // 刷新菜单树
    async refreshMenuTree() {
      if (this.systemInfo?.id) {
        await this.fetchMenuTree(this.systemInfo.id);
      }
    },

    // 菜单选择逻辑
    selectMenu(menuId: string, router: Router) {
      const menu = JasLayout.findMenuById(menuId, this.menuTree);
      if (menu) {
        this.activeMenuId = menuId;

        // 添加到已打开的菜单列表
        const exists = this.openedMenus.find((m) => m.id === menuId);
        if (!exists) {
          this.openedMenus.push(menu);
        }

        // 跳转到菜单对应的路由
        router.push({
          name: "app-form",
          params: {
            menuId: menu.id!,
            systemId: router.currentRoute.value.params.systemId,
          },
        });
      }
    },

    // 关闭已打开的菜单
    closeMenu(menuId: string) {
      const index = this.openedMenus.findIndex((m) => m.id === menuId);
      if (index > -1) {
        this.openedMenus.splice(index, 1);
      }
    },

    // 关闭所有菜单
    closeAllMenus() {
      this.openedMenus = [];
      this.activeMenuId = "";
    },

    // 设置当前激活的菜单
    setActiveMenu(menuId: string) {
      this.activeMenuId = menuId;
    },

    // 跳转到设计页面
    goDesign(router: Router, menuId: string) {
      const menu = JasLayout.findMenuById(menuId, this.menuTree);
      if (menu) {
        JasLayout.goDesign(router, menu);
      }
    },

    // 删除菜单
    async removeMenu(menuId: string) {
      const menu = JasLayout.findMenuById(menuId, this.menuTree);
      if (menu) {
        await JasLayout.removeMenu(menu);
        await this.refreshMenuTree();

        // 如果删除的是已打开的菜单，也从已打开列表中移除
        this.closeMenu(menuId);
      }
    },
  },
});
