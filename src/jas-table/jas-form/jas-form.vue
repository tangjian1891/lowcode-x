<template>
  <el-form ref="formRef" :model="jasTable.form" label-width="auto">
    <el-row :gutter="20">
      <el-col :span="field.span" v-for="field in jasTable.fields" :key="field.id">
        <el-form-item :label="field.label" :prop="field.id" :required="field.required">
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
import { ElMessage } from 'element-plus'
const emit = defineEmits(['close', 'checkAndClose', 'confirm'])
const props = defineProps({
  jasTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
})
const formRef = ref()

async function onConfirm(params: type) {
  await formRef.value.validate()
  emit('close')
}

function onClose(params: type) {
  emit('checkAndClose')
}
console.log('可以拿到', props.jasTable)

function handleClose(done) {
  // ElMessage.warning('就是不给关闭')
  done()
}
defineExpose({
  handleClose,
})
</script>

<style lang="scss" scoped></style>
