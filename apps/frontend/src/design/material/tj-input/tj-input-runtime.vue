<template>
  <runtime-wrap :field="field">
    <el-input v-bind="field.fieldProps" v-model="form[field.id]" :disabled="!field.authProps.enabled"></el-input>
  </runtime-wrap>
</template>

<script lang="ts" setup>
import { RuntimeWrap } from "@/design/components/wrap-container";
const props = defineProps({
  form: Object,
  field: Object,
});
</script>

<style lang="scss" scoped></style>
