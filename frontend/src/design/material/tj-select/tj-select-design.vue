<template>
  <design-container :field="field" :data="data">
    <el-select></el-select>
  </design-container>
</template>

<script lang="ts" setup>
import DesignContainer from "@/design/components/design-container/design-container.vue";

const props = defineProps({
  field: Object,
  data: Object,
});
</script>

<style lang="scss" scoped></style>
