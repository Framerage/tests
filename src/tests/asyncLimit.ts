export const testLimit = () => {
  function asyncLimit(fn: Promise, delay: number) {
    return async (...args) => {
      //вариант 1
      //   const result = await Promise.race([
      //     fn(...args),
      //     new Promise((res) => setTimeout(res, delay)),
      //   ]);

      //   const fnResult = await fn(...args);

      //   if (result !== fnResult) {
      //     return "Превышен лимит";
      //   }
      //   return fnResult;

      //вариант 2
      //   return Promise.race([
      //     fn(...args),
      //     new Promise((res, rej) =>
      //       setTimeout(() => rej("Превышен лимит"), delay),
      //     ),
      //   ]);

      //вариант 3
      return new Promise((res, rej) => {
        setTimeout(() => rej("Превышен"), delay);
        fn(...args).then(res);

        // const timer = setInterval(() => res(fn(...args)), delay);
        // setTimeout(() => {
        //   rej("Превышен лимит ожилания");
        //   clearInterval(timer);
        // }, delay );
      });
    };
  }

  const fn = async (n: number) => {
    await new Promise((res) => setTimeout(res, 100));

    return n * n;
  };

  asyncLimit(fn, 50)(5).then(console.log); //rejected: превышен лимит
  asyncLimit(fn, 150)(3).then(console.log); //resolve 9

  const fn2 = async (a: number, b: number) => {
    await new Promise((res) => setTimeout(res, 120));

    return a + b;
  };

  asyncLimit(fn2, 100)(1, 2).then(console.log); //rejected: превышен лимит
  asyncLimit(fn2, 150)(12, 22).then(console.log); //resolve 34
};
