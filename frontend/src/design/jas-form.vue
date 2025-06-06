<template>
  <el-form :model="form">
    <component :field="fieldMapping[f.id]" :data="data" :is="runtimeComponentMap[fieldMapping[f.id].type]" v-for="f in formTree" :key="f.id" />
  </el-form>
</template>

<script lang="ts" setup>
import { keyBy } from "lodash-es";
import { runtimeComponentMap } from "./material";

const props = defineProps({
  fields: Array,
  formTree: Array,
});

const fieldMapping = computed(() => {
  return keyBy(props.fields, "id");
});

const form = reactive({});
</script>

<style lang="scss" scoped></style>
