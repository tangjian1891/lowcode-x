<template>
  <component :is="targetComp" :menu="menu"> </component>
</template>

<script lang="ts" setup>
import { ref, shallowRef, defineAsyncComponent, onMounted } from "vue";
import { Menu, SubMenuType, JasLayout } from "@/layout";
import { systemManagementMenus } from "@/layout/menu-data";
import { useRoute } from "vue-router";
import { instance } from "@/api/request";

const targetComp = shallowRef();
const menu = ref();
const route = useRoute();

// 根据菜单类型加载对应的组件
const loadComponentByMenu = (menuItem: Menu) => {
  console.log("拿到了嘛", menuItem);

  menu.value = menuItem;
  switch (menuItem.subType) {
    case SubMenuType.EXTERNAL_MENU:
      // 加载外部链接组件
      targetComp.value = defineAsyncComponent(() => {
        return import("@/core-components/tj-iframe/tj-iframe.vue");
      });
      break;
    case SubMenuType.INTERNAL:
      // 加载内部路由对应的组件
      targetComp.value = defineAsyncComponent(() => {
        return import("@/views/a.vue");
      });
      break;
    case SubMenuType.GENERAL_FORM:
      // 加载通用表单组件
      targetComp.value = defineAsyncComponent(() => {
        return import("@/core-components/tj-table/tj-table.vue");
      });
      break;
    default:
      console.error("未知的菜单子类型:", menuItem.subType);
  }
};

onMounted(async () => {
  // 从路由参数中获取menuId
  const menuId = route.params.menuId as string;

  if (!menuId) {
    console.error("菜单ID不存在");
    return;
  }
  const menuItem = await instance({
    url: `/menu/${menuId}`,
  });

  // 使用 JasLayout 中的静态方法查找菜单项
  if (menuItem) {
    loadComponentByMenu(menuItem);
  } else {
    console.error("未找到ID为", menuId, "的菜单项");
  }
});
</script>

<style lang="scss" scoped></style>
