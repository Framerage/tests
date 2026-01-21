// Напиши функцию, которая принимает массив чисел и возвращает их сумму.
const sumArrItems = (arr: number[]) => {
  //1 вариант
  // return arr.reduce((acc,el)=>acc+=el,0)

  //2 вариант
  let sum = 0;
  // arr.forEach(el=>sum+=el)
  // return sum

  //3 вариант
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      // i++
      continue;
    }
    sum += arr[i];
  }
  return sum;
};
