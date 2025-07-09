<template>
  <component v-for="item in tjTable.toolbar.inlineButtons" :key="item.id" :item="item" :is="item.component"></component>
</template>

<script lang="ts" setup>
defineProps({
  tjTable: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
