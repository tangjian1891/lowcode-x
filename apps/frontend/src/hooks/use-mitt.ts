import mitt from "mitt";
const emitter = mitt();

type EventName = "check:menu";
export function useEventBus() {
  const handlers: Array<[EventName, any]> = [];

  const instance = getCurrentInstance();
  if (instance) {
    onUnmounted(() => {
      handlers.forEach((handler) => {
        emitter.off(handler[0], handler[1]);
      });
    });
  }

  function on(eventName: EventName, fn: (payload?: any) => void) {
    handlers.push([eventName, fn]);
    emitter.on(eventName, fn);
  }

  function emit(eventName: EventName, payload?: any) {
    emitter.emit(eventName, payload); // mitt emit 遵循single payload 单载荷 。
  }

  return {
    on,
    emit,
  };
}
