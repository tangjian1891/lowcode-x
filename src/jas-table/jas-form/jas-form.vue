<template>
  <el-form ref="formRef" :model="jasTable.form" label-width="auto" style="max-width: 600px">
    <el-row :gutter="20">
      <el-col :span="field.span" v-for="field in jasTable.fields" :key="field.id">
        <el-form-item :label="field.label" :prop="field.id">
          <component :is="field.component" :field="field" :jasTable="jasTable" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div style="text-align: right">
    <el-button @click="onClose">Cancel</el-button>
    <el-button type="primary" @click="onConfirm"> Confirm </el-button>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IJasTable } from '../jas-page'
const emit = defineEmits(['close', 'confirm'])
const props = defineProps({
  jasTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
})
const formRef = ref()

function onConfirm(params: type) {
  console.log('点击确认')
  emit('confirm')
  emit('close')
}

function onClose(params: type) {
  console.log('点击取消')

  emit('close')
}
console.log('可以拿到', props.jasTable)
</script>

<style lang="scss" scoped></style>
