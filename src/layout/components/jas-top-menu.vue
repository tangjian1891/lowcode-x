<template>
  <div class="top-menu">
    <el-menu
      mode="horizontal"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#1890ff"
      :default-active="activeMenu"
      @select="handleSelect"
      style="--el-menu-horizontal-height: 50px"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">工作台</el-menu-item>
      <el-menu-item index="3">应用中心</el-menu-item>
      <el-menu-item index="4">系统管理</el-menu-item>
      <el-menu-item index="5">业务中心</el-menu-item>
      <el-menu-item index="6">数据中心</el-menu-item>
      <el-menu-item index="7">消息中心</el-menu-item>
      <el-menu-item index="8">帮助文档</el-menu-item>
      <el-menu-item index="9">产品目录</el-menu-item>
      <el-menu-item index="10">人力资源</el-menu-item>
      <el-menu-item index="11">财务管理</el-menu-item>
      <el-menu-item index="12">项目管理</el-menu-item>
      <el-menu-item index="13">知识库</el-menu-item>
      <el-menu-item index="14">客户服务</el-menu-item>
      <el-menu-item index="15">供应链</el-menu-item>
      <el-menu-item index="16">质量管理</el-menu-item>
      <el-menu-item index="17">营销中心</el-menu-item>
      <el-menu-item index="18">技术支持</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeMenu = ref("1"); // 默认选中"首页"

// 定义一个emit，用于向父组件传递选中的菜单项
const emit = defineEmits(["select"]);

// 处理菜单选中事件
const handleSelect = (index: string) => {
  activeMenu.value = index;
  emit("select", index);
};

// 暴露给父组件的方法
defineExpose({
  setActiveMenu: (index: string) => {
    activeMenu.value = index;
  },
});
</script>

<style lang="scss" scoped>
.top-menu {
  flex: 1;
  overflow: hidden;
  width: 100%;

  // 覆盖Element Plus的一些样式
  :deep(.el-menu) {
    border-bottom: none;
    white-space: nowrap; // 防止菜单项换行

    &.el-menu--horizontal {
      border-bottom: none;
    }

    .el-menu-item {
      height: 50px;
      line-height: 50px;
      display: inline-block; // 确保所有项在一行显示

      &:hover {
        background-color: #1a2d3d;
      }
    }
  }
}
</style>
