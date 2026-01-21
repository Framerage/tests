// Реализуй функцию memoize(fn), которая кеширует результаты вызовов.
export const memoize = (fn: Function) => {
  const mapCache = new Map();
  const weakCache = new WeakMap();

  return function (...args) {
    let isAnyArgObj = false,
      isAnyArgNull = false,
      isAnyArgNaN = false,
      isAllArgsPrimitive = true;

    const argsLikeAKey = [];
    const objectsArgs = [];
    args.forEach((el) => {
      if (typeof el === "object") {
        if (el) {
          objectsArgs.push(el);
        } else {
          isAnyArgNull = true;
        }
        isAnyArgObj = true;
        isAllArgsPrimitive = false;
      } else if (el !== el && typeof el === "number") {
        isAnyArgNaN = true;
        isAllArgsPrimitive = false;
      } else {
        argsLikeAKey.push(el);
      }
    });
    const resultCache = new Map(),
      resultWeakCache = new Map();

    if (isAnyArgObj && !isAnyArgNull) {
      objectsArgs.forEach((key) => {
        if (!weakCache.has(key)) {
          weakCache.set(key, new Map());
        }
        resultWeakCache.set("result", weakCache.get(key));
      });
      if (isAnyArgNaN) {
        args.forEach((arg) => arg === arg && argsLikeAKey.push(arg));
        argsLikeAKey.forEach((key) => {
          if (!mapCache.has(key)) {
            mapCache.set(key, new Map());
          }
          resultCache.set("result", mapCache.get(key));
        });
      } else {
        args.forEach((key) => {
          if (!mapCache.has(key)) {
            mapCache.set(key, new Map());
          }
          resultCache.set("result", mapCache.get(key));
        });
      }
    } else if (!isAllArgsPrimitive && isAnyArgNaN) {
      args.forEach((arg) => arg === arg && argsLikeAKey.push(arg));
      argsLikeAKey.forEach((key) => {
        if (!mapCache.has(key)) {
          mapCache.set(key, new Map());
        }
        resultCache.set("result", mapCache.get(key));
      });
    } else {
      args.forEach((key) => {
        if (!mapCache.has(key)) {
          mapCache.set(key, new Map());
        }
        resultCache.set("result", mapCache.get(key));
      });
    }
    if (resultCache.has("result")) {
      return resultCache.get("result");
    } else if (resultWeakCache.has("result")) {
      return resultWeakCache.get("result");
    } else {
      const result = fn(...args);
      resultCache.set("result", result);
      return result;
    }
  };
  // example
  //       const cache = new Map();

  //   return function (...args) {
  //     let node = cache;

  //     for (const arg of args) {
  //       if (!node.has(arg)) {
  //         node.set(arg, new Map());
  //       }
  //       node = node.get(arg);
  //     }

  //     if (node.has('result')) {
  //       return node.get('result');
  //     }

  //     const result = fn.apply(this, args);
  //     node.set('result', result);
  //     return result;
  //   };
};
