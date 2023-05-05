import React, { useEffect, useRef, useState } from "react";

import { Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { NavDropdown } from "react-bootstrap";
import { Pagination, Button, HemaValue } from "../../../utils";
import { ScreeningKitBuild, Unassignkit, assignLineItem } from "../../../components/Formik/AllForms/ScreeningKitBuilder";
import { setForm, setFormLoaderReducer, setFormCloseReducer, showSuccessReducer, editFormReducer } from "../../../Store/reducers/uiSettings";
import { KitShippingReqCol } from "../../../components/Tables/shippingKitRequestCol";
import { KitPackagingCol } from "../../../components/Tables/pakagingKitCol";
import { DeleteRequestPackage } from "../../../components/Formik/AllForms/deleteRequestPackage";
import { ViewIcon, ActionDots, PakageTab, GreenLightTab, QualityControlTab, CheckReady, PackageSubAction, Edit, DeleteBin, DeleteColor, Add, Reject } from "../../../HemeIconLibrary";
import {getShipmentDetailAction} from "../../../Actions/order";

import Heading from "../../logistOrchestra/logisticComponents/heading";

const Index = (props) => {
  const [activeTab, setactiveTab] = useState("Shipping");
  // const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  // const { uisettings, sponsers, common, orders } = useSelector((state) => state);

  const { subTab, setsubTab, setformName, setFormIcon, setUpdatedData, setokBtnText, setCancelBtnText, orders } = props;
  return (
    <>
      <DataTable
        data={orders.allShipping || []}
        columns={[
          ...KitShippingReqCol,
          {
            name: "Actions",
            cell: (row) => {
              return (
                <div className="flex-grow four">
                  <div className="flex justify-end gap-[5px] meta">
                    <Button
                      Icon={<ViewIcon />}
                      color="text-white"
                      bg="bg-bgActionDots"
                      cta={async () => {
                        await getShipmentDetailAction(orders.activeOrder?.id,row.id )
                      }}
                    />
                    <NavDropdown
                      title={<Button Icon={<ActionDots />} color="text-white" bg="bg-bgActionDots" />}
                      className="hema-ellipse-dropdown"
                      // id="navbarScrollingDropdown"
                    >
                      <NavDropdown.Item className="mb-1" onClick={async () => {}}>
                        <div className="flex gap-[10px] items-center">
                          <HemaValue text="Generate Airway Bill" />
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item className="mb-1" onClick={() => {}}>
                        <div className="flex gap-[10px] items-center">
                          <HemaValue text="Generate Pro Forma Invoice" />
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item className="mb-1" onClick={() => {}}>
                        <div className="flex gap-[10px] items-center">
                          <HemaValue text="Generate Shipment Manifest" />
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item className="mb-1" onClick={() => {}}>
                        <div className="flex gap-[10px] items-center">
                          <HemaValue text="Unlock Shipment" />
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item className="mb-1" onClick={() => {}}>
                        <div className="flex gap-[10px] items-center">
                          <HemaValue text="Remove Items" />
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item className="mb-1" onClick={() => {}}>
                        <div className="flex gap-[10px] items-center">
                          <HemaValue text="Delete Shipment" />
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ]}
        customStyles={{
          responsiveWrapper: {
            style: { overflow: 'visible !important' },
          },
        }}
        // onSort={(row, direction, sorted) => {
        //   setfilteredData(sortedData(row.sortId, direction, sorted));
        // }}
      />
      <div className="bg-white rounded-[5px] mb-[13px] inventory-tabs">
        <Tabs
          defaultActiveKey={subTab}
          id="uncontrolled-tab-example"
          className="mb-4"
          onSelect={(key) => {
            setsubTab(key);
          }}
        >
          <Tab
            eventKey="Packaging"
            title={
              <div className="flex items-center title-icon gap-[7px]">
                <PakageTab /> Packaging
              </div>
            }
          >
            <div className="">
              {/* {updatedData ?
                <HemaForm

                  data={updatedData}
                  formName="request-details"
                  cta={(val) => {
                    console.log(val);
                  }}
                />: <Skeleton count="5" />} */}
              <div className="flex justify-between mb-3">
                <Heading heading="Package Information" border />
                <div className="flex items-center justify-end gap-2">
                  <Button cta={()=>{
                    dispatch(editFormReducer())
                    setformName('Create Package');
                    setFormIcon(<Reject />);
                    setokBtnText('Save');


                    dispatch(
                      setForm({
                        state: true,
                        type: 'create-package',
                      }),
                    );
                  }} type="submit" text="Add Package" bg="bg-primary1" color="text-white" Icon={<Add color="#fff" />} />
                </div>
              </div>
              <DataTable
                data={orders?.activeShipment?.packages || []}
                className="border border-t border-t-black"
                columns={[
                  ...KitPackagingCol,
                  {
                    name: "Actions",
                    cell: (row) => {
                      return (
                        <div className="flex-grow four">
                          <div className="flex justify-end gap-[5px] meta">
                            <Button
                              Icon={<PackageSubAction />}
                              color="text-white"
                              bg="bg-bgActionDots"
                              cta={() => {
                                // setformName('Inventory Management');
                                // setFormIcon(<CreateItemPurple />);
                                // setokBtnText('Save');
                                // setCancelBtnText('Cancel');
                                // ScreeningKitBuild[1].initialValue = 5;
                                // setUpdatedData(ScreeningKitBuild);
                                // //  addInventoryCTA();
                                // dispatch(
                                //   setForm({
                                //     state: true,
                                //     type: 'build-screening-kit',
                                //   }),
                                // );
                              }}
                            />
                            <Button
                              cta={()=>{
                                dispatch(editFormReducer(row))
                                setformName('Edit Package');
                                setFormIcon(<Reject />);
                                setokBtnText('Save');


                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'create-package',
                                  }),
                                );
                              }}
                             Icon={<Edit />} color="text-white" bg="bg-bgActionDots" />
                            <Button
                              Icon={<DeleteColor />}
                              color="text-white"
                              bg="bg-bgActionDots"
                              cta={() => {
                                setformName("Delete Package");
                                setFormIcon(<DeleteColor />);
                                setokBtnText("Confirm");
                                setCancelBtnText("Cancel");

                                setUpdatedData(DeleteRequestPackage);
                                //  addInventoryCTA();
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: "build-screening-kit",
                                  }),
                                );
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
                expandableRows
                expandableRowsComponent={ExpendedDataRows}
                // expandableRowsComponentProps={{
                //   addAssemblyAction,}}
              />
            </div>
          </Tab>
          <Tab
            eventKey="GreenLight"
            title={
              <div className="flex items-center title-icon gap-[7px] ">
                <GreenLightTab /> Green Light
              </div>
            }
          >
            Green Light
          </Tab>
          <Tab
            eventKey="QualityControl"
            title={
              <div className="flex items-center title-icon gap-[7px]">
                <QualityControlTab /> Quality Control
              </div>
            }
          >
            Quality Control
          </Tab>
          <Tab
            eventKey="PostShipping"
            title={
              <div className="flex items-center title-icon gap-[7px]">
                <CheckReady /> Post Shipping
              </div>
            }
          >
            <>Post Shipping</>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

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
            selector: (row) => (
              <HemaValue text={` ${row?.name}`} />
            ),
          },
          {
            selector: (row) => <HemaValue text={row?.itemPerKit} />,
          },
          {
            selector: (row) => <HemaValue text={row?.itemPerKit} />,
          },
          {
            selector: (row) => <HemaValue text={row?.lotNumber} />,
          },
        ]}
      />
    </div>
  );
};
export default Index;
