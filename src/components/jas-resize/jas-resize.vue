<template>
  <div
    ref="jasTwoResizeRef"
    :draggable="false"
    class="jas-resize"
    :class="{ events_none: mouse.isMoving }"
  >
    <div
      :style="{
        width: leftWidth + 'px',
        'flex-shrink': 0,
        overflow: 'hidden',
      }"
    >
      <slot name="section1"></slot>
    </div>
    <jas-resize-bar
      :bar-width="barWidth"
      :left-width="leftWidth"
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
})
onMounted(() => {
  getParentWidth()
  // 监听窗口大小变化
  window.addEventListener('resize', onResize)
})
function onResize() {
  if (leftWidth.value > getParentWidth()) {
    leftWidth.value = getParentWidth()
  }
}

// 将 span 转换为数值并作为初始左侧宽度
const leftWidth = ref(typeof props.span === 'string' ? parseInt(props.span) : props.span)
const jasTwoResizeRef = ref<HTMLElement | null>(null)

// 获取父容器可用宽度
const getParentWidth = () => {
  if (jasTwoResizeRef.value) {
    return jasTwoResizeRef.value.clientWidth - props.barWidth
  }
  return 0
}

// 简化后的拖拽控制逻辑
const mouse = reactive({
  parentWidt: 0, //父元素得宽度
  isMoving: false,
  startX: 0, //移动时，初始绝对距离
  startWidth: 0, //移动时，初始得宽度

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

    // 获取父容器宽度（减去拖拽条的宽度）
    const parentWidth = getParentWidth()
    // 左侧宽度+拖拽bar。不得超过父元素宽度
    leftWidth.value = newWidth > parentWidth ? parentWidth : newWidth < 0 ? 0 : newWidth
  },

  mouseup() {
    mouse.isMoving = false
    document.removeEventListener('mousemove', mouse.mousemove)
    document.removeEventListener('mouseup', mouse.mouseup)
  },
})

// 记录左侧面板是否折叠状态
const collapse = reactive({
  savedWidth: 0,
})

// 处理快捷按钮触发的折叠/展开事件
const handleToggle = () => {
  if (leftWidth.value > 0) {
    // 折叠时保存当前宽度
    collapse.savedWidth = leftWidth.value
    leftWidth.value = 0
  } else {
    // 展开时恢复之前保存的宽度
    leftWidth.value = collapse.savedWidth
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
