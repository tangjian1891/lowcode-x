<template>
  <div
    :class="['resize-bar', `resize-bar--${direction}`]"
    :style="direction === 'horizontal' ? { width: barWidth + 'px' } : { height: barWidth + 'px' }"
    @mousedown.prevent="emit('mousedown', $event)"
  >
    <!-- 中心常驻快捷按钮 -->
    <div class="resize-bar__toggle" @click.stop="toggleSections">
      <span
        :class="[
          'resize-bar__toggle-icon',
          `resize-bar__toggle-icon--${direction}`,
          { 'resize-bar__toggle-icon--collapsed': !panelSize },
        ]"
      ></span>
    </div>
    <div class="resize-bar__extra"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  barWidth: {
    type: Number,
    default: 1,
  },
  panelSize: Number,
  direction: {
    type: String,
    default: 'horizontal',
  },
})

const emit = defineEmits(['mousedown', 'toggle'])

// 处理快捷按钮点击事件
const toggleSections = (event) => {
  event.stopPropagation()
  emit('toggle')
}
</script>

<style lang="scss" scoped>
.resize-bar {
  position: relative;
  flex-shrink: 0;
  background-color: black;
  transition: background-color 0.2s;

  // 基础样式（水平布局）
  &--horizontal {
    cursor: ew-resize;
    height: 100%;

    .resize-bar__extra {
      width: 20px;
      height: 100%;
      right: -20px;
      top: 0;
    }

    &:hover .resize-bar__extra {
      box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    }

    .resize-bar__toggle {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  // 垂直布局特殊样式
  &--vertical {
    cursor: ns-resize;
    width: 100%;

    .resize-bar__extra {
      width: 100%;
      height: 20px;
      bottom: -20px;
      left: 0;
    }

    &:hover .resize-bar__extra {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .resize-bar__toggle {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  // 鼠标悬停效果
  &:hover {
    background-color: #f0f0f0;

    .resize-bar__extra {
      opacity: 1;
      background-color: rgba(245, 245, 245, 0.8);
    }
  }

  // 额外区域样式
  &__extra {
    position: absolute;
    background-color: transparent;
    transition: all 0.3s ease;
    opacity: 0;
    box-shadow: none;
  }

  // 折叠/展开按钮
  &__toggle {
    position: absolute;
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

    // 折叠/展开图标
    &-icon {
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-right: 4px solid #666;
      transition: transform 0.3s;

      // 水平方向图标
      &--horizontal {
        &.resize-bar__toggle-icon--collapsed {
          transform: rotate(180deg);
        }
      }

      // 垂直方向图标
      &--vertical {
        transform: rotate(90deg);

        &.resize-bar__toggle-icon--collapsed {
          transform: rotate(270deg);
        }
      }
    }
  }
}
</style>
