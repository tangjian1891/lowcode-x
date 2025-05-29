// import './assets/main.css'

import { createApp, h } from "vue";
import { createPinia } from "pinia";
import "@/assets/scss/cover-element-plus/index.scss";

import App from "./App.vue";
import router from "./router";
import VxeUITable, { VxeUI } from "vxe-table";
import "vxe-table/lib/style.css";
import VxeUIAll from "vxe-pc-ui";
import "vxe-pc-ui/lib/style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:uno.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Tj1 from "@/components/el-wrap/tj-1.vue";
import { mergeAppContext } from "./utils/merge-app-context";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
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
});

VxeUITable.VxeUI.renderer.add("MyTableCellLink", {
  // 默认显示模板
  renderTableDefault(renderOpts, renderParams) {
    return h("span", {}, "什么啊12312123");
  },
});

VxeUI.renderer.add("setStyle", {
  tableCellClassName() {
    console.log("没有吗啊");

    return "redredredredredred";
  },
  tableCellStyle() {
    return { color: "red", background: "blue" };
  },
  renderTableDefault() {
    return "分分分";
  },
});

VxeUI.renderer.add("MyTableFilterInput", {
  renderTableHeader() {
    return h("span", {}, "表头");
  },
});

app.component("Tj1", Tj1);
app.use(createPinia());
app.use(router);
app.use(VxeUITable);
app.use(VxeUIAll);
app.use(ElementPlus);
app.mount("#app");

mergeAppContext(app);
