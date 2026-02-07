<template>
  <div class="app-datetime-container w-full">
    <el-form-item :label="field.label">
      <el-date-picker v-model="fieldModel" v-bind="field.fieldProps" class="!w-full" />
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
.app-datetime-container {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
