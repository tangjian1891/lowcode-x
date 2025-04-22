<template>
  <div
    ref="jasTwoResizeRef"
    :draggable="false"
    class="jas-resize"
    :class="{
      events_none: mouse.isMoving,
      'jas-resize-vertical': direction === 'vertical',
      'jas-resize-horizontal': direction === 'horizontal',
    }"
  >
    <div
      :style="
        direction === 'horizontal'
          ? { width: leftWidth + 'px', 'flex-shrink': 0, overflow: 'hidden' }
          : { height: topHeight + 'px', 'flex-shrink': 0, overflow: 'hidden' }
      "
    >
      <slot name="section1"></slot>
    </div>
    <jas-resize-bar
      :direction="direction"
      :bar-width="barWidth"
      :left-width="direction === 'horizontal' ? leftWidth : topHeight"
      @mousedown="mouse.mousedown($event)"
      @toggle="handleToggle"
    />
    <div style="flex: 1">
      <slot name="section2"></slot>
    </div>
  </div>
</template>
<!-- 
缩小时，后面部分内容动态收缩。
-->
<script lang="ts" setup>
import JasResizeBar from './jas-resize-bar.vue'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  span: {
    type: [String, Number],
    default: 200,
  },
  barWidth: {
    type: Number,
    default: 1,
  },
  direction: {
    type: String,
    default: 'horizontal', // 'horizontal' 或 'vertical'
    validator: (value: string) => ['horizontal', 'vertical'].includes(value),
  },
})
onMounted(() => {
  getParentSize()
  // 监听窗口大小变化
  window.addEventListener('resize', onResize)
})
function onResize() {
  if (direction.value === 'horizontal') {
    if (leftWidth.value > getParentSize()) {
      leftWidth.value = getParentSize()
    }
  } else {
    if (topHeight.value > getParentSize()) {
      topHeight.value = getParentSize()
    }
  }
}

// 将 span 转换为数值并作为初始左侧宽度或顶部高度
const leftWidth = ref(typeof props.span === 'string' ? parseInt(props.span) : props.span)
const topHeight = ref(typeof props.span === 'string' ? parseInt(props.span) : props.span)
const jasTwoResizeRef = ref<HTMLElement | null>(null)
const direction = ref(props.direction)

// 获取父容器可用尺寸（宽度或高度）
const getParentSize = () => {
  if (jasTwoResizeRef.value) {
    return direction.value === 'horizontal'
      ? jasTwoResizeRef.value.clientWidth - props.barWidth
      : jasTwoResizeRef.value.clientHeight - props.barWidth
  }
  return 0
}

// 拖拽控制逻辑
const mouse = reactive({
  isMoving: false,
  startPosition: 0, // 移动时，初始绝对距离（X或Y）
  startSize: 0, // 移动时，初始的宽度或高度

  mousedown(e) {
    // 记录初始位置和大小
    mouse.isMoving = true
    mouse.startPosition = direction.value === 'horizontal' ? e.clientX : e.clientY
    mouse.startSize = direction.value === 'horizontal' ? leftWidth.value : topHeight.value

    // 添加全局事件监听
    document.addEventListener('mousemove', mouse.mousemove)
    document.addEventListener('mouseup', mouse.mouseup)
  },

  mousemove(e) {
    if (!mouse.isMoving) return

    // 计算移动距离并更新尺寸
    const delta =
      direction.value === 'horizontal'
        ? e.clientX - mouse.startPosition
        : e.clientY - mouse.startPosition
    const newSize = mouse.startSize + delta

    // 获取父容器尺寸（减去拖拽条的宽度/高度）
    const parentSize = getParentSize()

    // 更新相应尺寸
    if (direction.value === 'horizontal') {
      leftWidth.value = newSize > parentSize ? parentSize : newSize < 0 ? 0 : newSize
    } else {
      topHeight.value = newSize > parentSize ? parentSize : newSize < 0 ? 0 : newSize
    }
  },

  mouseup() {
    mouse.isMoving = false
    document.removeEventListener('mousemove', mouse.mousemove)
    document.removeEventListener('mouseup', mouse.mouseup)
  },
})

// 记录折叠前的尺寸
const collapse = reactive({
  savedSize: 0,
})

// 处理快捷按钮触发的折叠/展开事件
const handleToggle = () => {
  if (direction.value === 'horizontal') {
    if (leftWidth.value > 0) {
      // 折叠时保存当前宽度
      collapse.savedSize = leftWidth.value
      leftWidth.value = 0
    } else {
      // 展开时恢复之前保存的宽度
      leftWidth.value = collapse.savedSize || 200
    }
  } else {
    if (topHeight.value > 0) {
      // 折叠时保存当前高度
      collapse.savedSize = topHeight.value
      topHeight.value = 0
    } else {
      // 展开时恢复之前保存的高度
      topHeight.value = collapse.savedSize || 200
    }
  }
}

// 确保组件卸载时移除所有事件监听器
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', mouse.mousemove)
  document.removeEventListener('mouseup', mouse.mouseup)
  window.removeEventListener('resize', onResize)
})
</script>

<style lang="scss" scoped>
.jas-resize {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &.jas-resize-horizontal {
    flex-direction: row;
  }

  &.jas-resize-vertical {
    flex-direction: column;
  }
}

// 是否允许选中文本，拖拽时，需要禁掉，可能造成二次拖拽鼠标锁定
.events_none {
  user-select: none;
}
</style>
