// Реализуй функцию throttle(fn, delay).
const throttle = (fn: () => void, delay: number) => {
  let isThrottle = false,
    lastUpdate = 0;

  return () => {
    const currentTime = Date.now();
    if (!isThrottle && currentTime - lastUpdate >= delay) {
      fn();
      lastUpdate = currentTime;
      isThrottle = true;
      setTimeout(() => (isThrottle = false), delay);
    }
  };
};
