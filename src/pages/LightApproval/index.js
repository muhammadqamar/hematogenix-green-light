import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useSearchParams } from 'react-router-dom';
import {
  Assemblies,
  Cancel,
  CheckReady,
  Confirm,
  CrossIcon,
  Pending,
} from '../../HemeIconLibrary';
import FormContainer from '../../components/Formik/formContainer';
import HemaHeadingWithSubText from '../../utils/HemaHeadingWithSubText';
import { Button, Alert, HemaValue, HemaLabel, Heading } from '../../utils';
import { getAllOrderAction } from '../../Action/order';
import eyeIcon from '../../assets/images/eye.svg';

// Components
import AllApproval from './All';
// import PendingUser from './Pending';
// import Approved from './Approved';
// import Rejected from './Rejected';

const LightApproval = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state);
  const [greenLightAction, setgreenLightAction] = useState(false);
  const [approve, setApprove] = useState(false);
  const [pageSub, setPageSub] = useState(
    'Manage your green light approval here.'
  );

  const [showDetail, setShowDetial] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem('green-light-auth',searchParams.get('auth')); // 'name'

    getAllOrderAction();
  }, [searchParams]);

  return (
    <>
      <div className={`block`}>
        <div className="flex gap-[10px] justify-between items-end">
          <HemaHeadingWithSubText
            heading="Green Light Approval"
            sub={pageSub}
          />
        </div>
        <Alert />
        {!showDetail ? (
          <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
            <Tabs
              defaultActiveKey="CompanyLocation"
              id="uncontrolled-tab-example"
              className="mb-3 gap-[20px]"
            >
              <Tab
                eventKey="CompanyLocation"
                title={
                  <div className="flex items-center title-icon gap-[10px]">
                    <Assemblies />
                    All
                  </div>
                }
              >
                <AllApproval
                  setShowDetial={setShowDetial}
                  data={orders.allOrders}
                />
              </Tab>

              <Tab
                eventKey="SystemUser"
                title={
                  <div className="flex items-center title-icon gap-[10px]">
                    <Pending />
                    Pending
                  </div>
                }
              >
                <AllApproval
                  setShowDetial={setShowDetial}
                  data={
                    orders.allOrders?.filter(
                      (data) => data?.status?.id === 2
                    ) || []
                  }
                />
              </Tab>

              <Tab
                eventKey="PortalUser"
                title={
                  <div className="flex items-center title-icon gap-[10px] ">
                    <CheckReady /> Approved
                  </div>
                }
              >
                <AllApproval
                  setShowDetial={setShowDetial}
                  data={orders.allOrders?.filter(
                    (data) => data?.status?.id === 3
                  )}
                />
              </Tab>

              <Tab
                eventKey="RoleManagment"
                title={
                  <div className="flex items-center title-icon gap-[10px] ">
                    <CrossIcon color="#414753" /> Rejected
                  </div>
                }
              >
                <AllApproval
                  setShowDetial={setShowDetial}
                  data={orders.allOrders?.filter(
                    (data) => data?.status?.id === 4
                  )}
                />
              </Tab>
            </Tabs>
          </div>
        ) : (
          <div className="w-full mt-[30px]">
            <div className="w-full rounded-[5px] bg-white pt-[24px] pb-[16px] mb-[10px]">
              <div className=" w-full px-[16px]">
                <Heading heading="Details" />
                <div className="flex items-center justify-between  pr-[120px] mt-[21px] mb-[32px]">
                  <div className="flex items-center gap-[20px]">
                    <HemaLabel text="Order Confirmation Number" />
                    <HemaValue
                      text={orders?.activeOrder?.shipment?.order?.orderCode}
                    />
                  </div>
                  <div className="flex items-center gap-[20px]">
                    <HemaLabel text="Sponsor" />
                    <HemaValue
                      text={orders?.activeOrder?.shipment?.sponsor?.name}
                    />
                  </div>
                  <div className="flex items-center gap-[20px]">
                    <HemaLabel text="Study Name" />
                    <HemaValue
                      text={orders?.activeOrder?.shipment?.studyName}
                    />
                  </div>
                  <div className="flex items-center gap-[20px] ">
                    <HemaLabel text="Site Code" />
                    <HemaValue text={orders?.activeOrder?.shipment?.SiteCode} />
                  </div>
                </div>
                <Heading heading="Documents" border />
              </div>
              <div className="w-full border-t-[1px] border-b-[1px] border-solid border-[#DEE2E6]">
                <DataTable
                  data={orders?.activeOrder?.files || []}
                  customStyles={{
                    rows: {
                      style: {
                        paddingRight: '20px',
                        style: { overflow: 'visible !important' },
                      },
                    },

                    cells: {
                      style: { overflow: 'visible !important' },
                    },

                    responsiveWrapper: {
                      style: { overflow: 'visible !important' },
                    },
                  }}
                  columns={[
                    {
                      name: (
                        <HemaValue
                          text={'Name'}
                          className="font-normal text-[#000000]"
                        />
                      ),
                      sortable: true,
                      filterable: true,
                      selector: (row, index) => (
                        <>
                          <HemaValue text={row.friendlyName} />
                        </>
                      ),
                      sortId: 'firstName',
                    },
                    {
                      name: (
                        <HemaValue
                          text={'Action'}
                          className="font-normal text-[#000000]"
                        />
                      ),
                      cell: (row) => {
                        return (
                          <div className="flex">
                            <div className="flex w-[100px] justify-end meta">
                              <Button
                                Icon={<img src={eyeIcon} alt="" />}
                                padding={false}
                                color="text-[#dc2626]"
                                bg="bg-bgActionDots"
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
                />
              </div>
            </div>

            <div className="w-full rounded-[5px] bg-white px-[16px] py-[21px]">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  Icon={<Cancel />}
                  text="Reject"
                  color="text-[#605DAF]"
                  bg="bg-white"
                  border="border-[2px] border-solid border-[#605DAF]"
                  cta={() => {
                    setgreenLightAction(true);
                    setApprove(false);
                  }}
                />
                <Button
                  Icon={<Confirm />}
                  text="Approve"
                  color="text-white"
                  bg="bg-[#605DAF]"
                  cta={() => {
                    setgreenLightAction(true);
                    setApprove(true);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {greenLightAction && (
          <FormContainer
            setShowDetial={setShowDetial}
            setgreenLightAction={setgreenLightAction}
            approve={approve}
          />
        )}
      </div>
    </>
  );
};

export default LightApproval;
