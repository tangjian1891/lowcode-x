<template>
  <div ref="jasTwoResizeRef" :draggable="false" class="jas-resize">
    <template v-for="(slot, index) in slotsList" :key="slot" :is="slot">
      <component
        :style="mouse.widthList[index]"
        @mousedown="mouse.mousedown($event, index)"
        v-if="index % 2 === 1"
        :is="slot"
      ></component>
      <div v-else :style="mouse.widthList[index]">
        <component :is="slot"></component>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import JasResizeBar from './jas-resize-bar.vue'
const slots = defineSlots()
console.log('查看一下', slots)
const slotsList = computed(() => {
  const slotKeys = Object.keys(slots)
  const result = []
  slotKeys.forEach((key) => {
    result.push(slots[key])
    result.push(JasResizeBar)
  })
  result.pop()
  return result
})
const jasTwoResizeRef = ref<HTMLElement | null>(null)
onMounted(() => {
  console.log('所有的子元素', jasTwoResizeRef.value?.children)
  console.log()
  const arr = [...jasTwoResizeRef.value.children]
  mouse.widthList = arr.map((item) => {
    return { width: window.getComputedStyle(item).width }
  })
})

const mouse = reactive({
  isMoving: false,
  dom: null,
  widthList: [],
  index: 0,

  mouseup(e) {
    if (!mouse.isMoving) return
    mouse.isMoving = false
    document.removeEventListener('mousemove', mouse.mousemove)
    document.removeEventListener('mouseup', mouse.mouseup)
  },

  mousedown(e, index) {
    mouse.isMoving = true
    mouse.index = index
    document.addEventListener('mousemove', mouse.mousemove)
    document.addEventListener('mouseup', mouse.mouseup)
  },
  //   在文档中移动
  mousemove(e) {
    if (!mouse.isMoving) return
    // 调整widthList中的宽度对象
    if (jasTwoResizeRef.value) {
      // 获取所有子元素
      const children = [...jasTwoResizeRef.value.children]

      // 计算相关索引
      // 拖动条的左侧元素索引（实际内容元素）
      const leftIndex = mouse.index - 1
      // 拖动条的右侧元素索引（实际内容元素）
      const rightIndex = mouse.index + 1

      if (leftIndex >= 0 && rightIndex < children.length) {
        // 获取左侧和右侧内容元素

        // 获取当前宽度
        const leftWidth = parseFloat(mouse.widthList[leftIndex].width)
        const rightWidth = parseFloat(mouse.widthList[rightIndex].width)

        // 计算新宽度（移动差值）
        const movement = e.movementX // 鼠标移动的距离
        const newLeftWidth = leftWidth + movement
        const newRightWidth = rightWidth - movement
        console.log()
        console.log('没有吗', movement, newLeftWidth, newRightWidth)

        // 更新宽度对象
        mouse.widthList[leftIndex] = { width: `${newLeftWidth}px` }
        mouse.widthList[rightIndex] = { width: `${newRightWidth}px` }
        console.log(mouse.widthList)
      }
    }
  },
})

// 确保组件卸载时移除所有事件监听器
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', mouse.mousemove)
  document.removeEventListener('mouseup', mouse.mouseup)
})

const typeVal = ref('')
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
