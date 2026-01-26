import { useCallback, useMemo, useState, type FormEvent } from "react";

type TTodoLevel = "low" | "middle" | "high";
interface ITodo {
  id: Date;
  name: string;
  level: TTodoLevel;
  isCompleted: boolean;
}
export const TestTodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortKey, setSortKey] = useState<keyof ITodo>("name");

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todoName = e.target["todo_name"]?.value;
    const todoLevel = e.target["todo_level"]?.value;
    console.log(e.target, todoLevel, "    -   - ", todoName);
    setTodos((prev) => [
      ...prev,
      {
        id: new Date(),
        name: todoName,
        isCompleted: false,
        level: todoLevel,
      },
    ]);
    setIsOpen(false);
    e.target?.reset();
  };

  const onEditTodo = useCallback((id: Date) => {
    setTodos((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            isCompleted: !el.isCompleted,
          };
        }
        return el;
      }),
    );
  }, []);

  const sortedTodos = useMemo(() => {
    return todos.sort((a, b) => {
      if (sortKey !== "isCompleted") {
        return a[sortKey].localeCompare(b[sortKey]);
      }
      return a[setSortKey] - b[sortKey];
    });
  }, [todos, sortKey]);
  return (
    <section>
      <dialog
        open={isOpen}
        style={{
          width: "300px",
          height: "150px",
          backgroundColor: "lightgrey",
          color: "#000",
        }}
      >
        <button
          onClick={handleCloseModal}
          style={{ position: "absolute", right: 10 }}
        >
          Х
        </button>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "200px",
          }}
        >
          <input type="text" name="todo_name" required minLength={4} />
          <select name="todo_level">
            <option value="low">low</option>
            <option value="middle">middle</option>
            <option value="high">high</option>
          </select>
          <button>Create todo</button>
        </form>
      </dialog>
      <button onClick={handleOpenModal}>Add todo</button>
      <div
        style={{
          height: "20px",
          border: "1px solid red",
          display: "flex",
          gap: "4px",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <span>Filter by {}</span>
        <select onChange={(e) => setSortKey(e.target.value as keyof ITodo)}>
          <option value="name">name</option>
          <option value="isCompleted">isCompleted</option>
          <option value="level">level</option>
        </select>
      </div>
      <ul style={{ border: "1px solid red", minHeight: "50px", color: "#fff" }}>
        {sortedTodos.map(({ id, name, isCompleted, level }) => (
          <li
            key={String(id)}
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <span>{name}</span>
            <input
              type="checkbox"
              checked={isCompleted}
              onClick={() => {
                onEditTodo(id);
              }}
              onChange={() => {}}
            />
            <span>{isCompleted ? "Completed" : "In process"}</span>
            <span>{level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
