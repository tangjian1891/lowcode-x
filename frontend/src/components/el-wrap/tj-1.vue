<template>
  <div class="tj-1">
    <div class="tj-1-header flex justify-between items-center">
      <div class="flex items-center">
        <div>{{ title }}</div>
        <div>{{ tooltip }}</div>
      </div>
      <div>
        <el-switch v-if="showSwitch" v-model="value" @change="emit('change', value)"></el-switch>
      </div>
    </div>

    <div class="tj-1-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  tooltip: String,
  showSwitch: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["change"]);

const value = defineModel();
console.log(value);
</script>

<style lang="scss" scoped>
.tj-1 {
  margin: 16px 0;
  padding: 0 16px;
}
</style>
