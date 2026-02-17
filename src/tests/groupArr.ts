// Напиши функцию, которая группирует массив объектов по значению указанного ключа.
const groupArr = <T>(arr: T[], key: keyof T) => {
  const resultGroups = {};

  arr.forEach((el) => {
    const keyGroupValue = el[key];
    if (
      Object.prototype.hasOwnProperty.call(
        resultGroups,
        keyGroupValue as string,
      )
    ) {
      resultGroups[keyGroupValue as string].push(el);
    } else {
      resultGroups[keyGroupValue] = [el];
    }
  });
  return resultGroups;
};
// const cars = [
//   { brand: "Lada", model: "2110" },
//   { brand: "Lada", model: "Нива" },
//   { brand: "Mazda", model: "RX8" },
//   { brand: "BMW", model: "M3" },
// ];
// const result = {
//   Lada: [{ model: "2110" }, { model: "Нива" }],
//   Mazda: [{ model: "RX8" }],
//   BMW: [{ model: "M3" }],
// };
