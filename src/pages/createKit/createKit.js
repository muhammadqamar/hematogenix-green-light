import React, { useEffect, useRef, useState } from 'react';

import { Tab, Tabs, Spinner } from 'react-bootstrap';
import { Alert as AlertBootstrap } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';
import FormContainer from '../../components/Formik/formContainer';

import RequestInformaction from './requestInformaction';
import { Button, HemaLabel, HemaValue, Pagination, FormCheckbox, Alert } from '../../utils';
import HemaHeadingWithSubText from '../../utils/HemaHeadingWithSubText';
import { KitRequestBuilding } from '../../components/Tables';
import { getAllSponserAction, getAllSponserStudiesAction, getAllSponserSitesAction } from '../../Actions/sponsers';
import { getTestingLabsAction } from '../../Actions/assembly';
import { addtoShipment } from '../../components/Formik/AllForms/addtoshipment';
import {
  getdefaultOrderValuesAction,
  orderAvailableItemsAction,
  getAllAddressAction,
  getAllbuildPreparationAction,
  getAllShippingStatsAction,
  AssignPreLineItemAction,
  getAllShipmentForOrderIdAction,
  createNewShipmentAction,
  getShipmentDetailAction
} from '../../Actions/order';

import { setType, setActiveSite } from '../../Store/reducers/orders';

import {
  Assemblies,
  TabTask,
  Confirm,
  TabShipping,
  CreateItemPurple,
  TabNotebook,
  TabInfo,
  PreviousIcon,
  NextIcon,
  LabelDate,
  LockOpen,
  GradientLoaction,
  CloseLock,
} from '../../HemeIconLibrary';

import ShippingRequest from './shipping/index';
import { setForm, setFormLoaderReducer, setFormCloseReducer, showSuccessReducer } from '../../Store/reducers/uiSettings';
import RequestPreparation from './preparation';
import RequestDocumentForm from '../../components/RequestDocumentForm';

