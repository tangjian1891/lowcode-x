<template>
  <div class="sidebar-container">
    <div class="system-title">{{ menuStore.systemInfo.name || "系统模块" }}</div>
    <el-menu
      :default-active="menuStore.activeMenuId"
      class="sidebar-menu"
      background-color="#fff"
      text-color="#333"
      active-text-color="#1890ff"
      @select="handleMenuSelect"
    >
      <app-sidebar-item v-for="menu in menuStore.menuTree" :key="menu.id" :menu="menu" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/menu";
import AppSidebarItem from "./app-sidebar-item.vue";

const router = useRouter();
const menuStore = useMenuStore();

// 处理菜单选择事件
const handleMenuSelect = (menuId: string) => {
  menuStore.selectMenu(menuId, router);
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .system-title {
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #e8e8e8;
  }

  :deep(.sidebar-menu) {
    flex: 1;
    overflow-y: auto;
    border-right: none;

    .el-menu-item {
      &:hover {
        background-color: #e6f7ff;
      }

      &.is-active {
        background-color: #e6f7ff;
        border-right: 3px solid #1890ff;
      }
    }

    .el-sub-menu__title {
      &:hover {
        background-color: #e6f7ff;
      }
    }
  }
}
</style>
