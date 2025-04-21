<template>
  <jas-table :formId="formId" :mode="mode" />
</template>

<script lang="ts" setup>
import JasTable from './jas-table.vue'

const route = useRoute()

const formId = route.query.formId
const mode = route.query.mode
</script>

<style lang="scss" scoped></style>
