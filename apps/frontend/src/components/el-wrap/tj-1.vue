<template>
  <div class="tj-1">
    <div class="tj-1-header flex justify-between items-center">
      <div class="flex items-center font-bold">
        <div>{{ title }}</div>
        <div>{{ tooltip }}</div>
      </div>
      <div>
        <el-switch v-if="showSwitch" :modelValue="modelValue" @update:modelValue="onUpdate" @change="emit('change', value)"></el-switch>
      </div>
    </div>

    <div class="tj-1-content mt-6px">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  tooltip: String,
  modelValue: {
    type: [Boolean, null],
  },
});
const attrs = useAttrs();

const emit = defineEmits(["change"]);

function onUpdate(v: Boolean) {
  const fn: any = attrs["onUpdate:modelValue"];
  fn(v);
}
const showSwitch = computed(() => {
  return !!attrs["onUpdate:modelValue"];
});
</script>

<style lang="scss" scoped>
.tj-1 {
  margin: 16px 0;
  padding: 0 16px;
}
</style>
