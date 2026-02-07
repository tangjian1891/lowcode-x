<template>
  <div class="sidebar-wrapper flex flex-col h-full bg-white border-r">
    <!-- Component Groups -->
    <div class="flex-1 overflow-y-auto custom-scrollbar">
      <div v-for="group in materialList" :key="group.group" class="group-section">
        <div class="group-header px-4 py-4 text-12px font-bold text-gray-500 uppercase tracking-wider">
          {{ group.group }}
        </div>
        <VueDraggable
          v-model="group.items"
          :clone="onClone"
          :group="{ name: 'material', pull: 'clone', put: false }"
          class="material-grid px-4 pb-4"
          :sort="false"
        >
          <div
            v-for="item in group.items"
            :key="item.type"
            class="material-drag-item flex items-center gap-1 rounded-sm cursor-move p-1 pl-2 text-sm"
            @click="onItemClick(item)"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </div>
        </VueDraggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { materialList } from "../../form-model";
import { VueDraggable } from "vue-draggable-plus";

const viewModel = inject<any>("viewModel");

const onItemClick = (item: any) => {
  if (viewModel && typeof viewModel.addFieldByClick === "function") {
    viewModel.addFieldByClick(item);
  }
}; // 克隆逻辑
const onClone = (item: any) => {
  const registryItem = viewModel.materialMap[item.type];
  return viewModel.onClone(registryItem);
};
</script>

<style lang="scss" scoped>
$primary-color: #00a29a;

.sidebar-wrapper {
  user-select: none;
}

.group-section {
  &:not(:first-child) {
    margin-top: 8px;
  }
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  .material-drag-item {
    border: 1px solid #e4e7ed;

    &:hover {
      border: 1px dashed var(--el-color-primary);
    }
  }
}

.material-item {
  background-color: #f7f8fa;
  border: 1px solid #f7f8fa;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #fff;
    border-color: $primary-color;
    box-shadow: 0 2px 8px rgba(0, 162, 154, 0.1);

    .el-icon {
      color: $primary-color;
    }
  }

  &:active {
    cursor: grabbing;
    transform: scale(0.95);
  }

  .item-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 4px;
  }
}

.custom-scrollbar {
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e4e7ed;
    border-radius: 2px;
    &:hover {
      background: #dcdfe6;
    }
  }
}
</style>
<style lang="scss"></style>
