<template>
  <!-- <jas-form :formId="formId" :mode="mode" /> -->
</template>

<script lang="ts" setup>
// import JasForm from './jas-form-page.vue'
const route = useRoute()

const formId = route.query.formId
const mode = route.query.mode
</script>

<style lang="scss" scoped></style>
