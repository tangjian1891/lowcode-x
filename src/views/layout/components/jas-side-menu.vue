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
      <el-sub-menu index="1">
        <template #title>
          <el-icon><document /></el-icon>
          <span>数据管理</span>
        </template>
        <el-menu-item index="1-1">用户列表</el-menu-item>
        <el-menu-item index="1-2">角色管理</el-menu-item>
        <el-menu-item index="1-3">权限配置</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>系统设置</span>
        </template>
        <el-menu-item index="2-1">基础设置</el-menu-item>
        <el-menu-item index="2-2">高级配置</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><location /></el-icon>
          <span>数据分析</span>
        </template>
        <el-menu-item index="3-1">数据概览</el-menu-item>
        <el-menu-item index="3-2">详细统计</el-menu-item>
        <el-menu-item index="3-3">生成报表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Setting, Location } from '@element-plus/icons-vue'

// 定义组件的props
const props = defineProps({
  title: {
    type: String,
    default: '系统模块',
  },
})

const activeMenu = ref('1-1') // 默认选中"用户列表"

// 定义emit事件
const emit = defineEmits(['select'])

// 处理菜单选择事件
const handleSelect = (index: string) => {
  activeMenu.value = index
  emit('select', index)
}

// 暴露方法给父组件
defineExpose({
  setActiveMenu: (index: string) => {
    activeMenu.value = index
  },
})
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
