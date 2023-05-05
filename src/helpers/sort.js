export const sortedData = (key, direction, data) => {
  const sortableData = [...data];
  if (key !== null) {
    sortableData.sort((a, b) => {
      if (key?.split('.').length) {
        try {
          var value1 = key.split('.').reduce((a1, b1) => a1[b1], a);
          var value2 = key.split('.').reduce((a1, b1) => a1[b1], b);
          if (value1 < value2) {
            return direction === 'asc' ? -1 : 1;
          }
          if (value1 > value2) {
            return direction === 'asc' ? 1 : -1;
          }
        } catch (e) {}
      } else {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
      }

      return 0;
    });
  }

  return sortableData;
};

//  export  const requestSort = (sortConfig, key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//    // setSortConfig({ key, direction });
//   };
