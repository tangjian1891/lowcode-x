import { createRouter, createWebHistory } from "vue-router";
import AppPage from "@/core-components/app-page.vue";
import { useEventBus } from "@/hooks/use-mitt";
import { useMenuStore } from "@/stores/menu";

const eventBus = useEventBus();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/amap",
      name: "amap",
      component: () => import("@/views/amap/index.vue"),
    },
    {
      path: "/amap2",
      name: "amap2",
      component: () => import("@/views/amap/amap2.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test/index.vue"),
    },
    {
      path: "/",
      redirect: "/workbench",
    },
    {
      path: "/workbench",
      name: "workbench",
      component: () => import("@/views/workbench/index.vue"),
    },
    {
      path: "/app-layout/:systemId",
      name: "app-layout",
      component: () => import("@/layout/app-layout.vue"),
      children: [
        {
          path: "app-form/:menuId",
          name: "app-form",
          component: {
            name: "app-page",
            render() {
              return h("div", "");
            },
          },
        },
        {
          path: "app-composite/:menuId",
          name: "app-composite",
          component: {
            name: "app-page",
            render() {
              return h("div", "");
            },
          },
        },
      ],
    },
    {
      path: "/form-design/:menuId",
      name: "form-design",
      component: () => import("@/views/form/designer/form-designer.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
  ],
});
window.router = router;
export default router;

router.beforeEach(async (to, from) => {
  const routeName = to.name as string;
  // 检查路由参数中是否包含 systemId
  const systemId = to.params.systemId as string;

  if (systemId) {
    const menuStore = useMenuStore();
    const currentSystemId = menuStore.systemInfo?.id;

    // 如果系统 ID 不一致或没有，则加载系统信息和菜单列表
    if (!currentSystemId || currentSystemId !== systemId) {
      console.log(`系统 ID 不一致或未加载，正在加载系统 ${systemId} 的信息和菜单...`);
      await menuStore.initSystemMenu(systemId, router);
    }

    // 检查是否含有 menuId
    const menuId = to.params.menuId as string;
    if (menuId && ["app-form", "app-composite"].includes(routeName)) {
      // 判断路由是否已存在
      if (!router.hasRoute(menuId)) {
        // 路由不存在，尝试根据现有菜单树添加该路由
        console.log(`路由 ${menuId} 不存在，尝试添加路由...`);
        menuStore.addMenuRoutes(router, menuId);
      }
      // 如果路由现在已存在，则替换路由
      if (router.hasRoute(menuId)) {
        return {
          replace: true,
          name: menuId,
          params: { ...to.params },
        };
      }
    }
  }

  return true;
});
