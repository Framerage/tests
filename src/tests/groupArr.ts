// Напиши функцию, которая группирует массив объектов по значению указанного ключа.
const groupArr = <T>(arr: T[], key: keyof T) => {
  const resultGroups = {};

  arr.forEach((el) => {
    const keyGroupValue = el[key];
    if (
      Object.prototype.hasOwnProperty.call(
        resultGroups,
        keyGroupValue as string
      )
    ) {
      resultGroups[keyGroupValue as string].push(el);
    } else {
      resultGroups[keyGroupValue] = [el];
    }
  });
  return resultGroups;
};
