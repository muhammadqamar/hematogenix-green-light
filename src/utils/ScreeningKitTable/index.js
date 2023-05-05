import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';
import { Tab, Tabs } from 'react-bootstrap';
// import { RowExpand } from '../../../HemeIconLibrary';
import { HemaValue, FormCheckbox } from '../../utils';
import { sortedData } from '../../helpers/sort';

const ScreeningKitTable = (props) => {
  const { allItems, name, setFieldValue } = props;
  const [filteredData, setfilteredData] = useState();

  useEffect(() => {
    setfilteredData(allItems);
  }, [allItems]);
  console.log('filteredData', filteredData);
  return (
    <div className={`${'inventory-tabs'}  ${'action-inventory-tabs'}`}>
      <Tabs
        defaultActiveKey="Ready"
        id="uncontrolled-tab-example"
        className=" mb-4 border-0 border-b border-[#F2F2F2]"
        // onSelect={(key) => {
        //   setactiveTab(key);
        // }}
      >
        <Tab eventKey="Ready" title={<div className="flex items-center title-icon gap-[7px]">Ready</div>}>
          <div className="border border-[#ccc] rounded-[5px]">
            <DataTable
              columns={[
                {
                  name: <HemaValue text={'Item Name'} className="font-normal text-[#000000] text-xs leading-[18px]" />,
                  sortable: true,
                  sortId: 'item.name',
                  selector: (row, index) => {
                    return (
                      <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer check_box">
                        <FormCheckbox
                          onClick={(e) => {
                            if (allItems) {
                              setFieldValue(
                                name,
                                allItems?.map((item, counter) => {
                                  if (counter === index) {
                                    return {
                                      ...item,
                                      checked: e.target?.checked,
                                    };
                                  } else {
                                    return item;
                                  }
                                }),
                              );
                            }
                          }}
                          checked={row.checked}
                          type="radio"
                          disabled={allItems?.filter((item) => item.checked)?.length === 1 ? true : false}
                          className="action_checkbox"
                        />

                        <HemaValue text={row?.item?.name} className="font-medium text-xs leading-[18px]" />
                      </div>
                    );
                  },
                },
                {
                  name: <HemaValue text={'Location '} className="font-normal text-[#000000] text-xs leading-[18px]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.location?.name} />,
                  sortId: 'location.name',
                },
                {
                  name: <HemaValue text={'Lot Number'} className="font-normal text-[#000000] text-xs leading-[18px]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.lotNumber} />,
                  sortId: 'lotNumber',
                },
                {
                  name: <HemaValue text={'Expiration Date'} className="font-normal text-[#000000] text-xs leading-[18px]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.expirationDate} />,
                  sortId: 'expirationDate',
                },
                {
                  name: <HemaValue text={'Amount'} className="font-normal text-[#000000] text-xs leading-[18px]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.quantity} />,
                  sortId: 'quantity',
                },
              ]}
              data={filteredData || []}
              // onSort={(row, direction, sorted) => {
              //   setfilteredData(sortedData(row.sortId, direction, sorted));
              // }}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ScreeningKitTable;
