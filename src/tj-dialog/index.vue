<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
    @close="onClose"
    :style="{ ...styleVarComp }"
  >
    <component
      ref="dialogContentRef"
      :tjTable="tjTable"
      :is="component ?? JasForm"
      @close="noCheckAndClose"
      @checkAndClose="checkAndClose"
    ></component>
  </el-dialog>
</template>

<!-- 
1.第一种情况
用户点击关闭按钮/遮罩区域。  自动调用 before-close
before-close
close 关闭前的回调
update:modelValue触发，正式关闭。

2.第二种情况
手动将 dialogVisible 设置false。随后触发触发 close 关闭前的回调。

总结：
1.业务代码：不允许直接调用  dialogVisible=falsem只能通过暴露的close和checkAndClose方法来关闭。
2.业务上需要校验handleClose，直接defineExpose暴露即可

-->

<script lang="ts" setup>
import type { PropType } from 'vue'
import { type IJasTable } from '@/core-components/tj-table/types'
import { isFunction } from 'lodash-es'
import { DialogSizeEnum, dialogSizeMapping } from './index'
defineOptions({
  inheritAttrs: false,
  name: 'jas-dialog',
})

const emit = defineEmits(['close'])
const dialogVisible = ref(true)
const dialogContentRef = ref()
const props = defineProps({
  component: Object,
  tjTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
  size: {
    type: Number,
    default: () => {
      return DialogSizeEnum.w960
    },
  },
})

/**
 * 关闭前的回调，直接调用业务组件
 */
function handleClose(done: () => void) {
  if (isFunction(dialogContentRef.value?.handleClose)) {
    dialogContentRef.value.handleClose(done)
  } else {
    done()
  }
}

function onClose() {
  //   console.log('虽然关闭都会触发，但是没什么用了')
}

/**
 * 直接关闭
 */
function noCheckAndClose() {
  dialogVisible.value = false
}
/**
 * 检测并关闭
 */
function checkAndClose() {
  if (isFunction(dialogContentRef.value?.handleClose)) {
    dialogContentRef.value.handleClose(() => {
      dialogVisible.value = false
    })
  } else {
    dialogVisible.value = false
  }
}

const styleVarComp = computed(() => {
  const obj = dialogSizeMapping[props.size]
  if (props.height) {
    obj['--height'] = props.height
  }
  return obj
})

watch(
  () => dialogVisible.value,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        emit('close')
      }, 0)
    }
  },
)
</script>

<style lang="scss" scoped></style>
