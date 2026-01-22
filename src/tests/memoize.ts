// Реализуй функцию memoize(fn), которая кеширует результаты вызовов.
export const memoize = ({
  fn,
  memorySize = 50,
}: {
  fn: Function;
  memorySize: number;
}) => {
  const mapCache = new Map();

  return function (...args) {
    const cacheKey = JSON.stringify(args);

    if (mapCache.has(cacheKey)) {
      const value = mapCache.get(cacheKey);
      mapCache.delete(cacheKey);
      mapCache.set(cacheKey, value);
      return value;
    }
    const result = fn(...args);
    if (mapCache.size >= memorySize) {
      const oldCacheKey = mapCache.keys().next().value;
      mapCache.delete(oldCacheKey);
    }
    mapCache.set(cacheKey, result);
    return result;
  };
};

// вариант с вложенными Map()
const memoEntry = (fn: Function) => {
  type TCache = {
    weakCache?: WeakMap<object, any>;
    mapCache?: Map<any, any>;
    result?: any;
  };
  const cache: TCache = {};

  const checkCacheNode = (node: TCache, arg: any) => {
    const isSimpleObject =
      (typeof arg === "object" && arg) || typeof arg === "function";
    if (isSimpleObject) {
      if (!node?.weakCache) {
        node.weakCache = new WeakMap();
      }
      if (!node.weakCache.has(arg)) {
        node.weakCache.set(arg, {});
      }
      return node.weakCache.get(arg);
    } else {
      if (!node.mapCache) {
        node.mapCache = new Map();
      }
      if (!node.mapCache.has(arg)) {
        node.mapCache.set(arg, {});
      }
      return node.mapCache.get(arg)!;
    }
  };

  return function (...args: any[]) {
    let checkedNode = cache;
    for (const arg of args) {
      checkedNode = checkCacheNode(checkedNode, arg);
    }

    if (Object.prototype.hasOwnProperty.call(checkedNode, "value")) {
      return checkedNode.result;
    }

    const result = fn(...args);
    checkedNode.result = result;
    return result;
  };
};
