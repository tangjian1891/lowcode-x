<template>
  <div class="app-select-container w-full">
    <el-form-item :label="field.label">
      <el-select v-model="fieldModel" v-bind="field.fieldProps" class="!w-full">
        <el-option v-for="item in field.fieldProps.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { FormViewModel, useFieldModel } from "../../form-model";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: "design",
  },
});

const viewModel = inject("viewModel") as FormViewModel;
const fieldModel = useFieldModel(viewModel, props.field.id);
</script>

<style lang="scss" scoped>
.app-select-container {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
