<template>
  <div class="h-full w-full flex flex-col overflow-hidden">
    <div class="shrink-0 basis-50px"></div>
    <div class="flex-1">
      <el-splitter>
        <el-splitter-panel collapsible min="300">
          <jas-side-menu />
        </el-splitter-panel>
        <router-view #default="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component ?? AddMenuAccess" />
          </keep-alive>
        </router-view>
        <el-splitter-panel> </el-splitter-panel>
      </el-splitter>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import JasSideMenu from "./components/jas-side-menu.vue";
import AddMenuAccess from "./components/add-menu-access.vue";
import { useEventBus } from "@/hooks/use-mitt";
import { useMenuStore } from "@/stores/menu";

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

// 菜单加载逻辑已移至路由守卫中
</script>

<style lang="scss" scoped></style>
