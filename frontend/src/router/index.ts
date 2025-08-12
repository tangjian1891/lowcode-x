import { createRouter, createWebHistory } from "vue-router";
import TjDynamice from "@/core-components/tj-dynamic.vue";
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
      path: "/jas-layout/:systemId",
      name: "jas-layout",
      component: () => import("@/layout/jas-layout.vue"),
      children: [
        {
          path: ":menuId",
          name: "menu",
          component: {
            name: "dynamic-menu",
            render() {
              return h("div", "");
            },
          },
        },
      ],
    },
    {
      path: "/design/:menuId",
      name: "design",
      component: () => import("@/design/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
  ],
});

export default router;
window.router = router;

router.beforeEach((to, from) => {
  console.log(to.name, to.path);
  if (to.name === "menu") {
    const menuId = to.params.menuId as string;
    router.addRoute("jas-layout", {
      path: ":menuId",
      name: menuId,
      component: {
        name: menuId,
        render() {
          return h(TjDynamice);
        },
      },
    });
    router.replace({ name: menuId, params: to.params });
    return false;
  }
  return true;
});
