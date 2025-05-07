<template>
  <div class="tj-table">
    <component
      :is="template"
      class=""
      v-for="template in components"
      :key="template.id"
      :tjTable="tjTable"
    ></component>
  </div>
</template>

<script lang="tsx" setup>
import { getDefaultComponents } from '.'
import { TjTable } from './tj-table'
import { Field } from '@/jas-table/ui-component/index'
import { nanoid } from 'nanoid'
import {
  createInlineJasButton,
  createJasButton,
  createJasButtonAdd,
  createJasButtonEdit,
  createJasButtonExport,
  createJasButtonImport,
} from '@/jas-table/ui-button/index'
defineProps({
  // 渲染的组件。可以自行扩展，调整顺序
  components: {
    type: Array,
    default: () => getDefaultComponents(),
  },
})
const fields = [
  Field.createJasInput(nanoid(), '姓名', { fixed: 'left', required: true }),
  Field.createJasNumber(nanoid(), '年龄'),
  Field.createJasInput(nanoid(), '地址'),
  Field.createJasNumber(nanoid(), '电话'),
  Field.createJasInput(nanoid(), '邮箱'),
  Field.createJasNumber(nanoid(), '身份证号'),
  Field.createJasInput(nanoid(), '备注'),
  Field.createJasNumber(nanoid(), '分数', { fixed: 'left' }),
  {
    isTable: true,
    label: '操作',
    showOverflow: false,
    slots: {
      default: () => {
        return [
          createJasButtonAdd('新增'),
          createJasButtonEdit('编辑'),
          createJasButtonEdit('编辑'),
          createJasButtonEdit('编辑'),
          // createJasButtonExport('导出'),
          // createJasButtonImport('导入'),
        ].map((button) => {
          const component = button.component
          return <component button={button}></component>
        })
      },
    },
    width: '300px',
  },
]
const buttons = [
  createJasButtonAdd('新增'),
  createJasButtonEdit('编辑'),
  createJasButtonExport('导出'),
  createJasButtonImport('导入'),
]

const tjTable = ref(new TjTable({ fields, buttons }))
console.log(tjTable.value)
</script>

<style lang="scss" scoped>
.tj-table {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
