export const traverseObject = (obj: Object) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(`Key is ${key} and value: ${obj[key]}`);
      if (typeof obj[key] === "object" && obj[key] !== null) {
        traverseObject(obj[key]);
      }
    }
  }
};
