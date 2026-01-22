<template>
  <div class="app-number-container w-full">
    <el-form-item :label="field.label">
      <el-input-number v-model="field.fieldProps.modelValue" v-bind="field.fieldProps" class="!w-full" />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
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
.app-number-container {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
