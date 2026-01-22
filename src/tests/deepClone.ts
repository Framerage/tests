// Реализуй функцию deepClone, которая делает глубокую копию объекта.
export function deepClone(obj1: object, obj2: object) {
  for (const key in obj1) {
    const value = obj1[key];

    if (Array.isArray(value)) {
      obj2[key] = value.map((item) =>
        typeof item === "object" && item !== null ? deepClone(item, {}) : item,
      );
    } else if (typeof value === "object" && value !== null) {
      obj2[key] = deepClone(value, obj2[key] ?? {});
    } else {
      obj2[key] = value;
    }
  }

  return obj2;
}
