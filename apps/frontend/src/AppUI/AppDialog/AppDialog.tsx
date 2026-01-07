import { assignContext } from "@/utils/create-app-with-provider";
import ElementPlus from "element-plus";
import { ElButton, ElDialog } from "element-plus";
import type { App, Component } from "vue";

class reactiveObject {
  constructor() {
    return reactive(this);
  }
}
export class AppDialog extends reactiveObject {
  // App 实例与容器元素（只保存引用，不做副作用）
  app!: App;
  mountedElement: HTMLElement = document.createElement("div");
  teleportId = "app-" + crypto.randomUUID();
  constructor() {
    super();
  }
  static create(component: Component) {
    const appDialog = new AppDialog();
    const app = createApp(
      defineComponent({
        name: "AppDialog",
        setup(props, context) {
          return () => {
            return (
              <ElDialog modelValue={true}>
                <div>
                  <div>
                    <component appDialog={appDialog}></component>
                  </div>
                  <div id={appDialog.teleportId}></div>
                </div>
              </ElDialog>
            );
          };
        },
      }),
    );
    assignContext(app);
    app.mount(appDialog.mountedElement);
    document.body.appendChild(appDialog.mountedElement);
    appDialog.setApp(app);

    return appDialog;
  }

  setApp(app: App) {
    this.app = app;
  }

  open() {}
}
