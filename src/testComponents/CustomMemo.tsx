import { useRef, type ComponentType, type FC } from "react";

const customShallowEqual = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prev: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: any,
) => {
  console.log(prev, "prevs");
  console.log(next, "nexts");
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  let matching = true;

  if (prevKeys.length !== nextKeys.length) {
    matching = false;
  }

  for (const key in prev) {
    // console.log(JSON.stringify(key), " current key");
    if (next?.[key as keyof typeof next] !== prev[key as keyof typeof prev]) {
      if (
        Number.isNaN(next[key as keyof typeof next]) &&
        Number.isNaN(prev[key as keyof typeof prev])
      ) {
        continue;
      }
      matching = false;
    }
  }
  console.log(matching, " match result");
  return matching;
};
function customMemo<T>(
  Comp: ComponentType<T>,
  shallowEqual: (
    prevProps: keyof T,
    nextProps: keyof T,
  ) => boolean = customShallowEqual,
) {
  return function useMemoCheck(props: T) {
    const prevPropsRef = useRef<T | null>(null);
    const prevRenderedRef = useRef<React.ReactNode>(null);

    if (
      prevPropsRef.current !== null &&
      shallowEqual(prevPropsRef.current, props)
    ) {
      return prevRenderedRef.current;
    }

    const rendered = <Comp {...props} />;

    prevPropsRef.current = props;
    prevRenderedRef.current = rendered;

    return rendered;
  };
}
interface ICustomProps {
  test: string;
  test2: number;
  test3: number;
}
const Component: FC<ICustomProps> = ({ test, test2, test3 }) => {
  console.log("render custom comp");
  return (
    <section>
      <h1>Component head</h1>

      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li>list item 3</li>
        <li>list item 4</li>
        <li>{test}</li>
        <li>{test2}</li>
        <li>{test3}</li>
      </ul>

      <div>Component footer</div>
    </section>
  );
};

export const CustomComp: FC<ICustomProps> = customMemo(
  Component,
  customShallowEqual,
);
