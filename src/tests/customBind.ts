// Напиши свой вариант Function.prototype.bind — с поддержкой передачи контекста и частичных аргументов.

export function customBind(parentCtx: any, ...parentArgs: any) {
  if (typeof this !== "function") {
    return null;
  }
  const parentFn = this;

  return function (...args: any[]) {
    const newArgs = [...parentArgs, ...args];
    return parentFn.apply(parentCtx, newArgs);
  };
}
