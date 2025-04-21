<template>
  <!-- <jas-table></jas-table> -->
  <router-view></router-view>
</template>
<script setup lang="ts">
import JasTable from '@/jas-table/index.vue'
import Child from '@/Child.vue'
import { render } from 'vue'
import { ElButton } from 'element-plus'
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
