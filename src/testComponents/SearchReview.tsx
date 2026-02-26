//изначальный вариант
// import React, { useEffect, useState, useCallback } from "react";

// type Props = {
//   query: string;
// };

// export const Search = ({ query }: Props) => {
//   const [results, setResults] = useState<string[]>([]);
//   const [count, setCount] = useState(0);

//   const fetchResults = useCallback(async () => {
//     const res = await fetch(`/api/search?q=${query}`);
//     const data = await res.json();
//     setResults(data);
//   }, []);

//   useEffect(() => {
//     fetchResults();
//   }, [fetchResults]);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setCount(count + 1);
//     }, 1000);

//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div>
//       <h3>Search results</h3>
//       <div>Updated: {count}</div>
//       {results.map((r, i) => (
//         <div key={i}>{r}</div>
//       ))}
//     </div>
//   );
// };

//исправленный вариант
import { useEffect, useState, type FC } from "react";

interface IProps {
  query: string;
}

const ResultsList: FC<IProps> = ({ query }) => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?q=${query}`, {
          signal: abortController.signal,
        });
        if (!res.ok) {
          setError("Ошибка");
          return;
        }

        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError("Ошибка попытки" + err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();

    return () => {
      abortController.abort();
      setResults([]);
    };
  }, [query]);

  return (
    <ul>
      {isLoading ? (
        <li>loading...</li>
      ) : (
        results.map((r, i) => <li key={i}>{r}</li>)
      )}
      {error && <li>{error}</li>}
    </ul>
  );
};
export const Search: FC<IProps> = ({ query }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => ++prev);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h3>Search results</h3>
      <div>Updated: {count}</div>
      <ResultsList query={query} />
    </div>
  );
};
