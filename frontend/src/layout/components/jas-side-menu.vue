<template>
  <div class="side-menu-container">
    <div class="system-title">{{ title }}</div>
    <el-menu
      :default-active="activeMenu"
      class="side-menu"
      background-color="#f0f2f5"
      text-color="#333"
      active-text-color="#1890ff"
      @select="handleSelect"
    >
      <!-- 动态渲染菜单项，替换原来的静态菜单 -->
      <template v-for="folder in menuData" :key="folder.id">
        <el-sub-menu v-if="folder.type === MenuType.FOLDER" :index="folder.id">
          <template #title>
            <el-icon><component :is="folder.icon || 'Folder'" /></el-icon>
            <span>{{ folder.name }}</span>
          </template>

          <!-- 渲染菜单项 -->
          <template v-for="menu in folder.children" :key="menu.id">
            <el-menu-item v-if="menu.type === MenuType.MENU" :index="menu.id">
              <el-icon>
                <!-- 根据不同的子类型使用不同的图标 -->
                <component :is="getMenuIcon(menu)" />
              </el-icon>
              <span>{{ menu.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import { initSystemMenu } from "../menu-data";
import { JasLayout, MenuType, SubMenuType } from "../index";
import { useRouter } from "vue-router";
const router = useRouter();

// 为initSystemMenu函数提供系统ID参数
const menuData = computed(() => initSystemMenu("system-001"));

// 定义组件的props
const props = defineProps({
  title: {
    type: String,
    default: "系统模块",
  },
});

const activeMenu = ref(""); // 默认不选中任何菜单项

// 初始化默认选中的菜单项(如果有菜单)
if (menuData.value.length > 0 && menuData.value[0].children.length > 0) {
  activeMenu.value = menuData.value[0].children[0].id;
}

// 定义emit事件
const emit = defineEmits(["select"]);

// 处理菜单选择事件
const handleSelect = (index: string) => {
  activeMenu.value = index;
  // 查找选中的菜单项
  const selectedMenu = JasLayout.findMenuById(index, menuData.value);
  JasLayout.goRoute(router, selectedMenu);
  // emit('select', selectedMenu)
};

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

// 暴露方法给父组件
defineExpose({
  setActiveMenu: (index: string) => {
    activeMenu.value = index;
  },
});
</script>

<style lang="scss" scoped>
.side-menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .system-title {
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #e8e8e8;
  }

  :deep(.side-menu) {
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
