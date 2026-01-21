// Реализуй простую функцию debounce(fn, delay), которая ограничивает частоту вызовов функции.
const debounce = (fn, delay) => {
  const timer = setTimeout(() => {
    fn();
    clearTimeout(timer);
  }, delay);
};
