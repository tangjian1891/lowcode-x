<template>
  <!-- 目录 -->
  <el-sub-menu v-if="menu.type === MenuType.FOLDER" :index="menu.id">
    <template #title>
      <el-icon><component :is="menu.icon || 'Folder'" /></el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <jas-side-menu-item v-for="subMenu in menu.children" :key="subMenu.id" :menu="subMenu" @select="handleSelect" />
  </el-sub-menu>

  <el-menu-item v-if="menu.type === MenuType.MENU" :index="menu.id">
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
      <span class="flex items-center flex-1">
        <el-icon>
          <component :is="getMenuIcon(menu)" />
        </el-icon>
        <span style="margin-left: 6px">{{ menu.name }}</span>
      </span>
      <span class="flex items-center">
        <el-link underline="never" icon="Edit" @click.stop="JasLayout.goDesign(router, menu)" />
        <el-link underline="never" icon="Delete" @click.stop="removeMenu(menu)" class="ml-6px" />
      </span>
    </div>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { JasLayout, Menu, MenuType, SubMenuType } from "../index";
defineProps({
  menu: Object,
});
const router = useRouter();
async function removeMenu(menu: Menu) {
  await JasLayout.removeMenu(menu);
}
// 根据菜单的子类型获取对应的图标
const getMenuIcon = (menu) => {
  // 只根据菜单子类型返回对应图标，不再考虑自定义图标
  if (menu.subType === SubMenuType.GENERAL_FORM) {
    return "Document";
  } else if (menu.subType === SubMenuType.INTERNAL) {
    return "Operation";
  } else if (menu.subType === SubMenuType.EXTERNAL_MENU) {
    return "Link";
  }

  // 默认图标
  return "Menu";
};
</script>

<style lang="scss" scoped></style>
