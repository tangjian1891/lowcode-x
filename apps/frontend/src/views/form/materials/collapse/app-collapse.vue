<template>
  <div class="app-collapse-container w-full">
    <el-collapse v-model="field.fieldProps.activeNames" v-bind="field.fieldProps">
      <el-collapse-item title="标题" name="1">
        <div class="p-4 border-dashed border-2 border-gray-200 text-center text-gray-400">内容区域 (容器组件功能开发中)</div>
      </el-collapse-item>
    </el-collapse>
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
.app-collapse-container {
  margin-bottom: 15px;
}
</style>
