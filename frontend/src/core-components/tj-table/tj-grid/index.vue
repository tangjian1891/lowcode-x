<template>
  <div class="tj-table-area">
    <!-- 表格区域内容 -->
    <vxe-grid ref="gridRef" v-bind="tjTable.grid" :data="tjTable.grid.data"></vxe-grid>
  </div>
</template>

<script lang="tsx" setup>
// 定义表格区域的逻辑
import { type PropType } from "vue";
import type { ITjTable } from "../tj-table";
import type { VxeGridInstance, VxeGridProps } from "vxe-table";
const props = defineProps({
  tjTable: {
    type: Object as PropType<ITjTable>,
    required: true,
  },
});
const gridRef = ref<VxeGridInstance<any>>();
props.tjTable.gridRef = gridRef; //
</script>

<style lang="scss" scoped>
.tj-table-area {
  /* 样式定义 */
  overflow: hidden;
  flex: 1;
  padding: 0 20px;
}
</style>
