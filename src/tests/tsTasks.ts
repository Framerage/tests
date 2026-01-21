// В TypeScript: реализуй утилиту DeepReadonly<T>, делающую все поля рекурсивно readonly.
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// В TypeScript: реализуй тип, который из строки "/user/:id/post/:postId" извлекает тип { id: string; postId: string }.
type Url = "/user/:id/post/:postId";

const createNewType = (str: string) => {
  const NeededKeys = str
    .split("/")
    .filter((el) => el.includes(":"))
    .map((el) => el.replace(":", ""));
  type ResultStr = (typeof NeededKeys)[number];
  type Result = Record<ResultStr, string>;
};
export const testGeneric = <T>(arg: T): T => {
  return arg;
};
