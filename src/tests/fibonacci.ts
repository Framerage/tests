const fibo = (num: number) => {
  if (num > 1) {
    return fibo(num - 1) + fibo(num - 2);
  }
  return num < 0 ? NaN : num === 0 ? 0 : 1;
};
