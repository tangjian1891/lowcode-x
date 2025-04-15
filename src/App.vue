<template>
  <jas-table></jas-table>
</template>
<script setup lang="ts">
import JasTable from '@/jas-table/index.vue'

function onclick(params: type) {}
const obj = {
  onChange: change,
}
function change() {
  console.log('出发了')
}
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
