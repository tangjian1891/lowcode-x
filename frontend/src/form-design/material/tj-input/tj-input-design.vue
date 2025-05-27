<template>
  <div class="">
    <el-input v-bind="field.fieldProps"></el-input>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  field: Object,
});
</script>

<style lang="scss" scoped></style>
