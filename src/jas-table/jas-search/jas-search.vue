<template>
  <div class="jas-search">
    <!-- 搜索区域内容 -->
    <component
      :field="field"
      :jasTable="jasTable"
      :is="field.component"
      v-for="field in jasTable.searchList"
    />
  </div>
</template>

<script lang="ts" setup>
import { IJasTable } from '../index'
import { PropType } from 'vue'

const props = defineProps({
  jasTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.jas-search {
  /* 样式定义 */
  height: 100px;
  border-bottom: 1px solid red;
}
</style>
