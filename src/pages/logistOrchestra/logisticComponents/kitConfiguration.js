import React from 'react';

import DataTable from 'react-data-table-component';

import { RowExpand, RowCollapsed, DeleteInventory, ActionCopy, AddInventory, DeleteKit, DustBin, Apply, ChangeReason } from '../../../HemeIconLibrary';
import { HemaValue, FormCheckbox } from '../../../utils';
import { addAssembly } from '../../../components/Formik/AllForms/addAssembly';
import { setSelectedKitToAssign } from '../../../Store/reducers/logistic';

export const ExpendedDataRows = ({
  data,
  addAssemblyAction,
  setformName,
  setFormIcon,
  dispatch,
  setForm,
  editFormReducer,
  setUpdatedData,
  createAssemblyCTA,
  common,
  setAllItemsInTemplate,
  getKitTemplateAssemblyCopyAction,
  deleteKitAssemblyConfig,
  assigner,
  level,
  setFieldValue,
  readOnly,
  values,
  logistic,
  allKits,
}) => {
  return (
    <div className=" w-full py-[10px]  border-b border-[#DEE2E6]">
      <DataTable
        customStyles={{
          table: {
            style: { background: 'transparent !important', border: 'none' },
          },
          head: { style: { display: 'none' } },
          cells: {
            style: {},
          },
          rows: {
            style: {
              borderBottom: 'none !important',
              paddingLeft: '50px',
              paddingRight: '100px',
            },
          },
        }}
        data={data?.assemblies || []}
        columns={[
          {
            // selector: (row, index) => (
            //   <div>
            //     <HemaValue text={row.assembly?.name} />

            //   </div>
            // ),
            // selector: (row, index) => <HemaValue text={row.assembly?.name} />,
            selector: (row, index) => {
              return (
                <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer check_box">
                  {logistic.selectedProtocolDetail?.qc?.status.id !== 2 && level !== 'site' && (
                    <FormCheckbox
                      onClick={(e) => {
                        if (!assigner && !readOnly) {
                          setFieldValue(
                            row.name,
                            values.shippingRules?.map((ship, counter) => {
                              if (counter === index) {
                                return { ...ship, checked: e.target?.checked };
                              } else {
                                return ship;
                              }
                            }),
                          );
                        } else {
                          const kitdata = {
                            ...data,
                            // checked: data.assemblies?.find((f) => f.checked === false) ? false : true,
                            assemblies: data.assemblies?.map((ass, key) => {
                              if (index === key) {
                                return { ...ass, checked: e.target?.checked };
                              } else {
                                return ass;
                              }
                            }),
                          };
                          dispatch(setSelectedKitToAssign({ data: kitdata, type: level }));
                        }
                      }}
                      checked={readOnly ? false : row?.checked}
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                    />
                  )}

                  <HemaValue text={row.assembly?.name} />
                </div>
              );
            },
          },
          {
            selector: (row) => <HemaValue text={row.testingLab?.name} />,
          },
          {
            selector: (row) => <HemaValue text={row.tab} />,
          },
          {
            selector: () => '',
          },
          {
            selector: (row) => <HemaValue text={row.inboundShippingCondition?.name} />,
          },
          {
            style: {},
            selector: (row) =>
              level === 'study' &&
              logistic.selectedProtocolDetail?.qc?.status.id !== 2 && (
                <div className="flex items-center gap-1 pl-[35px]">
                  <div
                    className="cursor-pointer"
                    onClick={async () => {
                      const assemblyDetail = await getKitTemplateAssemblyCopyAction(row.id);
                      if (assemblyDetail.status === 200) {
                        dispatch(editFormReducer(row));

                        setformName('Copy Assembly ');
                        setFormIcon(<Apply />);

                        addAssembly[0].initialValue = assemblyDetail.data?.assemblies[0]?.assembly?.name + ' Copy';
                        addAssembly[1].options = common.allAssemblyTypes;
                        addAssembly[2].options = common.allTestingLabs;
                        addAssembly[3].options = common.allShipping;
                        addAssembly[1].initialValue = '1';
                        addAssembly[1].placeholder = 'Return Kit Assembly';
                        addAssembly[1].disabled = true;
                        addAssembly[2].initialValue = assemblyDetail.data?.assemblies[0].testingLab?.id;
                        addAssembly[2].placeholder = assemblyDetail.data?.assemblies[0].testingLab?.name;
                        addAssembly[3].initialValue = assemblyDetail.data?.assemblies[0]?.inboundShippingCondition?.id;
                        addAssembly[3].placeholder = assemblyDetail.data?.assemblies[0]?.inboundShippingCondition?.name;
                        setAllItemsInTemplate(assemblyDetail.data?.assemblies[0]?.items);
                        if (logistic.selectedProtocolDetail?.qc?.status?.id === 3) {
                          setUpdatedData([
                            ...addAssembly,
                            {
                              name: 'change_reason',
                              label: 'Change Reason',
                              Icon: <ChangeReason />,
                              type: 'textarea',
                              initialValue: '',
                              fluid: true,
                              required: true,
                            },
                          ]);
                        } else {
                          setUpdatedData(addAssembly);
                        }
                        dispatch(
                          setForm({
                            state: true,
                            type: 'create-assembly',
                          }),
                        );
                        createAssemblyCTA(assemblyDetail.data?.assemblies[0]?.items, data);
                      }
                    }}
                  >
                    <ActionCopy />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (logistic.selectedProtocolDetail?.qc?.status?.id === 3) {
                        setUpdatedData([
                          {
                            name: 'kitId',
                            initialValue: row?.id,
                            fluid: true,
                            label: 'Are you sure you want to delete this item? This process cannot be undone and will affect all regions, countries, and sites under this study.',
                          },
                          {
                            name: 'change_reason',
                            label: 'Change Reason',
                            Icon: <ChangeReason />,
                            type: 'textarea',
                            initialValue: '',
                            fluid: true,
                            required: true,
                          },
                        ]);
                      } else {
                        setUpdatedData([
                          {
                            name: 'kitId',
                            initialValue: row?.id,
                            fluid: true,
                            label: 'Are you sure you want to delete this item? This process cannot be undone and will affect all regions, countries, and sites under this study.',
                          },
                        ]);
                      }
                      setFormIcon(<DeleteKit />);
                      setformName('Delete Assembly');

                      dispatch(
                        setForm({
                          state: true,
                          type: 'delete-kit-config',
                        }),
                      );
                      deleteKitAssemblyConfig(data);
                    }}
                  >
                    <DeleteInventory width="18" height="18" />
                  </div>
                </div>
              ),
          },
        ]}
      />
      {addAssemblyAction?.length > 0 && <div className="pl-[63px]">{addAssemblyAction(data)}</div>}
    </div>
  );
};