const CreateKit = ({ setShowDashboard }) => {
  const [activeTab, setactiveTab] = useState('information');
  const [subTab, setsubTab] = useState('building');
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [allItemsInTemplate, setAllItemsInTemplate] = useState();
  const [dropdownItemList, setDropDownItemList] = useState();
  const [okBtnText, setokBtnText] = useState();
  const [openRequestDoc, setopenRequestDoc] = useState(false);
  const [okBtnIcon, setokBtnIcon] = useState();
  const [searchQuery, setsearchQuery] = useState('');
  const [cancelBtnText, setCancelBtnText] = useState();
  const [cancelBtnIcon, setSancelBtnIcon] = useState();
  const [buildPreparation, setbuildPreparation] = useState([]);
  const [stagingPreparation, setstagingPreparation] = useState([]);
  const [shippingPreparation, setShippingPreparation] = useState([]);
  const formikControl = useRef();
  const dispatch = useDispatch();
  const { uisettings, sponsers, common, orders } = useSelector((state) => state);

  console.log('shippingPreparation', shippingPreparation);

  useEffect(() => {
    getAllSponserAction();

    getAllAddressAction();
    getAllbuildPreparationAction('building', orders.activeOrder?.id);
    getAllbuildPreparationAction('staging', orders.activeOrder?.id);
    getAllShippingStatsAction(orders.activeOrder?.id);
    getTestingLabsAction();
  }, []);

  useEffect(() => {
    if (orders.activeOrder?.id) {
      getAllShipmentForOrderIdAction(orders.activeOrder?.id);
    }
  }, [orders.activeOrder?.id]);
  useEffect(() => {
    (async () => {
      setbuildPreparation(orders?.allBuildPreparation);
      setstagingPreparation(orders?.allStagingPreparation);
      setShippingPreparation(orders?.allShipping);
      // }
    })();
  }, [searchQuery, orders]);

  useEffect(() => {
    if (common.activeDropdownValue?.name === 'sponsor') {
      getAllSponserStudiesAction(common.activeDropdownValue?.id);
    } else if (common.activeDropdownValue?.name === 'study') {
      getAllSponserSitesAction(common.activeDropdownValue?.id);
    } else if (common.activeDropdownValue?.name === 'siteCode') {
      getdefaultOrderValuesAction(common.activeDropdownValue?.id, orders.type);
      orderAvailableItemsAction(common.activeDropdownValue?.id, orders.type);
      dispatch(setActiveSite(common.activeDropdownValue?.id));
    }
  }, [common.activeDropdownValue]);

  useEffect(() => {
    if (orders?.activeOrder?.site) {
      orderAvailableItemsAction(orders?.activeOrder.site.id, orders.type);
      dispatch(setActiveSite(orders?.activeOrder.site.id));
    }
  }, [orders?.activeOrder?.site]);

  const buildPrepLineItemCTA = (row) => {
    setCTA(() => async (payload) => {
      dispatch(setFormLoaderReducer(true));
      console.log('payload', payload);
      const resp = await AssignPreLineItemAction(73, row.item.id);
      if (resp?.status === 200) {
        dispatch(setFormLoaderReducer(false));
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`Kit successfully built.`));
        dispatch(showSuccessReducer(`Your request item is un-asssigned for this request.`));
      }
    });
  };

  const addToShipmentAction = () => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      console.log('payload', data);
      const resp = await createNewShipmentAction(orders.activeOrder?.id, {name:data?.name, ids:orders?.allStagingPreparation.map(data=>data.id)});
      if (resp?.status === 200) {
        dispatch(setFormLoaderReducer(false));
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`Shipment Successfull`));

      }
    });
  };

  return (
    <>
      {!openRequestDoc ? (
        <>
          <div className="">
            <div className="flex items-center gap-[10px] mb-1">
              <HemaHeadingWithSubText HeadingFontSize="30px" HeadingLineHeight="38px" heading={orders?.activeOrder?.id ? 'Kit Request' : 'New Kit Request'} />
              <div
                className={`w-fit rounded-full px-3 py-1  flex items-center justify-center gap-1 ${
                  (orders?.activeOrder?.header?.status?.name === 'New' && 'bg-[#D6D7FF]') ||
                  (orders?.activeOrder?.header?.status?.name === 'In Process' && 'bg-[#fbe8db]') ||
                  (orders?.activeOrder?.header?.status?.name === 'Shipped' && 'bg-[#fcdaee]') ||
                  (orders?.activeOrder?.header?.status?.name === 'Completed' && 'bg-[#e1ffee]')
                } `}
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    (orders?.activeOrder?.header?.status?.name === 'New' && 'bg-[#4868DA]') ||
                    (orders?.activeOrder?.header?.status?.name === 'In Process' && 'bg-[#F97316]') ||
                    (orders?.activeOrder?.header?.status?.name === 'Shipped' && 'bg-[#C92286]') ||
                    (orders?.activeOrder?.header?.status?.name === 'Completed' && 'bg-[#065528]')
                  } `}
                />
                <HemaValue
                  color={
                    (orders?.activeOrder?.header?.status?.name === 'New' && 'text-[#4868DA]') ||
                    (orders?.activeOrder?.header?.status?.name === 'In Process' && 'text-[#F97316]') ||
                    (orders?.activeOrder?.header?.status?.name === 'Shipped' && 'text-[#C92286]') ||
                    (orders?.activeOrder?.header?.status?.name === 'Completed' && 'text-[#065528]')
                  }
                  className=""
                  text={orders?.activeOrder?.header?.status?.name || 'New'}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              {orders?.activeOrder?.header?.type?.id !== 1 ? <LockOpen /> : <CloseLock />}
              <div className="w-[6px] h-[6px] rounded-full bg-[#2C2C2C]" />
              <div className="flex items-center gap-1">
                <LabelDate color="#2C2C2C" />
                <HemaValue className="font-normal text-[16px] leading-[24px]" text="Last Activity: 2/8/2022" />
              </div>

              {orders?.activeOrder?.owner?.name && (
                <>
                  <div className="w-[6px] h-[6px] rounded-full bg-[#2C2C2C]" />
                  <div className="flex items-center gap-1">
                    <LabelDate color="#2C2C2C" />

                    <HemaValue className="font-normal text-[16px] leading-[24px]" text={`By: ${orders?.activeOrder?.owner?.name}`} />
                  </div>
                </>
              )}
            </div>
          </div>

          <Alert type="error" />

          <div className="bg-white rounded-[5px] p-4   mb-[13px] inventory-tabs">
            <Tabs
              defaultActiveKey={activeTab}
              id="uncontrolled-tab-example"
              className="mb-4"
              onSelect={(key) => {
                setactiveTab(key);
              }}
            >
              <Tab
                eventKey="information"
                title={
                  <div className="flex items-center title-icon gap-[7px]">
                    <TabInfo /> Request Information
                  </div>
                }
              >
                <RequestInformaction
                  setUpdatedData={setUpdatedData}
                  setformName={setformName}
                  setFormIcon={setFormIcon}
                  setokBtnIcon={setokBtnIcon}
                  setokBtnText={setokBtnText}
                  setCTA={setCTA}
                  ref={formikControl}
                  setShowDashboard={setShowDashboard}
                />
              </Tab>
              <Tab
                eventKey="Preparation"
                title={
                  <div className="flex items-center title-icon gap-[7px] ">
                    <Assemblies /> Preparation
                  </div>
                }
              >
                <RequestPreparation
                  setUpdatedData={setUpdatedData}
                  setformName={setformName}
                  setFormIcon={setFormIcon}
                  setokBtnIcon={setokBtnIcon}
                  setokBtnText={setokBtnText}
                  buildPreparation={buildPreparation}
                  setbuildPreparation={setbuildPreparation}
                  stagingPreparation={stagingPreparation}
                  setsubTab={setsubTab}
                  orders={orders}
                  setCancelBtnText={setCancelBtnText}
                  setForm={setForm}
                  setopenRequestDoc={setopenRequestDoc}
                  setCTA={setCTA}
                />
              </Tab>
              <Tab
                eventKey="Shipping"
                title={
                  <div className="flex items-center title-icon gap-[7px]">
                    <TabShipping /> Shipping
                  </div>
                }
              >
                <HemaHeadingWithSubText HeadingFontSize="16px" HeadingLineHeight="38px" heading="Shipments" />
                <ShippingRequest
                  subTab={subTab}
                  setsubTab={setsubTab}
                  setformName={setformName}
                  setFormIcon={setFormIcon}
                  setUpdatedData={setUpdatedData}
                  setokBtnText={setokBtnText}
                  setCancelBtnText={setCancelBtnText}
                  orders={orders}
                />
              </Tab>

              <Tab
                eventKey="Assignment"
                title={
                  <div className="flex items-center title-icon gap-[7px]">
                    <TabTask /> Task Assignment
                  </div>
                }
              >
                <>
                  <AlertBootstrap variant="warning" className="text-center">
                    No Inventory Items to Show. Please add by clicking on Create New Item.
                  </AlertBootstrap>
                </>
              </Tab>

              <Tab
                eventKey="Notebook"
                title={
                  <div className="flex items-center title-icon gap-[7px]">
                    <TabNotebook /> Notebook
                  </div>
                }
              >
                <>
                  <AlertBootstrap variant="warning" className="text-center">
                    No Inventory Items to Show. Please add by clicking on Create New Item.
                  </AlertBootstrap>
                </>
              </Tab>
            </Tabs>

            {activeTab === 'information' && (
              <div className="w-full flex items-center justify-between px-[16px] py-[21px]  rounded-[5px] bg-white ">
                {formikControl.current?.isSubmitting ? (
                  <Button
                    type="submit"
                    bg="bg-primary1"
                    text={
                      <>
                        <Spinner animation="grow" size="sm" variant="light" />
                        <Spinner animation="grow" size="sm" variant="light" />
                        <Spinner animation="grow" size="sm" variant="light" />
                      </>
                    }
                  />
                ) : (
                  <Button
                    type="submit"
                    text="Save"
                    bg="bg-primary1"
                    color="text-white"
                    Icon={<Confirm />}
                    cta={() => {
                      formikControl.current?.submitForm();
                      // if (orders?.activeOrder?.id) {

                      // } else {
                      //   formikControl.current?.submitForm();
                      // }
                    }}
                  />
                )}
                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    text="Previous"
                    bg="bg-white"
                    color="text-primary1"
                    border=" border-[21px] border-primary1 "
                    Icon={<PreviousIcon />}
                    cta={() => {
                      setShowDashboard(true);
                    }}
                  />
                  <Button type="submit" text="Save" bg="bg-primary1" color="text-white" Icon={<NextIcon />} />
                </div>
              </div>
            )}
            {activeTab === 'Preparation' && subTab === 'staging' && (
              <div className="flex items-center justify-end gap-2">
                <Button
                  cta={() => {
                    setformName('Add to Shipment');
                    setFormIcon(<CreateItemPurple />);
                    setokBtnText('Confirm');
                    setCancelBtnText('Cancel');
                    addtoShipment[3].options = orders?.activeOrder?.allShipments;
                    addToShipmentAction();
                    setUpdatedData(addtoShipment);

                    dispatch(
                      setForm({
                        state: true,
                        type: 'add-to-shiment',
                      }),
                    );
                  }}
                  type="submit"
                  text="Add to Shipment"
                  bg="bg-primary1"
                  color="text-white"
                  Icon={<NextIcon />}
                />
              </div>
            )}
          </div>

          {uisettings?.openform && (
            <FormContainer
              cta={CTA}
              formType={updatedData}
              formName={formName}
              Icon={formIcon}
              formValidation={formValidation}
              setUpdatedData={setUpdatedData}
              setformName={setformName}
              setFormIcon={setFormIcon}
              allItemsInTemplate={allItemsInTemplate}
              dropDownItemList={dropdownItemList}
              cancelBtnIcon={cancelBtnIcon}
              cancelBtnText={cancelBtnText}
              okBtnIcon={okBtnIcon}
              okBtnText={okBtnText}
              setokBtnIcon={setokBtnIcon}
              setokBtnText={setokBtnText}
            />
          )}
        </>
      ) : (
        <RequestDocumentForm formName={formName} />
      )}
    </>
  );
};

export default CreateKit;
