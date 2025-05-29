<template>
  <tj-1 title="描述信息">
    <el-input type="textarea" v-model="field.formItemProps.description" :rows="3"></el-input>
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: Object,
});
console.log("是否重新执行description");
</script>

<style lang="scss" scoped></style>
