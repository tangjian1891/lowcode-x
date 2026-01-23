<template>
  <div class="sidebar-wrapper flex flex-col h-full bg-white shadow-sm border-r">
    <!-- Search Box -->
    <div class="p-4 border-b">
      <el-input v-model="searchText" placeholder="搜索组件" prefix-icon="Search" clearable class="search-input" />
    </div>

    <!-- Component Groups -->
    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <div v-for="group in filteredGroups" :key="group.group" class="group-section mb-6">
        <h3 class="text-14px font-bold mb-3 flex items-center gap-2 text-gray-700">
          {{ group.group }}
        </h3>

        <div class="material-list grid grid-cols-2 gap-2">
          <div
            v-for="item in group.items"
            :key="item.type"
            class="material-item p-2 border rounded transition-all cursor-pointer hover:border-primary hover:text-primary flex items-center gap-2 bg-white"
            draggable="true"
            @dragstart="onDragStart($event, item)"
            @click="onItemClick(item)"
          >
            <el-icon class="text-16px"><component :is="item.icon" /></el-icon>
            <span class="text-12px line-clamp-1">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <div v-if="filteredGroups.length === 0" class="text-center py-10 text-gray-400 text-sm">未找到相关组件</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from "vue";
import { materialList } from "../form-model";

const searchText = ref("");
const viewModel = inject<any>("viewModel");

// Initialize viewModel is no longer needed in onMounted since materialList is directly available in viewModel

const filteredGroups = computed(() => {
  if (!searchText.value) return materialList;
  return materialList
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(searchText.value.toLowerCase())),
    }))
    .filter((group) => group.items.length > 0);
});

const onDragStart = (event: DragEvent, item: any) => {
  event.dataTransfer?.setData("material", JSON.stringify(item));
};

const onItemClick = (item: any) => {
  if (viewModel && typeof viewModel.addFieldByClick === "function") {
    viewModel.addFieldByClick(item);
  }
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  user-select: none;
}

.search-input {
  :deep(.el-input__wrapper) {
    background-color: #f5f7fa;
    box-shadow: none;
    &:hover,
    &.is-focus {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
  }
}

.material-item {
  border-color: #e4e7ed;
  &:hover {
    background-color: #f0f7ff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  &:active {
    cursor: grabbing;
  }
}

.custom-scrollbar {
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e4e7ed;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}
</style>
