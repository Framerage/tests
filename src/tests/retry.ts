// Реализуй функцию, которая делает retry вызова асинхронной функции заданное количество раз при ошибке.

export const retry = (asyncFn: Promise, retryCounts: number) => {
  let repeatCount = 0;
  return new Promise((resolve, reject) => {
    checkFb(repeatCount);

    function checkFb(repeats: number) {
      asyncFn()
        .then((res) => resolve(res))
        .catch((err) => {
          ++repeatCount;
          if (repeats === retryCounts) {
            reject(new Error("Лимит повторений", err));
          } else {
            checkFb(repeatCount);
          }
        });
    }
  });
};
