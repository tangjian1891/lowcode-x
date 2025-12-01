<template>
  <el-popover placement="bottom" :width="250" trigger="click" popper-class="visible-icon">
    <template #reference>
      <span>
        <el-tooltip content="列显示">
          <el-button icon="View" text :type="isAllSelected ? '' : 'primary'" />
        </el-tooltip>
      </span>
    </template>
    <div class="column-visible-panel">
      <!-- 全选选项 -->
      <div class="field-item">
        <el-checkbox style="width: 100%" :model-value="isAllSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll"> 全选 </el-checkbox>
      </div>
      <!-- 字段列表 -->
      <div v-for="column in tjTable.columns" :key="column.field" class="field-item">
        <el-checkbox style="width: 100%" v-model="column.visible" @change="onChange($event, column.field)">
          {{ column.title || column.label }}
        </el-checkbox>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
import type { ITjTable } from "../tj-table";

const props = defineProps({
  tjTable: {
    type: Object as PropType<ITjTable>,
    required: true,
  },
});

// 是否全选
const isAllSelected = computed(() => {
  return props.tjTable.columns.length > 0 && props.tjTable.columns.every((col) => col.visible !== false);
});

// 是否半选状态
const isIndeterminate = computed(() => {
  const visibleCount = props.tjTable.columns.filter((col) => col.visible !== false).length;
  return visibleCount > 0 && visibleCount < props.tjTable.columns.length;
});

// 切换全选状态
const toggleSelectAll = (checked: boolean): void => {
  props.tjTable.columns.forEach((col) => {
    col.visible = checked;
    onChange(checked, col.field);
  });
};

const showEvent = (field) => {
  const $grid = unref(props.tjTable.gridRef);
  if ($grid) {
    $grid.showColumn(field);
  }
};
const hideEvent = (field) => {
  const $grid = unref(props.tjTable.gridRef);
  if ($grid) {
    $grid.hideColumn(field);
  }
};

function onChange(value, field) {
  if (value) {
    showEvent(field);
  } else {
    hideEvent(field);
  }
}
</script>

<style lang="scss">
.visible-icon {
  .column-visible-panel {
    max-height: 500px;
    overflow-y: auto;
    .field-item {
      padding: 0 8px;
    }
    .field-item:hover {
      background: #f0f1f4;
    }
  }
}
</style>
