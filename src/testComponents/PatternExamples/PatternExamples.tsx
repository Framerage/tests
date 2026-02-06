import { useState, type ChangeEvent, type FC } from "react";

interface IYagniProps {
  inputValue: string;
  onChangeInputValue: (v: string) => void;
  isNeedAlert: boolean; // бесполезный пропс для обычного инпута со своим состоянием
}
const YagniExample: FC<IYagniProps> = ({
  inputValue,
  isNeedAlert,
  onChangeInputValue,
}) => {
  //like a custom input
  const [value, setValue] = useState("");
  const handleChangeInputValue = (e: ChangeEvent) => {
    const newValue = e?.target?.value || "";
    setValue(newValue);
    onChangeInputValue(newValue);
    isNeedAlert && window.alert("начат ввод");
  };
  return <input type="text" value={value} onChange={handleChangeInputValue} />;
};

export const PatternExamples = () => {
  return (
    <>
      <YagniExample
        inputValue=""
        isNeedAlert={true}
        onChangeInputValue={(text) => console.log(text)}
      />
    </>
  );
};
