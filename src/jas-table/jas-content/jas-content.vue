<template>
  <div class="jas-table-area">
    <!-- 表格区域内容 -->
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
// 定义表格区域的逻辑
import { ref, reactive, type PropType, computed } from 'vue'
import type { IJasTable } from '../jas-page'
const props = defineProps({
  jasTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
})

const columns = computed(() => {
  return props.jasTable.searchList.map((item) => {
    return { field: item.id, title: item.label }
  })
})

const gridOptions = computed(() => {
  return {
    columns: columns.value,
    data: [
      {
        1: '还行',
        2: '很好',
      },
    ],
  }
})
console.log(gridOptions.value)
</script>

<style lang="scss" scoped>
.jas-table-area {
  /* 样式定义 */
}
</style>
