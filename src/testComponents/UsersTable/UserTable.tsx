import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FC,
} from "react";
import styles from "./usersTable..module.css";

// type TSortCondition = "ABC" | "CBA";
type TListItemKeys = "id" | "name" | "email" | "role";
type TListItem = Record<TListItemKeys, string>;
enum SortABC {
  ABC = "ABC",
  CBA = "CBA",
}
const useDebounce = (val: string, ms: number) => {
  const [current, setCurrent] = useState(() => val);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setCurrent(val);
      setIsLoading(false);
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  }, [val, ms]);
  return { current, isLoading };
};

const useSortedList = (
  itemKey: TListItemKeys,
  sortCondition: SortABC,
  list: TListItem[],
) => {
  return useMemo(() => {
    return [...list].sort((a, b) => {
      const firstElem = a[itemKey];
      const secondElem = b[itemKey];
      const [first, second] =
        sortCondition === SortABC.ABC
          ? [firstElem, secondElem]
          : [secondElem, firstElem];
      return first.localeCompare(second);
    });
  }, [list, sortCondition, itemKey]);
};

// /**
//  * @param obj объект/список, который мы сортируем,
//  * @param objKey - выбранный столбец по которому сортируется,
//  * @param sortCondition - вид сортировки от меньшего к большему/ от большего к меньшему
//  * @returns script version
//  */

{
  /* export const useSortedObj = <T>({
  obj: T[],
  objKey: keyof T,
  sortCondition: SortABC,}
) => {
  return useMemo(() => {
    if (obj && objKey) {
      return [...obj].sort((a, b) => {
        const [first, second] = sortCondition === SortABC.ABC ? [a, b] : [b, a];
        // return checkColumnBySort<T>(objKey, first, second);
        return first.localeCompare(second);
      });
    }
    return obj;
  }, [obj, objKey, sortCondition]);
} */
}

const list: TListItem[] = [
  {
    id: "nan",
    name: "jim",
    email: "test@mail.ru",
    role: "seller",
  },
  {
    id: "non",
    name: "bim",
    email: "test2@mail.ru",
    role: "client",
  },
  {
    id: "nen",
    name: "Den",
    email: "mem2@mail.ru",
    role: "boss",
  },
];

const ItemField = memo(
  ({
    value,
    onChangeValue,
    itemKey,
  }: {
    value: string;
    onChangeValue: (v: string, key: TListItemKeys) => void;
    itemKey: TListItemKeys;
  }) => {
    const [currentValue, setCurrentValue] = useState(() => value);
    const debouncedValue = useDebounce(currentValue, 500).current;

    // console.log("render item filed");
    useEffect(() => {
      onChangeValue(debouncedValue, itemKey);
    }, [debouncedValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);
    };
    return (
      <input
        type="text"
        placeholder={itemKey}
        value={currentValue}
        onChange={handleChange}
      />
    );
  },
);
interface IPropsItem {
  item: TListItem;
  handleChangeItem: (
    itemId: string,
    itemKey: TListItemKeys,
    newValue: string,
  ) => void;
}
const ListItem: FC<IPropsItem> = ({ item, handleChangeItem }) => {
  const { id, name, email, role } = item;
  const onChangeName = useCallback(
    (v: string, key: TListItemKeys) => {
      handleChangeItem(id, key, v);
    },
    [id],
  );
  // console.log("render list item", id);
  return (
    <li
      style={{
        display: "flex",
        gap: "10px",
        flexBasis: 0,
        flexGrow: 1,
      }}
    >
      <div>{id}</div>
      <ItemField
        value={name}
        key={id + name}
        onChangeValue={onChangeName}
        itemKey={"name"}
      />
      <ItemField
        value={email}
        key={id + email}
        onChangeValue={onChangeName}
        itemKey={"email"}
      />
      <ItemField
        value={role}
        key={id + role}
        onChangeValue={onChangeName}
        itemKey={"role"}
      />
    </li>
  );
};
export const UsersTable = () => {
  const [sortCondition, setSortCondition] = useState(() => SortABC.ABC);
  const [currentSortKey, setCurrentSortKey] = useState<TListItemKeys>("id");
  const [initialList, setInitialList] = useState(() => list);
  const sortedList = useSortedList(currentSortKey, sortCondition, initialList);

  // console.log("render table");
  const onChangeSortCondition = () => {
    setSortCondition((prev) => {
      if (prev === SortABC.ABC) {
        return SortABC.CBA;
      }
      return SortABC.ABC;
    });
  };

  const onChangeSortkey = (key: TListItemKeys) => {
    setCurrentSortKey(key);
    onChangeSortCondition();
  };

  const onEditListItem = useCallback(
    (itemId: string, itemKey: TListItemKeys, newValue: string) => {
      const newList = initialList.map((el) => {
        if (el.id === itemId) {
          return {
            ...el,
            [itemKey]: newValue,
          };
        }
        return el;
      });
      setInitialList(newList);
    },
    [initialList],
  );

  return (
    <section>
      <h2>Users</h2>
      <div>
        <h3
          style={{
            textAlign: "center",
          }}
        >
          Filters {SortABC.ABC === sortCondition ? "Up" : "Down"}
        </h3>
        <ul className={styles.filters}>
          <li onClick={() => onChangeSortkey("id")}>id</li>
          <li onClick={() => onChangeSortkey("name")}>name</li>
          <li onClick={() => onChangeSortkey("email")}>email</li>
          <li onClick={() => onChangeSortkey("role")}>role</li>
        </ul>
      </div>
      <ul className={styles.userList}>
        {sortedList.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            handleChangeItem={onEditListItem}
          />
        ))}
      </ul>
    </section>
  );
};
