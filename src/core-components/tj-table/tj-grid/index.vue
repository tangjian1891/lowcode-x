<template>
  <div class="tj-table-area">
    <!-- 表格区域内容 -->
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="tsx" setup>
// 定义表格区域的逻辑
import { type PropType } from 'vue'
import type { ITjTable } from '../tj-table'
import type { VxeGridProps } from 'vxe-table'
import { column } from 'element-plus/es/components/table-v2/src/common.mjs'
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
  const columns: any[] = [...props.tjTable.fields]

  if (props.tjTable.grid.buttons.length > 0) {
    columns.push({
      isTable: true,
      label: '操作',
      showOverflow: false,
      slots: {
        default: () => {
          return props.tjTable.grid.buttons.map((button) => {
            const component = button.component
            return <component button={button} tjTable={props.tjTable}></component>
          })
        },
      },
      width: '300px',
    })
  }
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
