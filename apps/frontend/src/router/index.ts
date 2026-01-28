import { createRouter, createWebHistory } from "vue-router";
import AppPage from "@/core-components/app-page.vue";
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

export default router;

router.beforeEach((to, from) => {
  console.log(to.name, to.path);
  if (to.name === "app-form") {
    const menuId = to.params.menuId as string;
    router.addRoute("app-layout", {
      path: "app-form/:menuId",
      name: menuId,
      component: {
        name: menuId,
        render() {
          return h(AppPage);
        },
      },
    });
    router.replace({ name: menuId, params: to.params });
    return false;
  } else if (to.name === "app-composite") {
    const menuId = to.params.menuId as string;
    router.addRoute("app-layout", {
      path: "app-composite/:menuId",
      name: menuId,
      component: {
        name: menuId,
        render() {
          return h(AppPage);
        },
      },
    });
    router.replace({ name: menuId, params: to.params });
    return false;
  }
  return true;
});
