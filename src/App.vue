<template>
  <jas-table></jas-table>

  <child v-bind="obj"></child>
</template>
<script setup lang="ts">
import JasTable from '@/jas-table/index.vue'
import Child from './Child.vue'

const obj = {
  onChange: change,
}
function change() {
  console.log('出发了')
}
</script>

<style scoped></style>
