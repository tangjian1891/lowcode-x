<template>
  <!-- <div :style="jasResizeBar" class="jas_resize_bar shrink" @mousedown="mousedown">
    <div :style="quickBtnStyle" class="quick_btn" @mousedown.prevent @click.prevent="quickBtn">
      <jas-icon v-if="isOpen" icon-name="jas-cloud-shuangjiantou-zuo"></jas-icon>
      <jas-icon v-else icon-name="jas-cloud-shuangjiantou-you"></jas-icon>
    </div>
  </div> -->

  操作栏目
</template>

<script lang="ts">
export default {
  name: 'JasResizeBar',
  inject: ['quickBtnFn', 'mousedownFn', 'typeFn'],
  data() {
    return {
      isOpen: true,
    }
  },
  computed: {
    type() {
      //   return this.typeFn()
    },
    quickBtnStyle() {
      if (this.type === 'vertical') {
        return { width: '50px', height: '100%' }
      } else {
        return { height: '50px', width: '16px' }
      }
    },
    jasResizeBar() {
      if (this.type === 'vertical') {
        return { cursor: 'row-resize' }
      } else {
        return { cursor: 'col-resize' }
      }
    },
  },
  methods: {
    quickBtn(e) {
      this.isOpen = !this.isOpen
      this.quickBtnFn(e)
    },
    mousedown(e) {
      this.mousedownFn(e)
    },
  },
}
</script>

<style lang="scss" scoped>
.jas_resize_bar {
  flex-basis: 1px;
  background: transparent;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-left: 1px solid #dcdfe3;
  padding-right: 10px;
  .quick_btn {
    opacity: 1;
    cursor: pointer;
    background-color: #fff;
    position: absolute;
    left: -1px;
    border: 1px solid rgba(164, 172, 184, 0.3607843137);
    border-left: none;
    border-radius: 0 6px 6px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      font-size: 12px;
      pointer-events: none;
      color: #a4acb8;
    }
  }

  &:hover {
    border-left: 1px solid var(--el-color-primary);
  }
}
</style>
