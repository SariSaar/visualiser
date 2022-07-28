export const sortByAttribute = (data, attr) => {
  const sortArray = [...data];

  const compareFn = (a, b) => {
    const attrA = parseAttribute(a, attr);
    const attrB = parseAttribute(b, attr)

    const value = (
      !attrA) ? 1
      : (!attrB) ? -1
      : (attrA > attrB) ? 1 
      : (attrB > attrA) ? -1 
      : 0;
    
    return value;
  }
  return sortArray.sort(compareFn)
}

export const filterByAttribute = (data, attr) => {
  const filterArray = [...data];

  return filterArray.filter(item => !!parseAttribute(item, attr))
}

function parseAttribute(obj, attr) {
  return Array.isArray(obj[attr]) ? obj[attr][0] : obj[attr];
}
