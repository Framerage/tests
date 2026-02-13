const promisify = (fn: Function) => {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
};
const checkPollindrom = (str1: string, str2: string, cb: Function) => {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    cb(new Error("Оба аргумента должны быть строкой"));
  } else {
    cb(str1, str2.split("").reverse().join(""));
  }
};
const pollindromWrapper = promisify(
  checkPollindrom("ololo", "olalo", (a: string, b: string) => a === b),
); // args like a example

pollindromWrapper("ololo", "olalo")
  .then((res) => console.log(`Result: ${res}`))
  .catch((err) => {
    console.log("Error" + err);
  });
// в итоге возвращаем промис, который внутри обрабатывает ошибки обработки промиса, тем самым можно вызывать функцию, которую нужно подождать , просто
// передавая нужные аргументы, без передачи вторым аргументом колбэк для обработки ошибок
