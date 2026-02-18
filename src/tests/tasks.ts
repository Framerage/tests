// Реализуй функцию compose или pipe, которая объединяет несколько функций в одну.

// Реализуй простейшую версию fetch с таймаутом (например, timeoutFetch(url, ms)).
// Реализуй функцию, которая последовательно выполняет список асинхронных функций и возвращает результат всех.
// Реализуй функцию, которая объединяет несколько отсортированных массивов в один отсортированный.
// Реализуй функцию limitConcurrency(tasks, limit), которая выполняет задачи с ограничением числа параллельных промисов.

// Реализуй функцию, которая объединяет несколько отсортированных асинхронных итераторов (AsyncIterator) в один общий поток, сохранив порядок.
// Реализуй упрощённую версию собственного Promise (с поддержкой then, catch и finally)
//codewars
// [1, 2, 3, 4, 5, 6, 7];
// function nextBigger(n: number) {
//   //your code here
//   let result = -1;
//   if (n < 12) {
//     return result;
//   }
//   const stringNum = String(n);
//   if (stringNum.length > 2) {
//     const strArr = stringNum.split("");
//     const lastNum = strArr.pop();
//     let preLastNum = strArr.pop();
//     if (preLastNum === lastNum) {
//       const newPreLast = strArr.pop();
//       strArr.push(preLastNum);
//       preLastNum = newPreLast;
//     }
//     const begin = strArr.join("");

//     const newNum = parseInt(begin + lastNum + preLastNum);
//     if (newNum > parseInt(stringNum)) {
//       result = newNum;
//     }
//   } else {
//     if (parseInt(stringNum[1] + stringNum[0]) > parseInt(stringNum)) {
//       result = parseInt(stringNum[1] + stringNum[0]);
//     }
//   }
//   return result;
// }
// console.log(nextBigger(7));
// console.log(nextBigger(513));
// console.log(nextBigger(414));
// console.log(nextBigger(144));
// console.log(nextBigger(99999));

//codewars
