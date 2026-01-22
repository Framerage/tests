// Напиши собственную реализацию Promise.allSettled.
export const customPromiseAllSettled = (promises: Promise<unknown>[]) => {
  return new Promise((res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultPromises: any = [];
    let promiseStep = 0;
    const promisesLen = promises.length;
    if (promisesLen === 0) {
      return res(resultPromises);
    }
    promises.forEach((prom, index) => {
      Promise.resolve(prom)
        .then((r) => {
          resultPromises.push({ data: r, status: "fulfilled", index });
        })
        .catch((err) => {
          resultPromises.push({ error: err, status: "reject", index });
        })
        .finally(() => {
          promiseStep++;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          promisesLen === promiseStep &&
            res(resultPromises.sort((a, b) => a.index - b.index));
        });
    });
  });
};
