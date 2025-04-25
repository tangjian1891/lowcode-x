<template>
  <component :is="targetComp" :menu="menu"> </component>
</template>

<script lang="ts" setup>
import { Menu, SubMenuType } from '.'

const targetComp = shallowRef()
const menu = ref()
onMounted(() => {
  // 外部链接
  //   menu.value = new Menu({
  //     name: '随便',
  //     subType: SubMenuType.EXTERNAL_MENU,
  //     value: 'https://www.baidu.com',
  //   })
  //   targetComp.value = defineAsyncComponent(() => {
  //     return import('@/views/iframe-container.vue')
  //   })

  // 内部链接
  menu.value = new Menu({
    name: '内部的',
    subType: SubMenuType.INTERNAL,
    value: 'https://www.baidu.com',
  })
  targetComp.value = defineAsyncComponent(() => {
    return import('@/views/manage-plan/manage-plan.vue')
  })
})
</script>

<style lang="scss" scoped></style>
