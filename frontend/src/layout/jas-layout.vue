<template>
  <div class="h-full w-full flex flex-col overflow-hidden">
    <div class="shrink-0 basis-50px">
      <jas-top-layout @select="handleTopMenuSelect" />
    </div>
    <div class="flex-1">
      <jas-resize span="300">
        <template #p1>
          <jas-side-menu :title="`系统模块 - ${systemId || ''}`" @select="handleSideMenuSelect" />
        </template>
        <template #p2>
          <router-view #default="{ Component }">
            <keep-alive :include="cachedViews">
              <component :is="Component ?? AddMenuAccess" />
            </keep-alive>
          </router-view>
        </template>
      </jas-resize>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import JasTopLayout from "./components/jas-top-layout.vue";
import JasSideMenu from "./components/jas-side-menu.vue";
import JasTabNav from "./components/jas-tab-nav.vue";
import JasResize from "@/components/jas-resize/jas-resize.vue";
import AddMenuAccess from "./components/add-menu-access.vue";
import { instance } from "@/api/request";

const route = useRoute();
const systemId = route.params.systemId;

// 标签导航组件引用
const tabNavRef = ref();

// 使用计算属性从标签组件获取缓存视图
const cachedViews = computed(() => {
  return tabNavRef.value?.cachedViews || [];
});

// 处理顶部菜单选择事件
const handleTopMenuSelect = (index: string) => {
  console.log("顶部菜单选择:", index);
  // 这里可以添加切换系统模块的逻辑
};

// 处理左侧菜单选择事件
const handleSideMenuSelect = (index: string) => {
  console.log("左侧菜单选择:", index);
  // 这里可以添加路由导航逻辑
};

onMounted(() => {
  getMenuTree();
});

async function getMenuTree(params: type) {
  let res = await instance.request({
    url: "menu",
    method: "GET",
  });
  console.log("查看结果", res);
}
</script>

<style lang="scss" scoped></style>
