import { assignContext } from "@/utils/create-app-with-provider";
import { ElDialog, ElIcon } from "element-plus";
import { Close, Download, FullScreen } from "@element-plus/icons-vue";
import { createApp, defineComponent, reactive, type App, type DefineComponent } from "vue";

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
  componentProps: Record<string, any> = {};
  dialogProps = {
    title: "",
    fullscreen: false,
    onConfirm() {},
  };
  constructor() {
    super();
  }
  static create(TargetComponent: DefineComponent<any>) {
    const appDialog = new AppDialog();
    const app = createApp(
      defineComponent({
        name: "AppDialog",
        setup() {
          return () => {
            const DynamicComp = TargetComponent as DefineComponent<{ appDialog: AppDialog }>;
            return (
              <ElDialog modelValue={true} class="w-full" show-close={false}>
                {{
                  header: () => (
                    <div class="flex items-center justify-between px-4 py-2    ">
                      <span class="cursor-default text-base font-semibold text-slate-800">{appDialog.dialogProps.title}</span>
                      <div class="flex items-center gap-3 text-slate-500">
                        <button
                          type="button"
                          class="inline-flex items-center rounded-md p-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                          onClick={() => appDialog.destory()}
                        >
                          <ElIcon>
                            <Close />
                          </ElIcon>
                        </button>
                      </div>
                    </div>
                  ),
                  default: () => (
                    <div class="flex flex-col">
                      <div class="grow">
                        <DynamicComp appDialog={appDialog}></DynamicComp>
                      </div>
                      <div class="shrink-0 flex justify-end" id={appDialog.teleportId}></div>
                    </div>
                  ),
                }}
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

  destory() {
    this.app.unmount();
    document.body.removeChild(this.mountedElement);
  }
}
