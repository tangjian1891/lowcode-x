<template>
  <div class="app-select-container w-full">
    <el-form-item :label="field.label">
      <el-select v-model="field.fieldProps.modelValue" v-bind="field.fieldProps" class="!w-full">
        <el-option v-for="item in field.fieldProps.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
.app-select-container {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
