// Реализуй функцию memoize(fn), которая кеширует результаты вызовов.
export const memoize = (fn: Function) => {
  const mapCache = new Map();

  return function (...args) {
    const cacheKey = JSON.stringify(args);

    if (mapCache.has(cacheKey)) {
      return mapCache.get(cacheKey);
    }
    const result = fn(...args);
    mapCache.set(cacheKey, result);
    return result;
  };
};
