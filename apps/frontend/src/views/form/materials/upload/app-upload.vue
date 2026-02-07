<template>
  <div class="app-upload-container w-full">
    <el-form-item :label="field.label">
      <el-upload v-bind="field.fieldProps" v-model:file-list="fieldModel">
        <template v-if="field.fieldProps.listType === 'picture-card'">
          <el-icon><Plus /></el-icon>
        </template>
        <template v-else>
          <el-button type="primary">点击上传</el-button>
        </template>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
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
.app-upload-container {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
