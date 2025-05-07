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
  tjTable: Object,
})
const button = computed(() => {
  return { ...props.button, onClick: undefined }
})

function onClick() {
  props.button.onClick(props.button, props.tjTable)
}
</script>

<style lang="scss" scoped></style>
