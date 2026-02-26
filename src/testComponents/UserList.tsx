// // изначальная версия
// import React, { useEffect, useState } from "react";

// type User = {
//   id: number;
//   name: string;
// };

// export const UsersList = ({ search }: { search: string }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [filtered, setFiltered] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);

//     fetch("https://api.example.com/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     setFiltered(
//       users.filter((u) =>
//         u.name.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//   }, [search]);

//   return (
//     <div>
//       {loading && <div>Loading...</div>}

//       {filtered.map((user, index) => (
//         <div key={index}>{user.name}</div>
//       ))}
//     </div>
//   );
// };
// изначальная версия

// исправленная версия
import { useEffect, useMemo, useState } from "react"; //1

interface IUser {
  //2
  id: number;
  name: string;
}

export const UsersList = ({ search }: { search: string }) => {
  const [users, setUsers] = useState<IUser[]>([]); // 3
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const abortController = new AbortController();
    fetch("https://api.example.com/users", { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw setError("Ошибка получения данных");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => setError(err)) //4
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);

  const filteredUsers = useMemo(() => {
    //5
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, users]);

  if (loading) {
    return <div>Loading...</div>; //6
  }
  if (error) {
    return <div>{error}</div>; //7
  }
  return (
    <ul>
      //8
      {filteredUsers.map(
        (
          user, //9
        ) => (
          <li key={user.id}>{user.name}</li>
        ),
      )}
    </ul>
  );
};
// исправленная версия
