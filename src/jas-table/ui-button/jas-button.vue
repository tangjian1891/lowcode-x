<template>
  <el-button v-bind="button">{{ button.label }}</el-button>
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
</script>

<style lang="scss" scoped></style>
