import { useEffect, useLayoutEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { ThemeManager } from "./testComponents/ThemeManager";
import { TestTodoList } from "./testComponents/TestTodoList";
import { traverseObject } from "./tests/traverseObject";

const Test2 = () => {
  console.log("test 6");

  useEffect(() => {
    console.log("test 7 ");
    return () => {
      console.log("test 8");
    };
  }, []);

  useLayoutEffect(() => {
    console.log("test 9");
  }, []);
  useLayoutEffect(() => {
    console.log("test 10");
  }, []);
  return <p>text</p>;
};
const Test1 = (props) => {
  console.log("test 1");

  useEffect(() => {
    console.log("test 2 ");
    return () => {
      console.log("test 3");
    };
  }, []);

  useLayoutEffect(() => {
    console.log("test 4");
  }, []);
  useLayoutEffect(() => {
    console.log("test 5");
  }, []);
  return <>{props?.children}</>;
};

const testObj = {
  l1: "text",
  l1other: {
    l2: {
      l3: "text 3",
    },
    l2other: "text2",
  },
};
// traverseObject(testObj);

function App() {
  const [count, setCount] = useState(0);
  //useLayoutEffect = console + child console
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Test1>
        <Test2 />
      </Test1>
      {/* <TestThemeManager /> */}
      {/* <TestTodoList /> */}
    </>
  );
}

export default App;
