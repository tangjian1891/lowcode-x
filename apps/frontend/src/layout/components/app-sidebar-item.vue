<template>
  <!-- 目录 -->
  <el-sub-menu v-if="menu.type === Menu.Type.FOLDER" :index="menu.id">
    <template #title>
      <el-icon><component :is="menu.icon || 'Folder'" /></el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <app-sidebar-item v-for="subMenu in menu.children" :key="subMenu.id" :menu="subMenu" />
  </el-sub-menu>

  <!-- 页面 -->
  <el-menu-item v-if="menu.type === Menu.Type.PAGE" :index="menu.id">
    <div class="menu-item-content">
      <span class="flex items-center flex-1 overflow-hidden">
        <el-icon>
          <component :is="getMenuIcon(menu)" />
        </el-icon>
        <span class="ml-6px truncate">{{ menu.name }}</span>
      </span>
      <span class="action-buttons flex items-center">
        <el-link underline="never" icon="Edit" @click.stop="handleGoDesign(menu)" />
        <el-link underline="never" icon="Delete" @click.stop="handleRemoveMenu(menu)" class="ml-6px" />
      </span>
    </div>
  </el-menu-item>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/menu";
import { Menu } from "@backend/menu/menu.model";

defineProps({
  menu: {
    type: Object as PropType<Menu>,
    required: true,
  },
});

const router = useRouter();
const menuStore = useMenuStore();

// 删除菜单
async function handleRemoveMenu(menu: Menu) {
  await menuStore.removeMenu(menu.id!);
}

// 跳转到设计页面
function handleGoDesign(menu: Menu) {
  menuStore.goDesign(router, menu.id!);
}

// 根据菜单的子类型获取对应的图标
const getMenuIcon = (menu: Menu) => {
  if (menu.pageType === Menu.PageType.FORM) {
    return "Document";
  } else if (menu.pageType === Menu.PageType.VIEW) {
    return "Operation";
  } else if (menu.pageType === Menu.PageType.LINK) {
    return "Link";
  }
  return "Menu";
};
</script>

<style lang="scss" scoped>
.menu-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .action-buttons {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
}

.el-menu-item:hover {
  .action-buttons {
    opacity: 1;
  }
}
</style>
