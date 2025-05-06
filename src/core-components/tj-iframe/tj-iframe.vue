<template>
  <iframe
    v-if="iframeSrc"
    :src="iframeSrc + `?user=admin&mode=simple&outLinkToken=${outLinkToken}`"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
</template>

<script lang="ts" setup>
import { Menu } from '@/views/layout/index'

// import { workApi } from '@/api/business/workbench'
// https://juejin.cn/post/6991828558096105485#heading-0
const props = defineProps({
  menu: Menu,
})
const outLinkToken = ''
onMounted(async () => {
  try {
  } finally {
  }
})
const iframeSrc = computed(() => {
  const url = props.menu?.value
  if (!url) {
    return ''
  } else {
    return decodeURIComponent(url)
  }
})
</script>
