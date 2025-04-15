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
import { nanoid } from 'nanoid'
const fieldList = [
  Field.createJasInput(nanoid(), '姓名', { fixed: 'left' }),
  Field.createJasNumber(nanoid(), '年龄'),
  Field.createJasInput(nanoid(), '地址'),
  Field.createJasNumber(nanoid(), '电话'),
  Field.createJasInput(nanoid(), '邮箱'),
  Field.createJasNumber(nanoid(), '身份证号'),
  Field.createJasInput(nanoid(), '备注'),
  Field.createJasNumber(nanoid(), '分数'),
]

const jasTable = createJasTable({ fields: fieldList })
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
