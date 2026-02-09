// Реализуй простую версию EventEmitter с методами on, off и emit.
class EventEmitter {
  #emittedHandlers = new Map<string, Set<Function>>();
  on(handlerKey: string, handler: Function) {
    if (this.#emittedHandlers.has(handlerKey)) {
      const handlersSet: Set<Function> | undefined =
        this.#emittedHandlers.get(handlerKey);
      if (handlersSet?.has(handler)) {
        handlersSet.delete(handler);
      }
      handlersSet?.add(handler);
    } else {
      const handlerKeyFns = new Set<Function>();
      this.#emittedHandlers.set(handlerKey, handlerKeyFns.add(handler));
    }
  }
  emit(handlerKey: string, handlerArg: any) {
    if (!this.#emittedHandlers.has(handlerKey)) {
      throw new Error("Нету handlers");
    }
    const handlerKeyValue: Set<Function> | undefined =
      this.#emittedHandlers.get(handlerKey);
    handlerKeyValue?.forEach((fn) => fn?.(handlerArg));
  }
  off(handlerKey: string, handler: Function | null = null) {
    if (this.#emittedHandlers.has(handlerKey)) {
      const handlersSet = this.#emittedHandlers.get(handlerKey);
      if (handler) {
        handlersSet?.delete(handler);
        if (handlersSet?.size === 0) this.#emittedHandlers.delete(handlerKey);
      } else {
        this.#emittedHandlers.delete(handlerKey);
      }
    }
  }
  clear() {
    this.#emittedHandlers.clear();
  }
}
