// Реализуй функцию для глубокого сравнения двух объектов (deepEqual).
export const deepEqual = (obj1: object, obj2: object) => {
  if (Object.is(obj1, obj2)) {
    return true;
  }
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  const isAnyKeyExist = obj1Keys.every((key) => obj2Keys.includes(key));
  if (!isAnyKeyExist) {
    return false;
  }
  const isEveryKeyValueEqual = obj1Keys.every((key) => {
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      return deepEqual(obj1[key], obj2[key]);
    }
    return obj1[key] === obj2[key];
  });
  return isEveryKeyValueEqual;
};
