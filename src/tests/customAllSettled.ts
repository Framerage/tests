// Напиши собственную реализацию Promise.allSettled.
export const customPromiseAllSettled = (promises: Promise[]) => {
  return new Promise((res) => {
    const resultPromises = [];
    let promiseStep = 0;
    const promisesLen = promises.length;
    if (promisesLen === 0) {
      return res(resultPromises);
    }
    promises.forEach((prom) => {
      Promise.resolve(prom)
        .then((r) => {
          resultPromises.push({ data: r, status: "fulfilled" });
        })
        .catch((err) => {
          resultPromises.push({ error: err, status: "reject" });
        })
        .finally(() => {
          promiseStep++;
          promisesLen === promiseStep && resolve(resultPromises);
        });
    });
  });
};
