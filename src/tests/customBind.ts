// Напиши свой вариант Function.prototype.bind — с поддержкой передачи контекста и частичных аргументов.

export const customBind = (parentCtx: any, ...parentArgs) => {
  const parentFn = this;

  return function (...args) {
    const newArgs = [...parentArgs, ...args];
    return parentFn.apply(parentCtx, ...newArgs);
  };
};
