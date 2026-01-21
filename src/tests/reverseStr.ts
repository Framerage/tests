// Реализуй функцию, которая переворачивает строку задом наперёд.
const reverseString = (str: string) => {
  //1 var
  // return str.split('').reverse().join()

  //2var
  let resStr = "";
  str.split("").forEach((char) => (resStr += char));
  return resStr;
};
