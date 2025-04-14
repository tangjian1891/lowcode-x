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
import type { VxeGridProps } from 'vxe-table'
const props = defineProps({
  jasTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
})
const i = ref(0)
setTimeout(() => {
  i.value = 2
}, 3000)
const columns = computed(() => {
  return props.jasTable.searchList.map((item, index) => {
    console.log('执行多少次')

    return {
      field: item.id,
      title: item.label,
      visible: true,
      showOverflow: true,
      fixed: index === i.value ? 'left' : false,
      width: 200,
    }
  })
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
.jas-table-area {
  /* 样式定义 */
  // height: 300px;
  // min-height: 500px;
  overflow: hidden;
}
</style>
