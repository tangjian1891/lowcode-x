<template>
  <div class="jas-table">
    <component
      :is="template"
      class=""
      v-for="template in jasTable?.templateList"
      :key="template.id"
    ></component>
  </div>
</template>

<script lang="ts" setup>
import { createJasTable } from './index'

const jasTable = createJasTable()
// 提供jasTable实例给子组件使用

defineOptions({
  inheritAttrs: false,
  name: 'jas-table',
})
</script>

<style lang="scss" scoped>
.jas-table {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
