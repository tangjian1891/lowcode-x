<template>
  <div
    ref="jasTwoResizeRef"
    :draggable="false"
    class="jas-resize"
    :class="{ events_none: mouse.isMoving }"
  >
    <div :style="{ width: leftWidth + 'px', 'flex-shrink': 0 }">
      <slot name="section1"></slot>
    </div>
    <jas-resize-bar @mousedown="mouse.mousedown($event)"></jas-resize-bar>
    <div style="flex: 1">
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
})
const slots = defineSlots()

// 将 span 转换为数值并作为初始左侧宽度
const leftWidth = ref(typeof props.span === 'string' ? parseInt(props.span) : props.span)
const jasTwoResizeRef = ref<HTMLElement | null>(null)

// 获取父容器宽度
const getParentWidth = () => {
  if (jasTwoResizeRef.value) {
    return jasTwoResizeRef.value.clientWidth
  }
  return 0
}

// 简化后的拖拽控制逻辑
const mouse = reactive({
  isMoving: false,
  startX: 0,
  startWidth: 0,

  mousedown(e) {
    // 记录初始位置和宽度
    mouse.isMoving = true
    mouse.startX = e.clientX
    mouse.startWidth = leftWidth.value

    // 添加全局事件监听
    document.addEventListener('mousemove', mouse.mousemove)
    document.addEventListener('mouseup', mouse.mouseup)
  },

  mousemove(e) {
    if (!mouse.isMoving) return

    // 计算移动距离并更新宽度
    const deltaX = e.clientX - mouse.startX
    const newWidth = mouse.startWidth + deltaX

    // 获取父容器宽度
    const parentWidth = getParentWidth()

    // 设置最小宽度和最大宽度限制
    // 最小不小于50px，最大不超过父容器宽度
    const maxAllowedWidth = parentWidth > 0 ? parentWidth : Infinity
    leftWidth.value = Math.min(maxAllowedWidth, Math.max(50, newWidth))
  },

  mouseup() {
    mouse.isMoving = false
    document.removeEventListener('mousemove', mouse.mousemove)
    document.removeEventListener('mouseup', mouse.mouseup)
  },
})

// 在组件挂载后获取初始父容器宽度
onMounted(() => {
  // 确保初始宽度不超过父容器限制
  const parentWidth = getParentWidth()
  if (parentWidth > 0) {
    if (leftWidth.value > parentWidth) {
      leftWidth.value = parentWidth
    }
  }
})

// 确保组件卸载时移除所有事件监听器
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', mouse.mousemove)
  document.removeEventListener('mouseup', mouse.mouseup)
})
</script>

<style lang="scss" scoped>
.jas_two_resize {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
}

// 从 jas-resize-bar 组件合并过来的样式
.jas_resize_bar {
  flex-basis: 1px;
  background: transparent;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-left: 1px solid #dcdfe3;
  padding-right: 10px;

  .quick_btn {
    opacity: 1;
    cursor: pointer;
    background-color: #fff;
    position: absolute;
    left: -1px;
    border: 1px solid rgba(164, 172, 184, 0.3607843137);
    border-left: none;
    border-radius: 0 6px 6px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      font-size: 12px;
      pointer-events: none;
      color: #a4acb8;
    }
  }

  &:hover {
    border-left: 1px solid var(--el-color-primary);
  }
}

// 是否允许选中文本，拖拽时，需要禁掉，可能造成二次拖拽鼠标锁定
.events_none {
  user-select: none;
}

.jas-resize {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
