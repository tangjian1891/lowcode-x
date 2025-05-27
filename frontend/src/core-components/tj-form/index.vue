<template>
  <el-form ref="formRef" :model="tjTable.form" label-width="auto">
    <el-row :gutter="20">
      <el-col :span="field.span" v-for="field in tjTable.fields" :key="field.id">
        <el-form-item :label="field.label" :prop="field.id" :required="field.required">
          <component :is="field.component" :field="field" :tjTable="tjTable" />
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
import type { PropType } from "vue";
import type { IJasTable } from "../tj-table/types";
import { ElMessage } from "element-plus";
const emit = defineEmits(["close", "checkAndClose", "confirm"]);
const props = defineProps({
  tjTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
});
const formRef = ref();

async function onConfirm() {
  await formRef.value.validate();
  emit("close");
}

function onClose() {
  emit("checkAndClose");
}
console.log("可以拿到", props.tjTable);

function handleClose(done) {
  // ElMessage.warning('就是不给关闭')
  done();
}
defineExpose({
  handleClose,
});
</script>

<style lang="scss" scoped></style>
