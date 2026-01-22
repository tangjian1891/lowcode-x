<template>
  <div class="app-upload-container w-full">
    <el-form-item :label="field.label">
      <el-upload v-bind="field.fieldProps" v-model:file-list="field.fieldProps.modelValue">
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
</script>

<style lang="scss" scoped>
.app-upload-container {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
