<template>
  <design-wrap :field="field" :data="data">
    <el-select></el-select>
  </design-wrap>
</template>

<script lang="ts" setup>
import { DesignWrap } from "@/design/components/wrap-container";
const props = defineProps({
  field: Object,
  data: Object,
});
</script>

<style lang="scss" scoped></style>
