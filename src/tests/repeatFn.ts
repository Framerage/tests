// Реализуй функцию, которая возвращает сумму при множественных вызовах: sum(1)(2)(3) == 6.

function sum(arg: number = 0) {
  let current = arg;
  const insideSum = (num: number) => {
    current += num;
    return insideSum;
  };
  insideSum.toString = () => current;
  return insideSum;
  //   return (s: number) => {
  //   return sum(arg + s);
  // };
}
