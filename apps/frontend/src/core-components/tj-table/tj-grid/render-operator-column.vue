<template>
  <component v-for="item in tjTable.toolbar.inlineButtons" :key="item.id" :item="item" :is="item.component"></component>
</template>

<script lang="ts" setup>
const props = defineProps({
  tjTable: {
    type: Object,
    required: true,
  },
  rowData: Object,
});
//
props.tjTable.toolbar.inlineButtons.forEach((item) => {
  const p = item.props;
  for (const key in p) {
    if (key.startsWith("on") && typeof p[key] === "function") {
      // 这里可以对以on开头且为函数的属性进行处理
      const originalFn = p[key];
      p[key] = function (...args: any[]) {
        return originalFn(...args, props.rowData);
      };
    }
  }
});
</script>

<style lang="scss" scoped></style>
