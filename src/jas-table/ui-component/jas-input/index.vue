<template>
  <el-input
    v-bind="field"
    :model-value="value"
    @update:modelValue="update"
    style="width: 240px"
    placeholder="Please input"
  />
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import { type IJasInput } from './index'
const props = defineProps({
  field: {
    type: Object as PropType<IJasInput>,
    required: true,
  },
  jasTable: Object,
})

const value = computed(() => {
  return props.jasTable.form[props.field.id]
})

function update(e) {
  props.jasTable.form[props.field.id] = e
}
</script>

<style lang="scss" scoped></style>
