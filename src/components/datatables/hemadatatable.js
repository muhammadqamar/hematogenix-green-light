import React, { useEffect, useState, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";

const Hemadatatable = ({ style, data, columns }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("data", data);
  useEffect(() => {
    console.log("state", selectedRows);
  }, [selectedRows]);

  const handleButtonClick = () => {
    console.log("clicked");
  };
  // const customSort = (rows, selector, direction) => {
  //   return orderBy(rows, selector, direction);
  // };
  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      fil
      pagination
      style={style}
   />
  );
};
export default Hemadatatable;
