<template>
  <div class="h-full w-full flex flex-col overflow-hidden">
    <div class="shrink-0 basis-50px"></div>
    <div class="flex-1">
      <el-splitter>
        <el-splitter-panel collapsible size="300">
          <app-sidebar />
        </el-splitter-panel>
        <el-splitter-panel class="flex">
          <router-view #default="{ Component }">
            <keep-alive :include="cachedViews">
              <component :is="Component ?? AddMenuAccess" />
            </keep-alive>
          </router-view>
        </el-splitter-panel>
      </el-splitter>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppSidebar from "./components/app-sidebar.vue";
import AddMenuAccess from "./components/add-menu-access.vue";
import { useEventBus } from "@/hooks/use-mitt";
import { useMenuStore } from "@/stores/menu";
import { JasLayout } from "@/layout";

const route = useRoute();
const router = useRouter();
const eventBus = useEventBus();
const menuStore = useMenuStore();
// 标签导航组件引用
const tabNavRef = ref();

eventBus.on("check:menu", ({ eventName, callback }) => {
  console.log("收到检查菜单事件:", eventName);
  callback && callback(menuStore.menuTree.length > 0);
});

// 使用计算属性从标签组件获取缓存视图
const cachedViews = computed(() => {
  return tabNavRef.value?.cachedViews || [];
});

// 监听菜单树，如果没有选中的菜单且树不为空，则自动打开第一个
watch(
  () => menuStore.menuTree,
  (newTree) => {
    // 只有在当前没有 menuId（即处于占位状态）且确实有菜单数据时才自动跳转
    if (!route.params.menuId && newTree.length > 0) {
      const firstPage = JasLayout.findFirstPage(newTree);
      if (firstPage) {
        menuStore.selectMenu(firstPage.id!, router);
      }
    }
  },
  { immediate: true },
);

// 菜单加载逻辑已移至路由守卫中
</script>

<style lang="scss" scoped></style>
