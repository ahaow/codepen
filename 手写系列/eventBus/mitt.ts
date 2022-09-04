class EventBus {
  all: Map<string, any>;
  constructor() {
    this.all = new Map();
  }
  on(type: string, handler: Function) {
    const handlers: Array<Function> | undefined = this.all!.get(type);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.all!.set(type, [handler] as Array<Function>);
    }
  }
  off(type: string, handler?: Function) {
    const handlers: Array<Function> | undefined = this.all!.get(type);
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      } else {
        this.all!.set(type, []);
      }
    }
  }
  emit(type: string, evt?: any) {
    let handlers = this.all!.get(type);
    if (handlers) {
      (handlers as any[]).slice().map((handler) => {
        handler(evt!);
      });
    }

    handlers = this.all!.get("*");
    if (handlers) {
      (handlers as any[]).slice().map((handler) => {
        handler(type, evt!);
      });
    }
  }
}

const eventBus = new EventBus();
export default eventBus;
