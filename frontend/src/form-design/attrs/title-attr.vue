<template>
  <tj-1 title="标题">
    <el-input v-model="field.formItemProps.label"></el-input>
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: Object,
});
console.log("是否重新执行title");
</script>

<style lang="scss" scoped></style>
