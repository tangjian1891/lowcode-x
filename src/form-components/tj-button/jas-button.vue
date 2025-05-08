<template>
  <el-button :disabled="isDisabled" @click="handleClick">{{ button.label }}</el-button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ITjButton } from './tj-button'
import type { ITjTable } from '@/core-components/tj-table/tj-table'

const props = defineProps({
  button: {
    type: Object as PropType<ITjButton>,
    required: true,
  },
  tjTable: {
    type: Object as PropType<ITjTable>,
    default: undefined,
  },
})

// 处理按钮点击事件
function handleClick() {
  if (props.button.onClick) {
    props.button.onClick(props.button, props.tjTable)
  }
}
const isDisabled = computed(() => {
  return props.button.isDisabled(props)
})
</script>

<style lang="scss" scoped></style>
