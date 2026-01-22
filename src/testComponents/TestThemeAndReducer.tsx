import { useEffect, useReducer } from "react";
import cn from "classnames";
import styles from "./testThemes.module.css";

type Theme = "light" | "dark";
type FontSize = "sm" | "md" | "lg";
type Contast = "low" | "middle" | "high";

type State = {
  theme: Theme;
  fontSize: FontSize;
  contrast: Contast;
};

type Action =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_FONT"; payload: FontSize }
  | { type: "TOGGLE_CONTRAST"; payload: Contast };

const STORAGE_KEY = "app_theme";

const initialState: State = {
  theme: "light",
  fontSize: "md",
  contrast: "middle",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "SET_FONT":
      return { ...state, fontSize: action.payload };
    case "TOGGLE_CONTRAST":
      return { ...state, contrast: action.payload };
    default:
      return state;
  }
}

export const TestThemeManager = () => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <div
      className={cn(
        styles.theme_container,
        styles[`theme-${state.theme}`],
        styles[`font-${state.fontSize}`],
        styles[`high_contrast_${state.contrast}`],
      )}
    >
      <p>Тема </p>

      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        {state.theme}
      </button>
      <p>Шрифт</p>
      <select
        value={state.fontSize}
        onChange={(e) =>
          dispatch({ type: "SET_FONT", payload: e.target.value as FontSize })
        }
      >
        <option value="sm">Маленький</option>
        <option value="md">Средний</option>
        <option value="lg">Большой</option>
      </select>
      <p>Контраст</p>

      <select
        value={state.contrast}
        onChange={(e) =>
          dispatch({
            type: "TOGGLE_CONTRAST",
            payload: e.target.value as Contast,
          })
        }
      >
        <option value="low">Слабо</option>
        <option value="middle">Средне</option>
        <option value="high">Сильно</option>
      </select>
    </div>
  );
};
