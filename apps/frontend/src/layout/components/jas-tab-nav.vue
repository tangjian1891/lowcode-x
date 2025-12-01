<template>
  <div class="tab-nav-container">
    <el-tabs v-model="activeTabId" type="card" closable @tab-click="handleTabClick" @tab-remove="handleRemoveTab">
      <el-tab-pane v-for="tab in tabList" :key="tab.id" :label="tab.name" :name="tab.id"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { TabPanelName } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { Menu, JasLayout } from "@/layout";
import { systemManagementMenus } from "@/layout/menu-data";

const router = useRouter();
const route = useRoute();

// 保存打开的标签页
interface TabItem {
  id: string;
  name: string;
  route: string;
}

const tabList = ref<TabItem[]>([]);
const activeTabId = ref<string>("");

// 处理标签页点击事件
const handleTabClick = (tab: any) => {
  const tabId = tab.props.name;
  const selectedMenu = JasLayout.findMenuById(tabId, systemManagementMenus);
  if (selectedMenu) {
    JasLayout.goRoute(router, selectedMenu);
  }
};

// 处理标签页关闭事件
const handleRemoveTab = (targetId: TabPanelName) => {
  // 找到要关闭标签页的索引
  const index = tabList.value.findIndex((tab) => tab.id === targetId);

  // 删除标签
  tabList.value.splice(index, 1);

  // 如果关闭的是当前激活的标签页，则需要激活其他标签页
  if (activeTabId.value === targetId) {
    // 如果还有其他标签页，则激活最后一个标签页
    if (tabList.value.length > 0) {
      // 优先激活被关闭标签右侧的标签，如果没有则激活左侧标签
      const nextActiveTab = tabList.value[index] || tabList.value[index - 1];
      activeTabId.value = nextActiveTab.id;

      // 跳转到新激活的标签页
      const nextMenu = JasLayout.findMenuById(nextActiveTab.id, systemManagementMenus);
      if (nextMenu) {
        JasLayout.goRoute(router, nextMenu);
      }
    } else {
      // 如果没有标签页了，可以跳转到首页或其他默认页面
      router.push("/dashboard");
    }
  }
};

// 添加标签页的方法
const addTab = (menu: Menu) => {
  // 检查标签是否已经存在
  const isExist = tabList.value.some((tab) => tab.id === menu.id);

  if (!isExist) {
    // 添加新标签
    tabList.value.push({
      id: menu.id,
      name: menu.name,
      route: `/jas-layout/${route.params.systemId}/${menu.id}`,
    });
  }

  // 激活标签
  activeTabId.value = menu.id;
};

// 监听路由变化，自动添加和激活标签页
watch(
  () => route.params,
  () => {
    if (route.name === "JasLayout" && route.params.systemId && route.params.menuId) {
      const menuId = route.params.menuId as string;
      const menu = JasLayout.findMenuById(menuId, systemManagementMenus);

      if (menu) {
        addTab(menu);
      }
    }
  },
  { immediate: true }, // 确保组件初始化时也执行一次
);

// 暴露方法给父组件
defineExpose({
  addTab,
});
</script>

<style lang="scss" scoped>
.tab-nav-container {
  background-color: #fff;
  padding: 0 10px;
  border-bottom: 1px solid #e8e8e8;

  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }

  :deep(.el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs__item) {
    height: 36px;
    line-height: 36px;
    border: 1px solid #e8e8e8;
    border-bottom: none;
    margin-right: 3px;
    transition: all 0.3s;

    &:hover {
      color: #1890ff;
    }

    &.is-active {
      color: #1890ff;
      background-color: #f0f7ff;
    }
  }

  :deep(.el-tabs__nav-next),
  :deep(.el-tabs__nav-prev) {
    line-height: 36px;
    color: #666;
  }
}
</style>
