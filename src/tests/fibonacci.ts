const fibo = (num: number) => {
  if (num > 1) {
    return fibo(num - 1) + fibo(num - 2);
  }
  return num < 0 ? NaN : num === 0 ? 0 : 1;
};

const fiboNew = (num: number) => {
  if (num > 1) {
    let prev = 0;
    let curr = 1;

    for (let i = 2; i <= num; i++) {
      [prev, curr] = [curr, prev + curr];
    }

    return curr;
  }
  return num < 0 ? NaN : num === 0 ? 0 : 1;
};
