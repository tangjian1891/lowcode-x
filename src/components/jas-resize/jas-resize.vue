<template>
  <div ref="jasTwoResizeRef" :draggable="false" class="jas-resize">
    <div v-for="slot in slotsList" :key="slot">
      <component :is="slot"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import JasResizeBar from './jas-resize-bar.vue'
const slots = defineSlots()
console.log('查看一下', slots)
const slotsList = computed(() => {
  const slotKeys = Object.keys(slots)
  const result = []
  slotKeys.forEach((key) => {
    result.push(slots[key])
    result.push(JasResizeBar)
  })
  return result
})

// 调整大小组件：记录鼠标位置，获取上一个DOM，下一个DOM，当前的BarDOM
// 移动范围分为向左向右，最大移动距离不能超过DOM宽度/高度
// import { emitter } from '@/hooks/hook'
// import { isNaN } from 'lodash-es'
// const emitter = {}
// export default {
//   name: 'JasResize',
//   data() {
//     return {
//       leftDom: null,
//       rightDom: null,
//       lock: false,
//       lockPageX: 0,
//       lockPageY: 0,
//       lockLeftWidth: 0,
//       lockRightWidth: 0,
//       lockLeftHeight: 0,
//       lockRightHeight: 0,
//       isOpen: true, // 从 resize-bar 组件合并过来的状态
//     }
//   },
//   computed: {
//     typeVal() {
//       return this.type === 'vertical' ? 'column' : 'row'
//     },
//     // 下面是从 resize-bar 组件合并过来的计算属性
//     jasResizeBarStyle() {
//       return {
//         cursor: this.type === 'vertical' ? 'row-resize' : 'col-resize',
//       }
//     },
//     quickBtnStyle() {
//       if (this.type === 'vertical') {
//         return { width: '50px', height: '100%' }
//       } else {
//         return { height: '50px', width: '16px' }
//       }
//     },
//   },
//   props: {
//     type: {
//       type: String,
//       default: 'horizontal',
//     },
//     name: {
//       type: String,
//       default: '',
//     },
//     layoutCss: {
//       type: String,
//       default: 'default',
//     },
//   },
//   emits: ['move'],
//   mounted() {
//     window.addEventListener('mouseup', this.mouseup)

//     // 如果是地图相关的resize，处理地图的特殊逻辑
//     if (this.name === 'mapReszie') {
//       const barDOM = this.$refs.jasTwoResizeRef.querySelector('.quick_btn')?.parentElement
//       const previousDom = barDOM?.previousElementSibling
//       const nextDom = barDOM?.nextElementSibling

//       emitter.on('openMap', async () => {
//         const { previousDomPX, nextDomPx, totalPx } = this.getTwoSecondPx(previousDom, nextDom)
//         // 固定一半
//         const half = parseInt(totalPx / 2)
//         previousDom.style['flex-basis'] = half + 'px'
//         nextDom.style['flex-basis'] = totalPx - half + 'px'
//         await this.$nextTick()
//         window.jasMap.updateSize()
//       })

//       emitter.on('closeMap', () => {
//         const { previousDomPX, nextDomPx, totalPx } = this.getTwoSecondPx(previousDom, nextDom)
//         previousDom.style['flex-basis'] = 0 + 'px'
//         nextDom.style['flex-basis'] = totalPx + 'px'
//       })
//     }
//   },
//   beforeUnmount() {
//     window.removeEventListener('mouseup', this.mouseup)
//     window.removeEventListener('mousemove', this.mousemove)
//     emitter.off('openMap')
//     emitter.off('closeMap')
//   },
//   methods: {
//     // 点击快速折叠/展开按钮
//     quickBtn(e) {
//       this.isOpen = !this.isOpen // 切换开关状态

//       const barDOM = e.target.parentElement
//       const previousDom = barDOM.previousElementSibling
//       const nextDom = barDOM.nextElementSibling
//       const { previousDomPX, nextDomPx, totalPx } = this.getTwoSecondPx(previousDom, nextDom)

//       // 执行打开/关闭操作
//       let setPreviousPx = 0 // 准备设置的px

//       if (previousDomPX <= 10) {
//         // 当前是关闭状态，需要打开
//         setPreviousPx = parseInt(totalPx / 2) // 打开一半的px
//         if (barDOM.getAttribute('data-flexBasis')) {
//           setPreviousPx = parseInt(barDOM.getAttribute('data-flexBasis')) // 如果有记录上次打开宽度，则使用上次宽度
//         }
//       } else {
//         // 当前是打开状态，需要关闭
//         // 非地图设置关闭前的位置记录
//         if (this.name != 'mapResize') {
//           let currentPX = 0
//           if (isNaN(parseInt(getComputedStyle(previousDom)['flex-basis']))) {
//             currentPX = parseInt(getComputedStyle(previousDom)['width'])
//           } else {
//             currentPX = parseInt(getComputedStyle(previousDom)['flex-basis'])
//           }
//           barDOM.setAttribute('data-flexBasis', currentPX)
//         }
//         setPreviousPx = 0 // 关闭时设为0
//       }

