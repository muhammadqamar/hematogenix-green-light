import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CreateAction } from '../../HemeIconLibrary';
import { HemaValue, FormCheckbox } from '..';
import { sortedData } from '../../helpers/sort';
import { Button } from '../../utils';
const KitpreparationTable = (props) => {
  const { allSites, name, setFieldValue } = props;
  const [filteredData, setfilteredData] = useState();

  useEffect(() => {
    setfilteredData(allSites);
  }, [allSites]);

  return (
    <div className="border border-[#ccc] rounded-[5px]">
      <DataTable
        columns={[
          {
            name: <HemaValue text={'Item Name'} className="font-normal text-[#000000]" />,
            sortable: true,
            sortId: 'sponsor.name',
            selector: (row, index) => {
              return (
                <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer check_box">
                  <HemaValue text={row.item?.name} />
                </div>
              );
            },
          },
          {
            name: <HemaValue text={'Quantity'} className="font-normal text-[#000000]" />,
            sortable: true,
            selector: (row) => <HemaValue text={row?.quantity} />,
            sortId: 'name',
          },
          {
            name: <HemaValue text={'Status'} className="font-normal text-[#000000]" />,
            sortable: true,
            selector: (row) => <HemaValue text={row?.status?.name} />,
            sortId: 'name',
          },
          {
            name: 'Actions',
            cell: (row) => {
              return (
                <div className="flex-grow four">
                  <div className="flex justify-end gap-[5px] meta">
                    <Button Icon={<CreateAction />} color="text-white" bg="bg-bgActionDots" cta={() => {}} />
                  </div>
                </div>
              );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ]}
        data={filteredData || []}
        // onSort={(row, direction, sorted) => {
        //   setfilteredData(sortedData(row.sortId, direction, sorted));
        // }}
      />
    </div>
  );
};

export default KitpreparationTable;
