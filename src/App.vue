<template>
  <!-- <jas-table></jas-table> -->
  <!-- <router-view></router-view> -->
  <jas-resize>
    <template #q1> 这是第一部分 </template>
    <template #q2> 这是第二部分 </template>
    <template #q3> 这是第二部分 </template>
  </jas-resize>
</template>
<script setup lang="ts">
import JasTable from '@/jas-table/index.vue'
import Child from '@/Child.vue'
import { render } from 'vue'
import { ElButton } from 'element-plus'
import JasResize from './components/jas-resize/jas-resize.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
