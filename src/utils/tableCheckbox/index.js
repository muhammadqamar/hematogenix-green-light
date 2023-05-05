import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';

// import { RowExpand } from '../../../HemeIconLibrary';
import { HemaValue, FormCheckbox } from '../../utils';
import { sortedData } from '../../helpers/sort';


const CheckboxTable = (props) => {
  const { allSites, name, setFieldValue } = props;
  const [filteredData, setfilteredData] = useState()

  useEffect(()=>{
    setfilteredData(allSites)
  },[allSites])

  if (allSites?.length > 0) {
    return (
      <div className="border border-[#ccc] rounded-[5px]">
      <DataTable
        columns={[
          {
            name: <HemaValue text={'Sponsor'} className="font-normal text-[#000000]" />,
            sortable: true,
            sortId:"sponsor.name",
            selector: (row, index) => {
              return (
                <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer check_box">
                  <FormCheckbox
                    onClick={(e) => {
                      if (allSites) {
                        setFieldValue(
                          name,
                          allSites?.map((site, counter) => {
                            if (counter === index) {
                              return {
                                ...site,
                                checked: e.target?.checked,
                              };
                            } else {
                              return site;
                            }
                          }),
                        );
                      }
                    }}
                    checked={row.checked}
                    type="checkbox"
                  />

                  <HemaValue text={row.sponsor?.name} />
                </div>
              );
            },


          },
          {
            name: <HemaValue text={'Study'} className="font-normal text-[#000000]" />,
            sortable: true,
            selector: (row) => <HemaValue text={row?.study?.name} />,
            sortId:"study.name"
          },
          {
            name: <HemaValue text={'Site'} className="font-normal text-[#000000]" />,
            sortable: true,
            selector: (row) => <HemaValue text={row?.name} />,
            sortId:"name"
          },
        ]}
        data={filteredData || []}

        onSort={(row, direction, sorted) => {
          setfilteredData(sortedData(row.sortId, direction, sorted));
        }}

          />
      </div>
    );
  } else {
    return (
      <>
        <br />
        <Skeleton count={4} />
        <br />
        <Skeleton count={4} />
        <br />
        <Skeleton count={4} />
        <br />
      </>
    );
  }
};

export default CheckboxTable;
