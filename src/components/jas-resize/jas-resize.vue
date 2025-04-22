<template>
  <div
    ref="jasTwoResizeRef"
    :draggable="false"
    :class="['jas-resize', `jas-resize--${direction}`, { events_none: mouse.isMoving }]"
  >
    <div
      class="resize-panel resize-panel-first"
      :style="
        direction === 'horizontal'
          ? { width: firstPanelSize + 'px' }
          : { height: firstPanelSize + 'px' }
      "
    >
      <slot name="section1"></slot>
    </div>
    <jas-resize-bar
      :direction="direction"
      :bar-width="barWidth"
      :panel-size="firstPanelSize"
      @mousedown="mouse.mousedown($event)"
      @toggle="handleToggle"
    />
    <div class="resize-panel resize-panel-second">
      <slot name="section2"></slot>
    </div>
  </div>
</template>

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

// 统一使用firstPanelSize表示第一个面板的尺寸，替代原来的leftWidth和topHeight
const firstPanelSize = ref(typeof props.span === 'string' ? parseInt(props.span) : props.span)
const jasTwoResizeRef = ref<HTMLElement | null>(null)
const direction = ref(props.direction)

onMounted(() => {
  // 监听窗口大小变化
  window.addEventListener('resize', onResize)
})

// 获取父容器可用尺寸（宽度或高度）
const getParentSize = () => {
  if (jasTwoResizeRef.value) {
    return direction.value === 'horizontal'
      ? jasTwoResizeRef.value.clientWidth - props.barWidth
      : jasTwoResizeRef.value.clientHeight - props.barWidth
  }
  return 0
}

function onResize() {
  const parentSize = getParentSize()
  if (firstPanelSize.value > parentSize) {
    firstPanelSize.value = parentSize
  }
}

// 记录折叠前的尺寸
const savedSize = ref(0)

// 拖拽控制逻辑
const mouse = reactive({
  isMoving: false,
  startPosition: 0, // 移动时，初始绝对距离（X或Y）
  startSize: 0, // 移动时，初始的尺寸

  mousedown(e) {
    // 记录初始位置和大小
    mouse.isMoving = true
    mouse.startPosition = direction.value === 'horizontal' ? e.clientX : e.clientY
    mouse.startSize = firstPanelSize.value

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

    // 更新尺寸，不允许小于0或超过父容器尺寸
    firstPanelSize.value = Math.min(Math.max(0, newSize), parentSize)
  },

  mouseup() {
    mouse.isMoving = false
    document.removeEventListener('mousemove', mouse.mousemove)
    document.removeEventListener('mouseup', mouse.mouseup)
  },
})

// 处理折叠/展开事件
const handleToggle = () => {
  if (firstPanelSize.value > 0) {
    // 折叠时保存当前尺寸
    savedSize.value = firstPanelSize.value
    firstPanelSize.value = 0
  } else {
    // 展开时恢复之前保存的尺寸
    firstPanelSize.value = savedSize.value || 200
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

  // 公共面板样式
  .resize-panel {
    overflow: hidden;

    &-first {
      flex-shrink: 0;
    }

    &-second {
      flex: 1;
    }
  }

  // 水平布局（左右分割）
  &--horizontal {
    flex-direction: row;

    .resize-panel {
      height: 100%;
    }
  }

  // 垂直布局（上下分割）
  &--vertical {
    flex-direction: column;

    .resize-panel {
      width: 100%;
    }
  }
}

// 是否允许选中文本，拖拽时，需要禁掉，可能造成二次拖拽鼠标锁定
.events_none {
  user-select: none;
}
</style>
