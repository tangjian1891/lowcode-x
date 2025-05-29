<template>
  <tj-1 title="校验">
    <el-checkbox v-model="field.validateProps.required">必填</el-checkbox>
    <el-checkbox v-model="field.validateProps.unique">不允许重复值</el-checkbox>
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: Object,
});
</script>

<style lang="scss" scoped></style>
