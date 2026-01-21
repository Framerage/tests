// 22.12
// Реализуй функцию, которая находит самое часто встречающееся значение в массиве.
const findNeo = (arr) => {
  const testObj = {};
  arr.forEach((el) => {
    const key = String(el);
    testObj[key] ? testObj[key]++ : (testObj[key] = 1);
  });
  const result = Object.entries(testObj).sort((a, b) => b[1] - a[1]);

  return result[0][0];
};
