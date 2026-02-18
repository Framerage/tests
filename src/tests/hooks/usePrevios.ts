import { useEffect, useRef, useState } from "react";
// вариант вывода предыдущего значения, если значение изменилось
export const usePrevious = <T>(v: T): T | null => {
  const cache = useRef<T | null>(null);
  const [prev, setPrev] = useState<T | null>(null);
  useEffect(() => {
    if (cache?.current !== v) {
      setPrev(cache.current);
      cache.current = v;
    }
  }, [v]);
  return prev;
};

//вариант для вывода предыдущего значения при каждом ререндере
export const useAlwaysPrevious = <T>(v: T | null) => {
  const prev = useRef<T | null>(null);
  useEffect(() => {
    prev.current = v;
  });
  return prev;
};
