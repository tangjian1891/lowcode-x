import { assignContext } from "@/utils/create-app-with-provider";
import { ElButton, ElDialog, ElIcon } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { createApp, defineComponent, reactive, ref, type App, type DefineComponent } from "vue";

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
  dialogProps = {
    title: "",
    fullscreen: false,
    onConfirm() {},
  };
  constructor() {
    super();
  }

  /**
   * 创建一个命令式弹窗
   * @param TargetComponent 业务组件
   * @param props 业务组件需要的 Props
   */
  static create<P>(TargetComponent: DefineComponent<P, any, any, any, any>, props: P) {
    const appDialog = new AppDialog();

    const app = createApp(
      defineComponent({
        name: "AppDialog",
        setup() {
          return () => {
            const DynamicComp = TargetComponent as any;
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
                    <div class="flex flex-col min-h-[160px] overflow-y-auto">
                      <div class="grow p-6">
                        {/* 直接使用传入的 props */}
                        <DynamicComp appDialog={appDialog} {...props}></DynamicComp>
                      </div>
                    </div>
                  ),
                  footer: () => (
                    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                      <div id={appDialog.teleportId} class="flex items-center gap-3"></div>
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

export function useConfirmButton(cb: () => Promise<void> | void, options: { text?: string; type?: string } = {}) {
  const loading = ref(false);
  async function onClick() {
    loading.value = true;
    try {
      await cb();
    } catch (error) {
      console.error("Action error:", error);
    } finally {
      loading.value = false;
    }
  }

  const component = defineComponent({
    name: "ActionButton",
    inheritAttrs: false,
    setup(props, { slots, attrs }) {
      return () => {
        return (
          <ElButton {...attrs} type={(attrs.type as any) || options.type || "primary"} onClick={onClick} loading={loading.value}>
            {slots.default?.() ?? options.text ?? "确认"}
          </ElButton>
        );
      };
    },
  });

  return [component, loading] as const;
}
