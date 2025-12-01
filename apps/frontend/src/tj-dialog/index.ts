import { mergeAppContext } from "@/utils/merge-app-context";
import type { App, Component } from "vue";

// 弹窗尺寸，原则上不再需要外部穿透修改大小了
export enum DialogSizeEnum {
  w320, //高 min240-max600
  w480, //高 min240-max600
  w640, //高 min240-max600
  w800, //高 height600
  w960, //高 height600 (默认)
  max, //高 (新增，编辑，详情)
  // 当需要内部元素滚动条时，弹窗体的高度，默认使用尺寸高度的最大，也可以手动调节。
}

export const dialogSizeMapping = {
  [DialogSizeEnum.w320]: {
    "--el-dialog-width": "320px",
    "--min-height": "240px",
    "--max-height": "600px",
  },
  [DialogSizeEnum.w480]: {
    "--el-dialog-width": "480px",
    "--min-height": "240px",
    "--max-height": "600px",
  },
  [DialogSizeEnum.w640]: {
    "--el-dialog-width": "640px",
    "--min-height": "240px",
    "--max-height": "600px",
  },
  [DialogSizeEnum.w800]: {
    "--el-dialog-width": "800px",
    "--height": "600px",
  },
  [DialogSizeEnum.w960]: {
    "--el-dialog-width": "960px",
    "--height": "600px",
  },
  [DialogSizeEnum.max]: {
    "--el-dialog-width": "calc(100vw - 100px)",
    "--height": "calc(100vh - var(--heightAndFooter) - 100px)",
    margin: "50px auto",
  },
};
let JasDialog: Component | null = null;
export class TjDialog {
  static Size = DialogSizeEnum;
  static sizeMapping = dialogSizeMapping;
  size = DialogSizeEnum.w960;
  component: Component | null = null;
  componentProps: any = {};
  app: App | null = null;
  mountedDiv: null | Element = document.createElement("div");
  constructor(component: Component, componentProps: any) {
    this.component = component;
    this.componentProps = componentProps;
  }
  open() {
    if (!this.component || !JasDialog) {
      return;
    }
    this.app = createApp(JasDialog, {
      component: this.component,
      componentProps: this.componentProps,
      dialogInstance: this,
    });
    mergeAppContext(this.app);
    this.app.mount(this.mountedDiv);
    document.body.appendChild(this.mountedDiv!);
  }
  close() {
    if (!this.app || !this.mountedDiv) {
      return;
    }
    this.app.unmount();
    document.body.removeChild(this.mountedDiv);
    this.app = this.mountedDiv = null;
  }
}

export function createDialog(component: any, componentOptions: any, dialogOptions: any = {}) {
  function close() {
    app.unmount();
    document.body.removeChild(div);
    app = div = null;
  }
  let app = createApp(JasDialog, {
    component,
    componentOptions,
    dialogOptions,
    onClose: close,
  });
  mergeAppContext(app);
  let div = document.createElement("div");
  document.body.appendChild(div);
  app.mount(div);
  app.close = close;
  return app;
}

(async () => {
  JasDialog = (await import("./index.vue")).default;
})();
