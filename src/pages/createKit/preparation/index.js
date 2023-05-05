import React from 'react';
import DataTable from 'react-data-table-component';
import { Alert as AlertBootstrap } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { Button, Pagination, HemaValue, FormCheckbox } from '../../../utils';
import { KitRequestBuilding } from '../../../components/Tables';
import { CreateAction, CreateItemPurple, BuildingTab, StagingTab, LockFile } from '../../../HemeIconLibrary';
import { KitAssemblyPreparation } from '../../../components/Formik/AllForms/kitAssemblyPreparation';
import { ScreeningKitBuild, Unassignkit, assignLineItem } from '../../../components/Formik/AllForms/ScreeningKitBuilder';
import { getReadyInvenotryItemAction } from '../../../Actions/order';
import { setFormLoaderReducer, setFormCloseReducer, showSuccessReducer, editFormReducer } from '../../../Store/reducers/uiSettings';
import { AssignPreparationKitAction, getAllbuildPreparationAction, unAssignLineItemAction, getAssemblyforItemAction } from '../../../Actions/order';
import { useDispatch } from 'react-redux';
const RequestPreparation = (props) => {
  const {
    subTab,
    setsubTab,
    orders,
    setformName,
    setFormIcon,
    setokBtnText,
    setCancelBtnText,
    setForm,
    setCTA,
    buildPrepLineItemCTA,
    buildPreparation,
    setUpdatedData,
    stagingPreparation,
    setopenRequestDoc,
  } = props;
  const dispatch = useDispatch();
  const buildPreparationKitCTA = (row) => {
    setCTA(() => async (payload) => {
      dispatch(setFormLoaderReducer(true));
      console.log('payload', payload);
      const filterpayload = {
        quantity: payload.build_qty,
        orderItemId: row?.id,
        itemRecordId: payload?.recordItemId?.filter?.((item) => item.checked)?.[0]?.id || null,
      };
      const resp = await AssignPreparationKitAction(orders?.activeOrder?.id, filterpayload);
      if (resp?.status === 200) {
        dispatch(setFormLoaderReducer(false));
        dispatch(setFormCloseReducer());
        getAllbuildPreparationAction('building', orders.activeOrder?.id);
        getAllbuildPreparationAction('staging', orders.activeOrder?.id);
        dispatch(showSuccessReducer(`Kit successfully built.`));
      }
    });
  };
  const unAssignCustomCTA = (row) => {
    setCTA(() => async (payload) => {
      console.log('row', row);
      dispatch(setFormLoaderReducer(true));
      var resp;
      if (row?.buildType === 'build-assign') {
        resp = await unAssignLineItemAction(orders.activeOrder?.id, row?.id, 'un-assign');
      } else {
        resp = await unAssignLineItemAction(orders.activeOrder?.id, row?.id, 'un-assign-custom-line-item');
      }

      if (resp?.status === 200) {
        dispatch(setFormLoaderReducer(false));
        dispatch(setFormCloseReducer());
        getAllbuildPreparationAction('building', orders.activeOrder?.id);
        dispatch(showSuccessReducer(`${row.item.name} Kit successfully unassigned.`));
      }
    });
  };
  return (
    <Tabs
      defaultActiveKey={subTab}
      id="uncontrolled-tab-example"
      className="mb-4"
      onSelect={(key) => {
        setsubTab(key);
      }}
    >
      <Tab
        eventKey="building"
        title={
          <div className="flex items-center title-icon gap-[7px]">
            <BuildingTab /> Building
          </div>
        }
      >
        {orders?.allBuildPreparation ? (
          buildPreparation?.length > 0 ? (
            <DataTable
              data={buildPreparation}
              columns={[
                ...KitRequestBuilding,
                {
                  name: 'Actions',
                  cell: (row) => {
                    return (
                      <div className="flex-grow four">
                        <div className="flex justify-end gap-[5px] meta">
                          <Button
                            Icon={<CreateAction />}
                            // Tick Icon also here Icon={<CheckAction />}
                            color="text-white"
                            bg="bg-bgActionDots"
                            cta={async () => {
                              const buildType = 'build-assign';
                              if (buildType === 'build-assign') {
                                const resp = await getReadyInvenotryItemAction(row?.item?.id, row?.remainingQuantity);
                                if (resp.status === 200) {
                                  const selectedInventory = resp?.data;
                                  dispatch(editFormReducer({ availableToBuild: row?.remainingQuantity }));
                                  setformName('Inventory Management');
                                  setFormIcon(<CreateItemPurple />);
                                  setokBtnText('Assign');
                                  setCancelBtnText('Cancel');
                                  ScreeningKitBuild[0].label = row?.item?.name;
                                  ScreeningKitBuild[1].initialValue = row?.remainingQuantity || '0';
                                  ScreeningKitBuild[2].initialValue = selectedInventory;
                                  setUpdatedData(ScreeningKitBuild);
                                  dispatch(
                                    setForm({
                                      state: true,
                                      type: 'build-screening-kit',
                                    }),
                                  );
                                  buildPreparationKitCTA(row);
                                }
                              } else if (buildType === 'requistion-form') {
                                setformName('Requisition Form');
                                setFormIcon(<CreateItemPurple />);
                                setopenRequestDoc(true);
                                // buildPreparationKitCTA();
                              } else {
                                setformName('Line Item Preparation');
                                setFormIcon(<CreateItemPurple />);
                                setokBtnText('Confirm');
                                setCancelBtnText('Cancel');
                                assignLineItem[0].initialValue = row?.item?.name;
                                assignLineItem[1].initialValue = row?.remainingQuantity;
                                setUpdatedData(assignLineItem);
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'build-screening-kit',
                                  }),
                                );
                                buildPrepLineItemCTA(row);
                              }
                            }}
                          />
                          <Button
                            Icon={<LockFile />}
                            color="text-white"
                            bg="bg-bgActionDots"
                            cta={() => {
                              setformName('Unassign');
                              setFormIcon(<CreateItemPurple />);
                              setokBtnText('Confirm');
                              setCancelBtnText('Cancel');
                              Unassignkit[0].initialValue = row?.item.name;
                              Unassignkit[1].initialValue = row?.builtQuantity || 0;
                              setUpdatedData(Unassignkit);
                              dispatch(setForm({ state: true, type: 'un-assign-custom-line' }));
                              unAssignCustomCTA(row);
                            }}
                          />
                        </div>
                      </div>
                    );
                  },
                  ignoreRowClick: true,
                  allowOverflow: true,
                  button: true,
                },
              ]}
              pagination
              // onSort={(row, direction, sorted) => {
              //   setfilteredData(sortedData(row.sortId, direction, sorted));
              // }}
              paginationComponent={(e) => {
                return <Pagination e={e} />;
              }}
            />
          ) : (
            <AlertBootstrap variant="warning" className="mt-3 text-center">
              No Data found
            </AlertBootstrap>
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
      </Tab>
      <Tab
        eventKey="staging"
        title={
          <div className="flex items-center title-icon gap-[7px]">
            <StagingTab /> Staging
          </div>
        }
      >
        {orders?.allStagingPreparation ? (
          stagingPreparation?.length > 0 ? (
            <DataTable
              columns={[
                {
                  name: <HemaValue text={'Name'} className="font-normal text-[#000000]" />,
                  sortable: true,
                  sortId: 'sponsor.name',
                  selector: (row, index) => {
                    return (
                      <div className="flex-shrink-0 flex items-center gap-[10px] cursor-pointer check_box">
                        <FormCheckbox
                          // onClick={(e) => {
                          //   if (allSites) {
                          //     setFieldValue(
                          //       name,
                          //       allSites?.map((site, counter) => {
                          //         if (counter === index) {
                          //           return {
                          //             ...site,
                          //             checked: e.target?.checked,
                          //           };
                          //         } else {
                          //           return site;
                          //         }
                          //       }),
                          //     );
                          //   }
                          // }}
                          checked={row.checked}
                          type="checkbox"
                        />

                        <HemaValue text={row?.item?.name} />
                      </div>
                    );
                  },
                },
                {
                  name: <HemaValue text={'Built Quantity '} className="font-normal text-[#000000]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.builtQuantity} />,
                  sortId: 'study.name',
                },
                {
                  name: <HemaValue text={'Lot Number'} className="font-normal text-[#000000]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.lotNumber || 'N/A '} />,
                  sortId: 'lotNumber',
                },
                {
                  name: <HemaValue text={'Built Date'} className="font-normal text-[#000000]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.builtDate} />,
                  sortId: 'builtDate',
                },
                {
                  name: <HemaValue text={'Status'} className="font-normal text-[#000000]" />,
                  sortable: true,
                  selector: (row) => <HemaValue text={row?.status?.name} />,
                  sortId: 'status.name',
                },
                {
                  name: 'Actions',
                  cell: (row) => {
                    return (
                      <div className="flex-grow four">
                        <div className="flex justify-end gap-[5px] meta">
                          <Button
                            Icon={<CreateAction />}
                            color="text-white"
                            bg="bg-bgActionDots"
                            cta={async () => {
                              const resp = await getAssemblyforItemAction(orders?.activeOrder?.id, row?.id);
                              if (resp.status === 200) {
                                const selectedAssemblies = resp.data;
                                setformName('Kit Assembly Preparation');
                                setFormIcon(<CreateItemPurple />);
                                setokBtnText('Save');
                                setCancelBtnText('Cancel');
                                KitAssemblyPreparation[0].initialValue = row?.item.name;
                                KitAssemblyPreparation[1].initialValue = selectedAssemblies?.orderItemAssemblies?.[0]?.name;
                                KitAssemblyPreparation[2].initialValue = selectedAssemblies?.orderItemAssemblies?.[0]?.testingLab?.name;
                                KitAssemblyPreparation[3].initialValue = selectedAssemblies?.orderItemAssemblies?.[0]?.inboundShippingCondition?.name;
                                KitAssemblyPreparation[4].initialValue = selectedAssemblies?.orderItemAssemblies?.[0]?.orderItemAssemblyItems;
                                setUpdatedData(KitAssemblyPreparation);
                                //  addInventoryCTA();
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'kit-assembly-preparation',
                                  }),
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    );
                  },
                  ignoreRowClick: true,
                  allowOverflow: true,
                  button: true,
                },
              ]}
              data={stagingPreparation || []}
              pagination
              // onSort={(row, direction, sorted) => {
              //   setfilteredData(sortedData(row.sortId, direction, sorted));
              // }}
              paginationComponent={(e) => {
                return <Pagination e={e} />;
              }}
            />
          ) : (
            <AlertBootstrap variant="warning" className="mt-3 text-center">
              No Staging information found
            </AlertBootstrap>
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
      </Tab>
    </Tabs>
  );
};

export default RequestPreparation;
