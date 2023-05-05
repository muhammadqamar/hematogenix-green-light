import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { filter } from 'smart-array-filter';

import { FormSearch, HemaValue } from '../../utils';
import { RowExpand, RowCollapsed } from '../../HemeIconLibrary';
import { sortedData } from '../../helpers/sort';

export const ExpendedDataRows = ({ data }) => {
  return (
    <div className=" w-full py-[10px]  border-b border-[#DEE2E6]">
      <DataTable
        customStyles={{
          table: {
            style: { background: 'transparent !important', border: 'none' },
          },
          head: { style: { display: 'none' } },

          rows: {
            style: {
              borderBottom: 'none !important',
              paddingLeft: '50px',
              paddingRight: '100px',
            },
          },
        }}
        data={data.items}
        columns={[
          {
            selector: (row, index) => (
              <HemaValue text={`${index + 1}. ${row?.name}`} />
            ),
          },
          {
            selector: (row) => <HemaValue text={row?.itemPerKit} />,
          },
          {
            selector: (row) => <HemaValue text={row?.availableToBuild} />,
          },
        ]}
      />
    </div>
  );
};
const Hemadatatable = ({ allItems, InventoryColumns, activeTab, type }) => {
  const [filteredData, setfilteredData] = useState([]);
  const [searchQuery, setsearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      if (activeTab) {
        if (searchQuery) {
          const filteredDataResult = filter(allItems, {
            keywords: searchQuery, // search for any field that contains the "Do" string

            caseSensitive: false,
          });
          setfilteredData(filteredDataResult);
        } else {
          setfilteredData(allItems);
        }
      } else {
        setfilteredData(allItems);
      }
    })();
  }, [searchQuery, allItems]);
  return (
    <>
      <FormSearch
        w="w-[400px]"
        searchQuery={searchQuery}
        setsearchQuery={setsearchQuery}
      />
      {allItems ? (
        allItems?.length > 0 ? (
          <DataTable
            expandableIcon={{
              expanded: <RowExpand />,
              collapsed: <RowCollapsed />,
            }}
            data={filteredData}
            columns={[...InventoryColumns]}
            pagination
            expandableRows={type === 'H-Kit' ? true : false}
            expandableRowsComponent={ExpendedDataRows}
            customStyles={{
              responsiveWrapper: {
                style: { overflow: 'visible !important' },
              },
            }}
            // onSort={()=>{
            //   setfilteredData(allItems?.reverse())
            //   console.log(allItems?.reverse())
            // }}
          />
        ) : (
          <BootstrapAlert variant="warning" className="mt-3">
            No results found.
          </BootstrapAlert>
        )
      ) : (
        <>
          <br />
          <Skeleton count={4} />
          <br />
          <Skeleton count={4} />
          <br />
          <Skeleton count={4} />
        </>
      )}
    </>
  );
};
export default Hemadatatable;
