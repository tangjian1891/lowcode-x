<template>
  <div class="quick_btn" @mousedown.prevent="emit('mousedown', $event)">
    <!-- <div>{{ mouse.isMoving ? '移动中' : '停止移动' }}</div> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
const emit = defineEmits(['mousedown'])
</script>

<style lang="scss" scoped>
.quick_btn {
  flex-basis: 10px;
  border: 1px solid black;
  cursor: move;
}
</style>
