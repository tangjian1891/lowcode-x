<template>
  <div class="tj-toolbar">
    <!-- 按钮区域 -->
    <div class="toolbar-buttons">
      <component v-for="button in tjTable.toolbar?.buttons" :key="button.id" :is="button.component" :button="button" :tjTable="tjTable"></component>
    </div>

    <!-- 工具区域 (刷新、排序、全屏等) -->
    <div class="toolbar-tools">
      <el-button v-if="tjTable.toolbar?.refresh" :icon="Refresh" @click="handleRefresh" text />
      <el-button v-if="tjTable.toolbar?.sort" :icon="Sort" @click="handleSort" text />
      <el-button v-if="tjTable.toolbar?.fullscreen" :icon="isFullscreen ? CompressOutlined : ExpandOutlined" @click="toggleFullscreen" text />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref } from "vue";
import type { ITjTable } from "../tj-table";
import { Refresh, Sort } from "@element-plus/icons-vue";

const props = defineProps({
  tjTable: {
    type: Object as PropType<ITjTable>,
    required: true,
  },
});

// 全屏状态
const isFullscreen = ref(false);
// 压缩和展开图标
const CompressOutlined = "CompressOutlined";
const ExpandOutlined = "ExpandOutlined";

// 处理刷新
const handleRefresh = () => {
  if (props.tjTable.refresh) {
    props.tjTable.refresh();
  }
};

// 处理排序
const handleSort = () => {
  if (props.tjTable.toggleSort) {
    props.tjTable.toggleSort();
  }
};

// 切换全屏
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  if (props.tjTable.toggleFullscreen) {
    props.tjTable.toggleFullscreen(isFullscreen.value);
  }
};
</script>

<style lang="scss" scoped>
.tj-toolbar {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;

  .toolbar-buttons {
    display: flex;
    gap: 8px;
  }

  .toolbar-tools {
    display: flex;
    gap: 8px;
  }
}
</style>
