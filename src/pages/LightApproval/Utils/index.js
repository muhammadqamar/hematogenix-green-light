export const getFullName = (row) => {
  let name = [];
  if (row?.firstName) {
    name.push(row.firstName);
  }
  if (row?.lastName) {
    name.push(row.lastName);
  }
  return name.join(" ");
};
