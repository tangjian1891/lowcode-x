<template>
  <div class="flex bg-[#f5f5f7] p-2" @dragover.prevent @drop="onDrop">
    <div class="bg-white flex-1 rounded-sm">
      <vue-draggable v-model="viewModel.fields" group="material" item-key="id" class="design-list min-h-600px pb-20 p-2" ghost-class="ghost">
        <div
          v-for="element in viewModel.fields"
          :key="element.id"
          class="field-item relative p-4 mb-2 transition-all cursor-pointer border-l-4 border-transparent"
          :class="{ 'active-field': activeId === element.id }"
          @click.stop="viewModel.clickField(element)"
        >
          <div class="field-label mb-2 text-13px font-medium text-gray-800" v-if="element.label">
            {{ element.label }}
            <span v-if="element.required" class="text-red-500 ml-1">*</span>
          </div>

          <component :is="getDesignComponent(element.type)" :field="element" mode="design" />

          <!-- Action Buttons -->
          <div v-if="activeId === element.id" class="action-buttons">
            <div class="btn-group flex items-center bg-[#00a29a] text-white rounded shadow-md overflow-hidden">
              <div class="action-btn px-2 py-1 hover:bg-[#008c85] transition-colors" @click.stop="viewModel.copyField(element)" title="复制">
                <el-icon size="14"><CopyDocument /></el-icon>
              </div>
              <div
                class="action-btn px-2 py-1 hover:bg-red-500 transition-colors border-l border-[#008c85]"
                @click.stop="viewModel.deleteField(element)"
                title="删除"
              >
                <el-icon size="14"><Delete /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </vue-draggable>

      <div v-if="viewModel.fields.length === 0" class="empty-placeholder flex flex-col items-center justify-center py-40 text-gray-400">
        <div class="empty-icon-box border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center">
          <el-icon class="text-48px mb-4 text-gray-200"><Plus /></el-icon>
          <p class="text-15px font-medium text-gray-500">从左侧面板拖拽或点击添加字段</p>
          <p class="text-12px mt-2 text-gray-400">构建您的个性化表单</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { Plus, Delete, CopyDocument } from "@element-plus/icons-vue";
import { utils } from "@shared/index";

const viewModel = inject<any>("viewModel")!;
const activeId = computed(() => viewModel.activeId);

const getDesignComponent = (type: string) => {
  return viewModel.materialMap[type].component;
};

const onDrop = (event: DragEvent) => {
  const data = event.dataTransfer?.getData("material");
  if (data) {
    const material = JSON.parse(data);
    const registryItem = viewModel.materialMap[material.type];
    if (registryItem) {
      viewModel.addField2Design(viewModel.onClone(registryItem));
    }
  }
};

const mapping = computed(() => {
  return utils.flattenTreeToMapping(viewModel.fields);
});
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  width: 100%;
  min-height: 800px;
}

.design-list {
  display: flex;
  flex-direction: column;
}

.field-item {
  border-radius: 2px;
  position: relative;

  &:hover {
    background-color: rgba(0, 162, 154, 0.02);
    box-shadow: inset 0 0 0 1px rgba(0, 162, 154, 0.1);
  }

  &.active-field {
    background-color: rgba(0, 162, 154, 0.05);
    box-shadow: inset 0 0 0 1px rgba(0, 162, 154, 0.2);
    z-index: 10;
  }
}

.action-buttons {
  position: absolute;
  right: 0;
  bottom: -32px;
  z-index: 100;

  .btn-group {
    pointer-events: auto;
  }

  .action-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.ghost {
  opacity: 0.5;
  background: rgba(0, 162, 154, 0.1);
}

.empty-placeholder {
  pointer-events: none;
  .empty-icon-box {
    transition: all 0.3s;
  }
}
</style>
