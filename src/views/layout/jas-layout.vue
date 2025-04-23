<template>
  <el-container>
    <el-header>1</el-header>
    <el-main>2</el-main>
  </el-container>
  <!-- <div class="layout-container">
    <div class="layout-top">
      <div class="logo">系统LOGO</div>
      <jas-top-menu @select="handleTopMenuSelect" />
      <div class="user-info">
        <span>欢迎，管理员</span>
        <span class="logout">退出</span>
      </div>
    </div>
    <div class="layout-main">
      <div class="layout-left">
        <jas-side-menu :title="`系统模块 - ${systemId || ''}`" @select="handleSideMenuSelect" />
      </div>
      <div class="layout-right">
        <jas-tab-nav ref="tabNavRef" />
        <div class="layout-content">
          <keep-alive :include="cachedViews">
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import JasTopMenu from './components/jas-top-menu.vue'
import JasSideMenu from './components/jas-side-menu.vue'
import JasTabNav from './components/jas-tab-nav.vue'

const route = useRoute()
const systemId = route.params.systemId

// 标签导航组件引用
const tabNavRef = ref()

// 使用计算属性从标签组件获取缓存视图
const cachedViews = computed(() => {
  return tabNavRef.value?.cachedViews || []
})

// 处理顶部菜单选择事件
const handleTopMenuSelect = (index: string) => {
  console.log('顶部菜单选择:', index)
  // 这里可以添加切换系统模块的逻辑
}

// 处理左侧菜单选择事件
const handleSideMenuSelect = (index: string) => {
  console.log('左侧菜单选择:', index)
  // 这里可以添加路由导航逻辑
}
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.layout-top {
  height: 50px;
  background-color: #001529;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .logo {
    font-size: 18px;
    font-weight: bold;
    width: 120px;
  }

  .user-info {
    min-width: 150px;
    text-align: right;

    .logout {
      margin-left: 10px;
      cursor: pointer;
      color: #1890ff;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.layout-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.layout-left {
  width: 300px;
  background-color: #f0f2f5;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.layout-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
}
</style>
