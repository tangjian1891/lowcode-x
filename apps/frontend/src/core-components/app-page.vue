<template>开启页面时代</template>

<script lang="ts" setup>
import { ref, shallowRef, defineAsyncComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
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

  const schema = await api.formSchema.get(menuId);

  console.log("表单配置", schema);
});
</script>

<style lang="scss" scoped></style>
