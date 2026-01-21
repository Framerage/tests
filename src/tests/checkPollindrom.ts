// Реализуй функцию, которая проверяет, является ли строка палиндромом.
const isPolindrom = (str: string) => {
  //1 var
  // return str===str.split('').reverse().join('')

  //2 var
  let checkStr = "";
  for (let i = str.length; i > 0; i--) {
    checkStr += str[i];
  }
  return checkStr === str;
};
