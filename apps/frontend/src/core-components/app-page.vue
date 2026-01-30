<template>开启页面时代</template>

<script lang="ts" setup>
import { ref, shallowRef, defineAsyncComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Menu } from "@backend/menu/menu.model";
const targetComp = shallowRef();
const menu = ref();
const route = useRoute();

// 根据菜单类型加载对应的组件

onMounted(async () => {
  // 从路由参数中获取menuId
  const menuId = route.params.menuId as string;

  if (!menuId) {
    console.error("菜单ID不存在");
    return;
  }
  const menuInfo = await api.menu.info(menuId);
});
</script>

<style lang="scss" scoped></style>
