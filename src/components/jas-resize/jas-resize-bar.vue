<template>
  <div
    class="quick_btn"
    :class="{ 'vertical-bar': direction === 'vertical' }"
    :style="
      direction === 'horizontal'
        ? { width: barWidth + 'px' }
        : { height: barWidth + 'px', width: '100%' }
    "
    @mousedown.prevent="emit('mousedown', $event)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 中心常驻快捷按钮 -->
    <div class="toggle-button" @click.stop="toggleSections">
      <span
        class="toggle-icon"
        :class="{
          collapsed:
            (direction === 'horizontal' && leftWidth === 0) ||
            (direction === 'vertical' && leftWidth === 0),
          vertical: direction === 'vertical',
        }"
      ></span>
    </div>
    <div :class="['extra', { active: isActive }]" @mouseover="mouseover" @mouseout="mouseout"></div>
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
  direction: {
    type: String,
    default: 'horizontal', // 'horizontal' 或 'vertical'
  },
})

const isHovered = ref(false)
const isCollapsed = ref(false)

const emit = defineEmits(['mousedown', 'toggle'])

// 处理快捷按钮点击事件
const toggleSections = (event) => {
  event.stopPropagation() // 阻止事件冒泡
  emit('toggle')
}

const isActive = ref(false)
function mouseover() {
  clearTimeout(timeSeed)
  isActive.value = true
}
let timeSeed
function mouseout() {
  clearTimeout(timeSeed)
  timeSeed = setTimeout(() => {
    isActive.value = false
  }, 300)
}
</script>

<style lang="scss" scoped>
.quick_btn {
  position: relative;
  cursor: move;
  flex-shrink: 0;
  background-color: black;
  position: relative;
  transition: background-color 0.2s;

  &.vertical-bar {
    cursor: ns-resize;
    .extra {
      width: 100%;
      height: 20px;
      right: 0;
      bottom: -20px;
      top: auto;
    }

    &:hover .extra {
      height: 30px;
      width: 100%;
    }
  }

  .extra {
    width: 20px;
    background-color: transparent;
    height: 100%;
    transition: all 0.3s ease;
    opacity: 0;
    position: absolute;
    right: -20px;
    top: 0;
    box-shadow: none;
  }

  &:hover {
    background-color: #f0f0f0;

    .extra {
      opacity: 1;
      width: 30px;
      background-color: rgba(245, 245, 245, 0.8);
      box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  // 常驻的快捷按钮
  .toggle-button {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
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

      &.vertical {
        transform: rotate(90deg);

        &.collapsed {
          transform: rotate(270deg);
        }
      }
    }
  }
}
</style>
