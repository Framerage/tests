const testSum = (nums: number[], target: number) => {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    const diff = target - cur;
    if (obj[diff] !== undefined) {
      return [obj[diff], i];
    }
    obj[cur] = i;
  }
  return [];
};
// testSum([2,7,11,15],9)
//[0,1]
