
  export const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  export function removeByKey (myObj, deleteKey) {
    return Object.keys(myObj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = myObj[current];
        return result;
    }, {});
  }

  export function numberOfKeys(object) {
    return Object.values(object).length
  }