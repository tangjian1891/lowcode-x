<template>
  <el-button v-if="showButton" v-bind="buttonAttrs" :disabled="isDisabled" @click="handleClick">{{
    button.label
  }}</el-button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { PropType } from 'vue'
import type { ITjButton } from './tj-button'
import type { ITjTable } from '@/core-components/tj-table/tj-table'
import { hasPermission, type Permission } from '@/utils/permissions'

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

// 根据权限配置决定按钮是否显示
const showButton = computed(() => {
  if (!props.button.permission) {
    // 未设置权限要求，始终显示
    return true
  }
  // 如果配置了无权限时隐藏，且没有权限，则不显示按钮
  if (props.button.hideWhenNoPermission && !hasButtonPermission.value) {
    return false
  }
  return true
})

// 根据权限配置决定按钮是否禁用
const isDisabled = computed(() => {
  // 按钮本身的禁用状态
  if (props.button.disabled) {
    return true
  }
  // 如果配置了无权限时禁用，且没有权限，则禁用按钮
  if (!hasButtonPermission.value && props.button.disableWhenNoPermission) {
    return true
  }
  return false
})

// 计算按钮属性，移除onClick等函数属性和权限相关属性
const buttonAttrs = computed(() => {
  const {
    onClick,
    label,
    component,
    permission,
    hideWhenNoPermission,
    disableWhenNoPermission,
    ...attrs
  } = props.button
  return attrs
})

// 处理按钮点击事件
function handleClick() {
  // 再次检查权限，防止通过DOM操作绕过权限控制
  if (!hasButtonPermission.value) {
    console.warn('用户无权执行此操作')
    return
  }

  if (props.button.onClick) {
    props.button.onClick(props.button, props.tjTable)
  }
}
</script>

<style lang="scss" scoped></style>
