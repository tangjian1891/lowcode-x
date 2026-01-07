import type { App } from "vue";

/**
 * 主应用的引用，避免循环依赖
 */
let mainApp: App | null = null;

/**
 * 设置主应用引用
 * 在 main.ts 中调用，传入主应用实例
 */
export function setMainApp(app: App) {
  mainApp = app;
}

/**
 * 合并主应用上下文到子应用
 * 从 main.ts 的 assignContext 迁移过来，避免循环引用
 */
export function assignContext(childApp: App) {
  console.log("没有吗", childApp);

  if (!mainApp) {
    console.warn("主应用未初始化，无法合并上下文");
    return;
  }

  const main: any = mainApp;
  for (const key in main._context) {
    if (key !== "app") {
      const obj = main._context[key];
      (childApp as any)._context[key] = obj;
    }
  }
}

/**
 * 创建带有 ElConfigProvider 包裹的 Vue 应用实例
 * 用于解决按需引入 element-plus 时的国际化问题
 * @param component 要渲染的组件
 * @param props 传递给组件的 props
 * @returns Vue 应用实例
 */
// export function createAppWithProvider(component: Component, props?: Record<string, any>): App {
//   const app = createApp({
//     setup() {
//       return () =>
//         h(
//           ElConfigProvider,
//           { locale: zhCn },
//           {
//             default: () => h(component, props),
//           },
//         );
//     },
//   });

//   // 合并主应用上下文
//   assignContext(app);

//   return app;
// }
