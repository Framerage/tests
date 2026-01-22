// Реализуй функцию throttle(fn, delay).
const throttle = (fn: (...args) => any, delay: number) => {
  // 1var
  // let isThrottle = false,
  //   lastUpdate = 0;

  // return () => {
  //   const currentTime = Date.now();
  //   if (!isThrottle && currentTime - lastUpdate >= delay) {
  //     fn();
  //     lastUpdate = currentTime;
  //     isThrottle = true;
  //     setTimeout(() => (isThrottle = false), delay);
  //   }
  // };
  // 2var
  let isThrottle = false;
  return (...args) => {
    if (isThrottle) {
      return;
    }

    fn(...args);
    isThrottle = true;

    setTimeout(() => {
      isThrottle = false;
    }, delay);
  };
};
