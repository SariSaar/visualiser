export const sortByAttribute = (data, attr) => {
  const sortArray = [...data];

  const compareFn = (a, b) => {
    const value = (
      !a[attr]) ? 1
      : (!b[attr]) ? -1
      : (a[attr] > b[attr]) ? 1 
      : (b[attr] > a[attr]) ? -1 
      : 0;
    
    return value;
  }
  return sortArray.sort(compareFn)
}

export const filterByAttribute = (data, attr) => {
  const filterArray = [...data];

  return filterArray.filter(item => typeof item[attr] === 'boolean' || !!item[attr])
}