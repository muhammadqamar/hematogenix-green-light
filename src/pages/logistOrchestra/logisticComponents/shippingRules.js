import React from 'react';

import DataTable from 'react-data-table-component';

import { FormCheckbox, FormSelect, HemaLabel } from '../../../utils';
import { setSelectedRule } from '../../../Store/reducers/logistic';
import { useDispatch } from 'react-redux';
const ShippingRules = ({ curiors, shipping, setFieldValue, values, name, readOnly, assigner }) => {
  console.log(shipping);
  const dispatch = useDispatch();
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
    responsiveWrapper: {
      style: { overflow: 'visible !important' },
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
    <div className="border-[1px]  border-solid border-[#DEE2E6] shipping_table">
      <DataTable
        customStyles={customStyles}
        data={shipping || []}
        columns={[
          {
            name: 'Shipping Condition',
            selector: (row, index) => {
              return (
                <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer check_box">
                  {/* <FormCheckbox
                    onClick={(e) => {
                      if (!readOnly && !assigner) {
                        setFieldValue(
                          name,
                          values?.shippingRules?.map((ship, counter) => {
                            if (counter === index) {
                              return { ...ship, checked: e.target?.checked };
                            } else {
                              return ship;
                            }
                          }),
                        );
                      } else {
                        shipping?.map((ship, counter) => {
                          if (counter === index) {
                            dispatch(setSelectedRule({ ...ship, checked: e.target?.checked }));
                            return { ...ship, checked: e.target?.checked };
                          } else {
                            return ship;
                          }
                        });
                      }
                    }}
                    checked={readOnly ? (assigner ? shipping?.[index]?.checked : false) : values?.shippingRules[index]?.checked}
                    type="checkbox"
                  /> */}

                  {row.name || row?.shippingCondition?.name || row?.shippingConditionId?.name}
                </div>
              );
            },
          },
          {
            name: 'Outbound Courier',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer check_box">
                  {readOnly ? (
                    <HemaLabel text={row?.outBoundCourier?.name || row?.outBoundCourierId?.name || 'N/A'} />
                  ) : (
                    <FormSelect
                      options={curiors}
                      placeholder={row?.outBoundCourier?.name || row?.outBoundCourierId?.name || 'N/A'}
                      setFieldValue={(nameNull, id) => {
                        console.log(id);
                        setFieldValue(
                          name,
                          values.shippingRules?.map((ship, counter) => {
                            if (counter === index) {
                              return { ...ship, outBoundCourierId: id };
                            } else {
                              return ship;
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
          {
            name: 'Inbound Courier',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer check_box">
                  {readOnly ? (
                    <HemaLabel text={row?.inBoundCourier?.name || row?.inBoundCourierId?.name || 'N/A'} />
                  ) : (
                    <FormSelect
                      options={curiors}
                      placeholder={row?.inBoundCourier?.name || row?.inBoundCourierId?.name || 'N/A'}
                      setFieldValue={(nameNull, id) => {
                        setFieldValue(
                          name,
                          values.shippingRules?.map((ship, counter) => {
                            if (counter === index) {
                              return { ...ship, inBoundCourierId: id };
                            } else {
                              return ship;
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
