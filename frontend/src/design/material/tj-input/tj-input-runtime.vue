<template>
  <runtime-container :field="field">
    <el-input v-bind="field.fieldProps" v-model="form[field.id]" :disabled="field.authProps.enabled"></el-input>
  </runtime-container>
</template>

<script lang="ts" setup>
import RuntimeContainer from "@/design/components/runtime-container/runtime-container.vue";
const props = defineProps({
  form: Object,
  field: Object,
});
</script>

<style lang="scss" scoped></style>
