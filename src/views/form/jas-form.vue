<template>
  <!-- <jas-form :formId="formId" :mode="mode" /> -->
</template>

<script lang="ts" setup>
// import JasForm from './jas-form-page.vue'

// 页面分为三种：
//1.数据驱动表单
//2.外链iframe表单
//3.自定义表单
const route = useRoute()

const formId = route.query.formId
const mode = route.query.mode
</script>

<style lang="scss" scoped></style>
