<template>
  <el-button v-bind="button" :onClick="onClick">{{ button.label }}</el-button>
</template>

<script lang="ts" setup>
import type { IJasButton } from './index'

const props = defineProps({
  button: {
    type: Object as PropType<IJasButton>,
    required: true,
  },
  jasTable: Object,
})
console.log(props.button)
const button = computed(() => {
  return { ...props.button, onClick: undefined }
})

function onClick() {
  props.button.onClick(props.button, props.jasTable)
}
</script>

<style lang="scss" scoped></style>
