let app = null;
export function mergeAppContext(anyApp) {
  if (!app) {
    app = anyApp;
  } else {
    for (const key in app._context) {
      if (key !== "app") {
        const obj = app._context[key];
        anyApp._context[key] = obj;
      }
    }
  }
}