//       // 设置新的尺寸
//       previousDom.style['flex-basis'] = setPreviousPx + 'px' // 设置previous元素px
//       nextDom.style['flex-basis'] = totalPx - setPreviousPx + 'px' // 设置next元素px

//       this.$emit('move')
//     },

//     // 获取两块DOM区域的宽度,以及总移动区域
//     getTwoSecondPx(previousDom, nextDom) {
//       let previousDomPX = 0

//       // 获取前一个元素的尺寸
//       const prevFlexBasis = getComputedStyle(previousDom)['flex-basis']
//       if (isNaN(parseInt(prevFlexBasis))) {
//         previousDomPX = parseInt(getComputedStyle(previousDom)['width'])
//       } else {
//         previousDomPX = parseInt(prevFlexBasis)
//       }

//       // 获取后一个元素的尺寸
//       let nextDomPx = getComputedStyle(nextDom)['flex-basis']

//       // 如果next元素是自动撑满的，需要手动获取其实际尺寸
//       if (nextDomPx == '0%') {
//         // 纵向取height，横向取width
//         nextDomPx =
//           this.type == 'vertical'
//             ? getComputedStyle(nextDom).height
//             : getComputedStyle(nextDom).width
//       }

//       nextDomPx = parseInt(nextDomPx)
//       const totalPx = previousDomPX + nextDomPx

//       return { previousDomPX, nextDomPx, totalPx }
//     },

//     // 鼠标点击
//     mousedown(e) {
//       if (e?.target?.classList?.contains('jas_resize_bar')) {
//         this.lock = true
//         const { pageX, pageY } = e

//         // 点击时，锁定位置和相关DOM元素
//         this.lockPageX = pageX
//         this.lockPageY = pageY
//         this.leftDom = e.target.previousElementSibling
//         this.rightDom = e.target.nextElementSibling

//         // 记录初始尺寸
//         this.lockLeftWidth = parseInt(getComputedStyle(this.leftDom).width)
//         this.lockRightWidth = parseInt(getComputedStyle(this.rightDom).width)
//         this.lockLeftHeight = parseInt(getComputedStyle(this.leftDom).height)
//         this.lockRightHeight = parseInt(getComputedStyle(this.rightDom).height)

//         // 禁用文本选择，防止拖动时选中文本
//         document.body.classList.add('events_none')

//         // 添加mousemove事件监听
//         window.addEventListener('mousemove', this.mousemove)
//       }
//     },

//     // 鼠标移动
//     mousemove(e) {
//       if (this.lock) {
//         const { pageX, pageY } = e

//         // 计算偏移量并应用到元素样式
//         if (this.type === 'horizontal') {
//           let offsetPx = pageX - this.lockPageX
//           const parsedOffset = parseInt(offsetPx)

//           // 限制最大偏移量
//           if (parsedOffset > 0 && parsedOffset >= this.lockRightWidth) {
//             offsetPx = this.lockRightWidth
//           } else if (parsedOffset < 0 && Math.abs(parsedOffset) >= this.lockLeftWidth) {
//             offsetPx = 0 - this.lockLeftWidth
//           }

//           // 应用新尺寸
//           this.leftDom.style['flex-basis'] = this.lockLeftWidth + offsetPx + 'px'
//           this.rightDom.style['flex-basis'] = this.lockRightWidth - offsetPx + 'px'
//         } else {
//           let offsetPx = pageY - this.lockPageY
//           const parsedOffset = parseInt(offsetPx)

//           // 限制最大偏移量
//           if (parsedOffset > 0 && parsedOffset >= this.lockRightHeight) {
//             offsetPx = this.lockRightHeight
//           } else if (parsedOffset < 0 && Math.abs(parsedOffset) >= this.lockLeftHeight) {
//             offsetPx = 0 - this.lockLeftHeight
//           }

//           // 应用新尺寸
//           this.leftDom.style['flex-basis'] = this.lockLeftHeight + offsetPx + 'px'
//           this.rightDom.style['flex-basis'] = this.lockRightHeight - offsetPx + 'px'
//         }

//         this.$emit('move')
//       }
//     },

//     // 松开鼠标按键
//     mouseup(e) {
//       if (this.lock) {
//         this.lock = false
//         document.body.classList.remove('events_none')
//         window.removeEventListener('mousemove', this.mousemove)
//       }
//     },
//   },
// }
const typeVal = ref('')
</script>

<style lang="scss" scoped>
.jas_two_resize {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
}

// 从 jas-resize-bar 组件合并过来的样式
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

// 是否允许选中文本，拖拽时，需要禁掉，可能造成二次拖拽鼠标锁定
.events_none {
  user-select: none;
}

.jas-resize {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
