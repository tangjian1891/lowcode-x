<template>
  <div class="canvas-wrapper min-h-full bg-white shadow-sm rounded-lg p-4" @dragover.prevent @drop="onDrop">
    <vue-draggable v-model="viewModel.fields" group="material" item-key="id" class="design-list min-h-200px" ghost-class="ghost">
      <div
        v-for="element in viewModel.fields"
        :key="element.id"
        class="field-item relative p-4 mb-4 border-2 border-transparent transition-all cursor-pointer hover:bg-blue-50/30"
        :class="{ 'active-field !border-primary': activeId === element.id }"
        @click.stop="viewModel.clickField(element)"
      >
        <component :is="getDesignComponent(element.type)" :field="element" mode="design" />
        <div
          v-if="activeId === element.id"
          class="action-buttons absolute right-0 top-0 flex gap-1 -translate-y-full bg-primary text-white p-1 rounded-t-md text-12px"
        >
          <el-icon class="cursor-pointer hover:opacity-80" @click.stop="viewModel.copyField(element)"><CopyDocument /></el-icon>
          <el-icon class="cursor-pointer hover:opacity-80" @click.stop="viewModel.deleteField(element)"><Delete /></el-icon>
        </div>
      </div>
    </vue-draggable>

    <div v-if="viewModel.fields.length === 0" class="empty-placeholder flex flex-col items-center justify-center py-20 text-gray-400">
      <el-icon class="text-40px mb-2"><Plus /></el-icon>
      <p>拖拽或点击左侧组件添加字段</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { Plus, Delete, CopyDocument } from "@element-plus/icons-vue";
import { utils } from "@shared/index";
const viewModel = inject<any>("viewModel")!;
const { activeId } = viewModel;

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
console.log(mapping);
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.design-list {
  display: flex;
  flex-direction: column;
}

.field-item {
  border-radius: 4px;
}

.active-field {
  background-color: #f0f7ff;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  border: 2px dashed var(--el-color-primary);
}
</style>
