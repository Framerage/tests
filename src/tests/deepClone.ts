// Реализуй функцию deepClone, которая делает глубокую копию объекта.
export const deepClone = (obj1: object, obj2: object) => {
  // return {...obj2,...obj1}
  const obj1Entries = Object.entries(obj1);
  obj1Entries.forEach((elem) => {
    obj2[elem[0]] = elem[1];
  });
  return obj2;
};
