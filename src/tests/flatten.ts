// Реализуй функцию flatten, которая превращает вложенный массив в плоский (с возможностью указания глубины).
export const flatten = (arr: any[], depth = 1) => {
  //   [
  //   [1, 2],
  //   [3, [4]],
  // ]
  let depthStep = 0;
  const resultArr = [];

  const checkElemByArray = (array: any[]) => {
    array.forEach((el) => {
      console.log(el, "step ", depthStep);
      if (Array.isArray(el) && depthStep <= depth) {
        depthStep++;
        checkElemByArray(el);
      } else {
        resultArr.push(el);
      }
    });
  };
  checkElemByArray(arr);
  return resultArr;
  // [1,2,3,[4]]
};
