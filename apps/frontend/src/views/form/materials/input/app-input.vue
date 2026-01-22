<template>
  <div class="app-input-container w-full">
    <el-form-item :label="field.label">
      <el-input v-model="field.fieldProps.modelValue" v-bind="field.fieldProps" :placeholder="field.fieldProps.placeholder" />
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
    default: "design", // design or runtime
  },
});
</script>

<style lang="scss" scoped>
.app-input-container {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
