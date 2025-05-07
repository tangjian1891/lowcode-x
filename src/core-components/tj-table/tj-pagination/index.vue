<template>
  <div class="tj-pagination">
    <!-- 分页区域内容 -->
    <el-pagination
      v-if="tjTable.pagination"
      v-model:current-page="tjTable.pagination.currentPage"
      v-model:page-size="tjTable.pagination.pageSize"
      :page-sizes="tjTable.pagination.pageSizes"
      :total="tjTable.pagination.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
// 定义分页区域的逻辑
import { type PropType } from 'vue'
import type { ITjTable } from '../tj-table'

const props = defineProps({
  tjTable: {
    type: Object as PropType<ITjTable>,
    required: true,
  },
})

const handleSizeChange = (val: number) => {
  if (props.tjTable.onPageSizeChange) {
    props.tjTable.onPageSizeChange(val)
  }
}

const handleCurrentChange = (val: number) => {
  if (props.tjTable.onCurrentPageChange) {
    props.tjTable.onCurrentPageChange(val)
  }
}
</script>

<style lang="scss" scoped>
.tj-pagination {
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
