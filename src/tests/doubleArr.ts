// Дан массив чисел. Верни новый массив, где каждое число умножено на 2.
const doubleArr = (arr: number[]) => {
  //1 var
  // return arr.map(el=>el*2)

  const resArr: number[] = [];
  arr.forEach((el) => resArr.push(el * 2));
  return resArr;
};
