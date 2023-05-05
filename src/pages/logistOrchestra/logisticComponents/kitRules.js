import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { FormSelect, HemaLabel, FormText } from '../../../utils';

const ShippingRules = ({ shipping, setFieldValue, values, name, readOnly }) => {
  console.log('values', values);
  useEffect(() => {
    if (values) {
      setFieldValue(
        name,
        values.itemId?.map((kit) => {
          return { ...kit, alias: kit.name };
        }),
      );
    }
  }, []);
  const customStyles = {
    headCells: {
      style: {
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        color: '#000000',

        // minHeight: '40px !important',
      },
    },
    cells: {
      style: {
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '18px',
        color: '#595959',
      },
    },
  };

  return (
    <div className="border-[1px]  border-solid border-[#DEE2E6] shipping_table kit_details_table">
      <DataTable
        customStyles={customStyles}
        data={values.itemId || []}
        columns={[
          {
            name: 'Kit Template',
            selector: (row, index) => {
              return <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer">{row.name || row?.shippingCondition?.name}</div>;
            },
          },
          {
            name: 'Kit Template Alias',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer">
                  <FormText
                    type="text"
                    placeholder="Enter Alias Name"
                    initalValue={row.alias}
                    className="w-full"
                    value={row.alias}
                    onChange={(e) => {
                      setFieldValue(
                        name,
                        values.itemId?.map((kit) => {
                          if (kit.id === row.id) {
                            return { ...kit, alias: e.target.value };
                          } else {
                            return kit;
                          }
                        }),
                      );
                    }}
                  />
                </div>
              );
            },
          },
          {
            name: 'Outbound Condition',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer check_box">
                  {readOnly ? (
                    <HemaLabel text={row?.outBoundCourier?.name} />
                  ) : (
                    <FormSelect
                      options={shipping}
                      placeholder="N/A"
                      setFieldValue={(nameNull, id) => {
                        setFieldValue(
                          name,
                          values.itemId?.map((kit) => {
                            if (kit.id === row.id) {
                              return { ...kit, outboundShippingConditionId: id };
                            } else {
                              return kit;
                            }
                          }),
                        );
                      }}
                    />
                  )}
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default ShippingRules;
