<template>
  <div class="jas-table">
    <component
      :is="template"
      class=""
      v-for="template in jasTable?.templateList"
      :key="template.id"
      :jasTable="jasTableRef"
    ></component>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createJasTable } from './index'
import { Field } from './ui-component'
const fieldList = [Field.createJasInput()]

const jasTable = createJasTable({ searchList: fieldList })
const jasTableRef = ref(jasTable)

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
