// import './assets/main.css'

import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

VxeUITable.VxeUI.formats.add('mySwitch', {
  tableCellFormatMethod({ cellValue }) {
    return cellValue === 1 ? '开启' : '关闭'
  },
})

VxeUITable.VxeUI.formats.mixin({
  myAmount: {
    tableCellFormatMethod({ cellValue }, ...params) {
      console.log(cellValue, params)

      return '什么鬼东西'
    },
  },
})

VxeUITable.VxeUI.renderer.add('MyTableCellLink', {
  // 默认显示模板
  renderTableDefault(renderOpts, renderParams) {
    return h('span', {}, '什么啊12312123')
  },
})
app.use(createPinia())
app.use(router)
app.use(VxeUITable)
app.use(ElementPlus)
app.mount('#app')

console.log(123)
