<template>
  <div class="jas-button-area">
    <component
      :is="button.component"
      v-for="button in jasTable.buttons"
      :key="button.id"
      :button="button"
      :jasTable="jasTable"
    ></component>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { JasTable, type IJasTable } from '../jas-page'

// 定义按钮操作区域的逻辑
const props = defineProps({
  jasTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.jas-button-area {
  /* 样式定义 */
}
</style>