const KitConfiguration = ({
  allKits,
  setFieldValue,
  values,
  name,
  readOnly,
  type,
  addAssemblyAction,
  setformName,
  setFormIcon,
  dispatch,
  setForm,
  editFormReducer,
  setUpdatedData,
  createAssemblyCTA,
  common,
  setAllItemsInTemplate,
  getKitTemplateAssemblyCopyAction,
  deleteKitConfig,
  deleteKitAssemblyConfig,
  assigner,
  logistic,
  level,
}) => {
  return (
    <DataTable
      expandableIcon={{
        expanded: <RowExpand />,
        collapsed: <RowCollapsed />,
      }}
      columns={[
        {
          name: <HemaValue text={'Name'} className="font-normal text-[#000000]" />,
          sortable: true,
          selector: (row) => (
            <div>
              <HemaValue text={row.alias} />
            </div>
          ),
          // selector: (row) => <HemaValue text={row.alias} />,
          selector: (row, index) => {
            return (
              <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer check_box">
                {logistic?.selectedProtocolDetail?.qc?.status.id !== 2 && level !== 'site' && (
                  <FormCheckbox
                    onClick={(e) => {
                      if (!readOnly && !assigner) {
                        setFieldValue(
                          name,
                          values.shippingRules?.map((ship, counter) => {
                            if (counter === index) {
                              return { ...ship, checked: e.target?.checked };
                            } else {
                              return ship;
                            }
                          }),
                        );
                      } else {
                        allKits?.logisticBuilderKits?.map((kit, counter) => {
                          if (counter === index) {
                            const kitdata = {
                              ...kit,
                              checked: e.target?.checked,
                              assemblies: kit.assemblies?.map((ass) => {
                                return { ...ass, checked: e.target?.checked };
                              }),
                            };
                            dispatch(setSelectedKitToAssign({ data: kitdata, type: level }));
                            return kitdata;
                          } else {
                            return kit;
                          }
                        });
                      }
                    }}
                    checked={readOnly ? false : values?.shippingRules[index]?.checked}
                    type="checkbox"
                    className="w-[20px] h-[20px]"
                  />
                )}
                <HemaValue text={row.alias} />
              </div>
            );
          },
        },
        {
          name: <HemaValue text={'Testing Lab'} className="font-normal text-[#000000]" />,
        },
        {
          name: <HemaValue text={'Outbound Condition'} className="font-normal text-[#000000]" />,
          sortable: true,
          selector: (row) => <HemaValue text={row?.outboundShippingCondition?.name} />,
        },
        {
          name: <HemaValue text={'Inbound Condition(s)'} className="font-normal text-[#000000]" />,
          sortable: true,
        },
        {
          name: <HemaValue text={type !== 'add-region' && 'Actions'} className="font-normal text-[#000000]" />,
          sortable: true,
          selector: (row) =>
            type !== 'add-region' && (
              <div className="flex items-center">
                {level === 'study' && logistic.selectedProtocolDetail?.qc?.status.id !== 2 && (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setUpdatedData([
                        {
                          name: 'kitId',
                          initialValue: row.id,
                          fluid: true,
                          label: 'Are you sure you want to delete this item? This process cannot be undone and will affect all regions, countries, and sites under this study.',
                        },
                      ]);
                      setFormIcon(<DeleteKit />);
                      setformName('Delete Kit Configuration');

                      dispatch(
                        setForm({
                          state: true,
                          type: 'delete-kit-config',
                        }),
                      );
                      deleteKitConfig();
                    }}
                  >
                    <DeleteInventory width="18" height="18" />
                  </div>
                )}
                <HemaValue text={row.availableToBuild} />
              </div>
            ),
        },
      ]}
      data={allKits?.logisticBuilderKits || []}
      expandableRows
      expandableRowsComponent={ExpendedDataRows}
      expandableRowsComponentProps={{
        addAssemblyAction,
        setformName,
        setFormIcon,
        dispatch,
        setForm,
        editFormReducer,
        setUpdatedData,
        createAssemblyCTA,
        common,
        setAllItemsInTemplate,
        getKitTemplateAssemblyCopyAction,
        deleteKitAssemblyConfig,
        assigner,
        level,
        setFieldValue,
        // shipping,
        // setSelectedRule,
        readOnly,
        values,
        logistic,
        allKits,
      }}
    />
  );
};

export default KitConfiguration;
