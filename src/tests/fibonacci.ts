const fibo = (num: number) => {
  if (num > 1) {
    return fibo(num - 1) + fibo(num - 2);
  }
  return num < 0 ? NaN : num === 0 ? 0 : 1;
};

const fiboNew = (n: number) => {
  if (n < 0) return NaN;
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
    // const next = prev + curr;
    //   console.log(next, ' next - prev ',prev,'cur',curr)
    // prev = curr;
    // curr = next;
    //   console.log(prev,'prev new')
    //   console.log(curr,'curr new')
  }

  return curr;
};
