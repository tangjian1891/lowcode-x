<template>
  <el-form :model="form">
    <el-row class="form-row">
      <component
        :form="form"
        :field="fieldMapping[f.id]"
        :data="data"
        :is="runtimeComponentMap[fieldMapping[f.id].type]"
        v-for="f in formTree"
        :key="f.id"
      />
    </el-row>
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

<style lang="scss" scoped>
.form-row {
  align-items: flex-start;
  align-content: flex-start;
}
</style>
