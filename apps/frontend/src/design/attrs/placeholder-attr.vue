<template>
  <tj-1 title="提示">
    <el-input v-model="field.fieldProps.placeholder"></el-input>
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: Object,
});
</script>

<style lang="scss" scoped></style>
