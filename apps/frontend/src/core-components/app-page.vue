<template>
  <component :is="targetComp" :menu="menu"> </component>
</template>

<script lang="ts" setup>
import { ref, shallowRef, defineAsyncComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Menu } from "@backend/menu/menu.model";
const targetComp = shallowRef();
const menu = ref();
const route = useRoute();

// 根据菜单类型加载对应的组件
const loadComponentByMenu = (menuItem: Menu) => {
  menu.value = menuItem;
  switch (menuItem.pageType) {
    case Menu.PageType.LINK:
      // 加载外部链接组件
      targetComp.value = defineAsyncComponent(() => {
        return import("@/core-components/tj-iframe/tj-iframe.vue");
      });
      break;
    case Menu.PageType.VIEW:
      // 加载内部路由对应的组件
      targetComp.value = defineAsyncComponent(() => {
        return import("@/core-components/tj-table/tj-list.vue");
      });
      break;
    case Menu.PageType.FORM:
      // 加载通用表单组件
      targetComp.value = defineAsyncComponent(() => {
        return import("@/core-components/tj-table/tj-list.vue");
      });
      break;
    default:
      console.error("未知的菜单子类型:", menuItem.pageType);
  }
};

onMounted(async () => {
  // 从路由参数中获取menuId
  const menuId = route.params.menuId as string;

  if (!menuId) {
    console.error("菜单ID不存在");
    return;
  }
  const menuInfo = await api.menu.info(menuId);

  // 使用 JasLayout 中的静态方法查找菜单项
  if (menuInfo) {
    loadComponentByMenu(menuInfo);
  } else {
    console.error("未找到ID为", menuId, "的菜单项");
  }
});
</script>

<style lang="scss" scoped></style>
