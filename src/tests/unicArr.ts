// Напиши функцию, которая возвращает массив уникальных значений из исходного массива.

const getUnicArr = (arr: any[]) => {
  //1 var
  // const setArr= new Set(arr)
  // return Array.from(setArr)

  //2 var
  const testObj: { [key: string]: string } = {};
  arr.forEach((el) => (testObj[el] = ""));
  return Object.keys(testObj);
};
