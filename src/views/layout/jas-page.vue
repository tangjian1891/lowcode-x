<template>
  <!-- <component></component> -->
</template>

<script lang="ts" setup>
import { Menu } from '.'

const route = useRoute()
const menuId = route.params.menuId

onMounted(() => {
  const menu = new Menu({
    name: '一个菜单',
    value: '/qwer/qwrwq',
  })
})
</script>

<style lang="scss" scoped></style>
