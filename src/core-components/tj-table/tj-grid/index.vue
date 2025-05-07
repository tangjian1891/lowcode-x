<template>
  <div class="tj-table-area">
    <!-- 表格区域内容 -->
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
// 定义表格区域的逻辑
import { type PropType } from 'vue'
import type { ITjTable } from '../tj-table'
import type { VxeGridProps } from 'vxe-table'
const props = defineProps({
  tjTable: {
    type: Object as PropType<ITjTable>,
    required: true,
  },
})
const i = ref(0)
setTimeout(() => {
  i.value = 2
}, 3000)
const columns = computed(() => {
  const columns = props.tjTable.fields
    .map((item, index) => {
      if (item.isTable) {
        return {
          field: item.id,
          title: item.label,
          visible: true,
          fixed: item.fixed,
          width: item.width || 200,
          slots: item.slots,
          cellRender: item.cellRender,
          showOverflow: item.showOverflow || 'ellipsis',
        }
      }
    })
    .filter(Boolean)
  console.log(columns)

  return columns
})
const count = ref(0)
const gridOptions = computed<VxeGridProps>(() => {
  return {
    height: 'auto',
    minHeight: '300px',
    columns: columns.value,
    cellConfig: {},
    headerCellConfig: {},
    data: [
      {
        1: '还行',
        2: '很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
      {
        1: '还行',
        2: '很好',
      },
    ],
    cellClassName() {
      return 'wdqwdqwd'
    },
  }
})
setInterval(() => {
  count.value++
}, 2000)
console.log(gridOptions.value)
</script>

<style lang="scss" scoped>
.tj-table-area {
  /* 样式定义 */
  // height: 300px;
  // min-height: 500px;
  overflow: hidden;
}
</style>
