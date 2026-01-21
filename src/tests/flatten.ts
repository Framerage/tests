// Реализуй функцию flatten, которая превращает вложенный массив в плоский (с возможностью указания глубины).
export const flatten = (arr: any[], depth = 1) => {
  let depthStep = 0;
  const resultArr = [];

  const checkElemByArray = (array: any[]) => {
    array.forEach((el) => {
      if (Array.isArray(el) && depthStep < depth) {
        depthStep++;
        checkElemByArray(el);
      } else {
        resultArr.push(el);
      }
    });
  };
  checkElemByArray(arr);
  return resultArr;
};
