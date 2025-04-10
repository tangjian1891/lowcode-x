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
import { computed, ref } from 'vue'
const props = defineProps({
  field: Object,
  jasTable: Object,
})

const value = computed(() => {
  return props.jasTable.searchForm[props.field.fieldName]
})

function update(e) {
  props.jasTable.searchForm[props.field.fieldName] = e
}
</script>

<style lang="scss" scoped></style>
