// import './assets/main.css'

import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VxeUITable, { VxeUI } from 'vxe-table'
import 'vxe-table/lib/style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import { mergeAppContext } from './utils/merge-app-context'
const app = createApp(App)

VxeUI.setConfig({
  table: {
    autoResize: true,
    stripe: true,
    border: true,
    round: true,
    rowConfig: {
      isHover: true,
    },
    columnConfig: {
      resizable: true,
    },
  },
})

VxeUITable.VxeUI.renderer.add('MyTableCellLink', {
  // 默认显示模板
  renderTableDefault(renderOpts, renderParams) {
    return h('span', {}, '什么啊12312123')
  },
})

VxeUI.renderer.add('setStyle', {
  tableCellClassName() {
    console.log('没有吗啊')

    return 'redredredredredred'
  },
  tableCellStyle() {
    return { color: 'red', background: 'blue' }
  },
  renderTableDefault() {
    return '分分分'
  },
})

VxeUI.renderer.add('MyTableFilterInput', {
  renderTableHeader() {
    return h('span', {}, '表头')
  },
})
app.use(createPinia())
app.use(router)
app.use(VxeUITable)
app.use(ElementPlus)
app.mount('#app')

mergeAppContext(app)
