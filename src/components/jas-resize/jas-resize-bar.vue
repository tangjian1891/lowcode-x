<template>
  <div
    class="quick_btn"
    :style="{ 'flex-basis': barWidth + 'px' }"
    @mousedown.prevent="emit('mousedown', $event)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 中心常驻快捷按钮 -->
    <div class="toggle-button" @click.stop="toggleSections">
      <span class="toggle-icon" :class="{ collapsed: leftWidth === 0 }"></span>
    </div>
    <!-- 鼠标悬停时显示的阴影区域 -->
    <div class="hover-shadow" :class="{ active: isHovered }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  barWidth: {
    type: Number,
    default: 10,
  },
  leftWidth: Number,
})

const isHovered = ref(false)
const isCollapsed = ref(false)

const emit = defineEmits(['mousedown', 'toggle'])

// 处理快捷按钮点击事件
const toggleSections = (event) => {
  event.stopPropagation() // 阻止事件冒泡
  emit('toggle')
}
</script>

<style lang="scss" scoped>
.quick_btn {
  cursor: move;
  flex-shrink: 0;
  background-color: black;
  position: relative;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  // 常驻的快捷按钮
  .toggle-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 3;
    transition: all 0.2s;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #f5f5f5;
      border-color: #aaaaaa;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    }

    .toggle-icon {
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-right: 4px solid #666;
      transition: transform 0.3s;

      &.collapsed {
        transform: rotate(180deg);
      }
    }
  }

  // 鼠标悬停时扩大的阴影区域
  .hover-shadow {
    position: absolute;
    top: 0;
    left: -5px; // 向左扩展5px
    right: -5px; // 向右扩展5px
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.05);
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none; // 不影响鼠标事件
    z-index: 1;

    &.active {
      opacity: 1;
    }
  }
}
</style>
