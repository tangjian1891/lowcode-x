<template>
  <el-input-number v-bind="field" :model-value="value" @update:modelValue="update" style="width: 240px" placeholder="请输入数字" />
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
import { type IJasNumber } from "./index";
const props = defineProps({
  field: {
    type: Object as PropType<IJasNumber>,
    required: true,
  },
  tjTable: Object,
});

const value = computed(() => {
  return props.tjTable.form[props.field.fieldName];
});

function update(e) {
  props.tjTable.form[props.field.fieldName] = e;
}
</script>

<style lang="scss" scoped></style>
