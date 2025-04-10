<template>
  <div class="jas-search">
    <!-- 搜索区域内容 -->
    搜索1232313123
  </div>
</template>

<script lang="ts" setup>
import { IJasTable } from '../index'
import { PropType } from 'vue'

const props = defineProps({
  jasTable: {
    type: Object as PropType<IJasTable>,
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
