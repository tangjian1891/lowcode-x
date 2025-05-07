<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import JasResize from './components/jas-resize/jas-resize.vue'
</script>

<!-- 满屏情况下：按高清屏幕1920*1080正常显示  Full HD-->
<style>
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  width: 100%;
}
body {
  /* 这里始终是视口的大小 */
  height: 100%;
  width: 100%;
  overflow: auto;
}
#app {
  /* 至少保持内容最小宽高，更多区域时，可使用viewport*/
  height: 100%;
  /* min-width: 1920px;
  min-height: 1080px;  */
  /* 最左侧100，导航300px,内容1000px */
  min-width: 1400px;
  /* 顶部100，内容区域400 */
  min-height: 500px;
  position: relative;
}
</style>
