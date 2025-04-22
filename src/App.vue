<template>
  <!-- <jas-table></jas-table> -->
  <!-- <router-view></router-view> -->

  <div style="width: 500px; height: 500px; border: 1px solid red">
    <jas-resize :span="300">
      <template #section1> 这是第一部分 </template>
      <template #section2> 这是第二部分 </template>
    </jas-resize>
  </div>
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
