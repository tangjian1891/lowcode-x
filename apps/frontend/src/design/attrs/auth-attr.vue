<template>
  <tj-1 title="校验">
    <el-checkbox v-model="field.authProps.visible">可见</el-checkbox><br />
    <el-checkbox v-model="field.authProps.enabled">可编辑</el-checkbox><br />
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: Object,
});
</script>

<style lang="scss" scoped></style>
