import { useState, type ChangeEvent, type FC } from "react";
// import vue from 'vue' // ненужный импорт. использование того, что не нужно в компоненте/ в проекте ( YAGNI )

//пример принципа KISS
interface IKissProps {
  inputValue: string;
  onChangeInputValue: (v: string) => void;
  isNeedAlert: boolean; // бесполезный пропс для обычного инпута со своим состоянием
}

const KissExample: FC<IKissProps> = ({
  inputValue,
  isNeedAlert,
  onChangeInputValue,
}) => {
  //like a custom input
  const [value, setValue] = useState(() => inputValue);
  const handleChangeInputValue = (e: ChangeEvent) => {
    const newValue = e?.target?.value || "";
    setValue(newValue);
    onChangeInputValue(newValue);
    isNeedAlert && window.alert("начат ввод");
  };
  return <input type="text" value={value} onChange={handleChangeInputValue} />;
};

// пример DRY + Бритва О́ккама - не нужно создавать лишнего или усложнять то, что можно сделать проще
//неверно. Нарушается принцип DRY (dont repeat yourself) + Бритва О́ккама
const printAccessMsg = () => console.log("Успешное сообщение");
const printWrongMsg = () => console.log("Неуспешное сообщение");

// верно DRY
const printMsg = (text: string) => console.log(text);

//SOLID - S – Single Responsibility Principle (Принцип единственной ответственности)
//неверно
const checkWindow = () => {
  if (window.innerWidth > 1024) {
    return 1440;
  }
  if (window.innerHeight > 600) {
    return "Высота адекватная";
  }
  return [1024, 600];
};
//не явный результат у функции.
//верно - исправить формат возвращаемых данных под один тип + разделить функцию на 3 подфункции
// 1. проверяет ширину
// 2. проверяет высоту
// 3. сравнивает значения и выводит результат

// SOLID - O — Open-Closed Principle (Принцип открытости-закрытости)
interface IHelperInitProps {
  number: number;
  getSumValue: (num: number) => void;
}
//изначальная реализация
const HelperComponentInit: FC<IHelperInitProps> = ({ getSumValue, number }) => {
  const doubleNumber = number * 2;
  const tripleNumber = number * 3;

  const [sum, setSum] = useState(0);
  const onGetSum = () => {
    const newSum = doubleNumber + tripleNumber;
    setSum(newSum);
    getSumValue(newSum);
  };
  return (
    <section>
      <p>
        {doubleNumber} and {tripleNumber}
      </p>
      <p>{sum}</p>
      <button onClick={onGetSum}>Get sum</button>
    </section>
  );
};
interface IHelperAfterProps {
  // number:string; // нельзя
  number: number;
  getSumValue: (num: number) => void;
  textForNumber: string; // можно
}
const HelperComponentAfter: FC<IHelperAfterProps> = ({
  getSumValue,
  number,
  textForNumber,
}) => {
  const doubleNumber = number * 2;
  const tripleNumber = number * 3;

  const [sum, setSum] = useState(0);
  const onGetSum = () => {
    const newSum = doubleNumber + tripleNumber;
    setSum(newSum);
    getSumValue(newSum);
    //не меняет старую логику, и добавляет новую
    console.log(textForNumber);
  };
  return (
    <section>
      <p>
        {doubleNumber} and {tripleNumber}
      </p>
      <p>{sum}</p>
      <button onClick={onGetSum}>Get sum</button>
    </section>
  );
};
// SOLID - принцип L - Liskov Substitution Principle (Принцип подстановки Барбары Лисков)
class Person1 {
  userName = "John";
  constructor(userName: string) {
    this.userName = userName;
  }
  callUser() {
    console.log(this.userName);
  }
}
class Person2 extends Person1 {
  userMail = "john@mail.com";

  callUserMail() {
    console.log(this.userMail);
  }
}
const B = new Person1("test1");
const C = new Person2("test2");
B.callUser();
C.callUser();
// B и C имеют возможность использовать callUser, хотя образованы от разных классов

// SOLID - принцип I — Interface Segregation Principle(Принцип разделения интерфейсов)

//плохой подход
const getRange = () => {
  let width = 0,
    height = 0;

  if (window.innerWidth > 1024) {
    width = 1440;
  }
  if (window.innerWidth <= 1024) {
    width = 1024;
  }
  console.log("Ширина текущая - " + width);

  if (window.innerHeight > 600) {
    height = 800;
  }
  if (window.innerHeight <= 600) {
    height = 600;
  }
  console.log("Высота текущая - " + height);
  return { width, height };
};

//хороший подход
const alertUser = (msg: string) => console.log(msg);
const checkWidth = (width: number) => (width > 1024 ? 1440 : 1024);
const checkHeight = (height: number) => (height > 600 ? 800 : 600);

const getRangeExm = () => {
  const width = checkWidth(window.innerWidth);
  alertUser("Ширина текущая - " + width);
  const height = checkHeight(window.innerHeight);
  alertUser("Высота текущая - " + height);
  return { width, height };
};

//SOLID - D — Dependency Inversion Principle (Принцип инверсии зависимостей)
// неверный подход. Все объекты созданы для некого поля field с одинаковым названием.
// В случае изменения поля, потребуется замена названия во всех объектах вручную
const a = {
  field: "test",
  msg: "alert",
};
const b = {
  field: "test",
  call: "console",
};
const c = {
  field: "test",
  watch: "promt",
};

// верный подход. Единый источник, который распределяет нужные данные в нужные элементы
const fieldName = "test1";
const fieldObjects = [a, b, c];
const editFields = (newFieldName: string, elems: { field: string }[]) => {
  elems.forEach((obj) => {
    obj.field = newFieldName;
  });
};
editFields(fieldName, fieldObjects);
//

export const PatternExamples = () => {
  //пример APO - преждевременные оптимизации. первоначальная реализация позволяет закрыть задачу
  const accessMsg = "Успешное сообщение";
  const wrongMsg = "Неуспешное сообщение";
  // оптимизацией будет считаться вынос данных переменных за компонент, чтобы они не пересоздавались при каждом ремаунте компонета

  //неверно DRY
  printAccessMsg();
  printWrongMsg();
  //верно DRY
  printMsg(accessMsg);
  printMsg(wrongMsg);
  return (
    <>
      <KissExample
        inputValue=""
        isNeedAlert={true}
        onChangeInputValue={(text) => console.log(text)}
      />
    </>
  );
};
