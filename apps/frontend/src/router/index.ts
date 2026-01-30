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
      component: () => import("@/views/form/form-design.vue"),
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
  console.log("路由守卫触发");
  console.log(to, from);

  // 检查路由参数中是否包含 systemId
  const systemId = to.params.systemId as string;
  if (systemId && to.params.menuId) {
    if (router.hasRoute(to.params.menuId)) {
      return true;
    }
    const menuStore = useMenuStore();

    // 检查当前 store 中的 systemId 是否一致
    const currentSystemId = menuStore.systemInfo?.id;

    // 如果不一致或没有，则加载菜单
    if (!currentSystemId || currentSystemId !== systemId) {
      console.log(`系统 ID 不一致或未加载，正在加载系统 ${systemId} 的菜单...`);
      await menuStore.initSystemMenu(systemId, router);
    }
    if (router.hasRoute(to.params.menuId)) {
      return {
        replace: true,
        name: to.params.menuId,
        params: { ...to.params },
      };
    }
  }

  return true;
});
