import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import {
  Assemblies,
  Cancel,
  CheckApprove,
  CheckReady,
  Confirm,
  CrossIcon,
  EyeIcon,
  Pending,
  Reject,
} from '../../HemeIconLibrary';
import FormContainer from '../../components/Formik/formContainer';
import HemaHeadingWithSubText from '../../utils/HemaHeadingWithSubText';
import { Button, Alert, HemaValue, HemaLabel, Heading } from '../../utils';
import { getFullName } from './Utils';
import eyeIcon from '../../assets/images/eye.svg';
import { GreenLightApproval } from '../../components/Formik/AllForms/greenLightApproval';

// Actions
import {
  getCompanyLocationAction,
  createCompanyLocationAction,
  getSystemUserAction,
  createSystemUserAction,
  createSystemUserUploadAction,
  getSystemUserDownloadAction,
  getPortalUserAction,
  createPortalUserAction,
  createPortalUserUploadAction,
  getPortalUserDownloadAction,
  fetchUserRoles,
  getSitesAction,
  getPerimssionAction,
} from '../../Actions/settings';
import {
  setForm,
  setFormCloseReducer,
  showSuccessReducer,
  editFormReducer,
  setFormLoaderReducer,
} from '../../Store/reducers/uiSettings';

// Components
import AllApproval from './All';
import PendingUser from './Pending';
import Approved from './Approved';
import Rejected from './Rejected';

const data = [
  {
    name: 'ali',
  },

  {
    name: 'ali',
  },
];

const LightApproval = () => {
  const dispatch = useDispatch();
  const { uisettings, settings } = useSelector((state) => state);

  /* form states */
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [activeTab, setactiveTab] = useState('CompanyLocation');
  const [pageSub, setPageSub] = useState(
    'Manage your green light approval here.'
  );
  const [allItemsInTemplate, setAllItemsInTemplate] = useState();
  const [dropdownItemList, setDropDownItemList] = useState();
  const [editRole, setEditRole] = useState(false);
  const [okBtnText, setokBtnText] = useState();
  const [okBtnIcon, setokBtnIcon] = useState();
  const [cancelBtnText, setCancelBtnText] = useState();
  const [cancelBtnIcon, setSancelBtnIcon] = useState();

  const addCompanyLocation = () => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const payload = {
        name: data.name,
        iconName: data.itemCategoryId,
      };
      const resp = await createCompanyLocationAction(payload);
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${resp.data?.name} added.`));
        getCompanyLocationAction();
      }
    });
  };

  const addSystemUser = () => {
    setCTA(() => async (payload) => {
      dispatch(setFormLoaderReducer(true));
      const resp = await createSystemUserAction(payload);
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`New user added.`));
        getSystemUserAction();
      }
    });
  };

  const bulkImportSystemUser = () => {
    setCTA(() => async (payload) => {
      dispatch(setFormLoaderReducer(true));
      const formData = new FormData();
      formData.append('userFile', payload.userFile);
      const resp = await createSystemUserUploadAction(formData);
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(
          showSuccessReducer(`${getFullName(resp.data)} system user added.`)
        );
        getSystemUserAction();
      }
    });
  };

  const addPortalUser = () => {
    setCTA(() => async (payload) => {
      const filterpayload = {
        ...payload,
        siteIds: payload.siteIds
          ?.filter((site) => site.checked === true)
          ?.map((site) => {
            return site.id;
          }),
      };

      dispatch(setFormLoaderReducer(true));
      const resp = await createPortalUserAction(filterpayload);
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`New user added.`));
        getPortalUserAction();
      }
    });
  };

  const bulkImportPortalUser = () => {
    setCTA(() => async (payload) => {
      const formData = new FormData();
      formData.append('userFile', payload.userFile);
      const resp = await createPortalUserUploadAction(formData);
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(
          showSuccessReducer(`${getFullName(resp.data)} portal user added.`)
        );
        getPortalUserAction();
      }
    });
  };

  const handleDownload = async (downloadType) => {
    if (downloadType === 'SystemUser') {
      dispatch(setFormLoaderReducer(true));
      const resp = await getSystemUserDownloadAction();
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        //dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`File downloaded.`));
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'SystemUsers.xlsx');
        document.body.appendChild(link);
        link.click();
      }
    }
    if (downloadType === 'PortalUser') {
      dispatch(setFormLoaderReducer(true));
      const resp = await getPortalUserDownloadAction();
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(showSuccessReducer(`File downloaded.`));

        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'PortalUsers.xlsx');
        document.body.appendChild(link);
        link.click();
      }
    }
  };

  useEffect(() => {
    fetchUserRoles();
    getSitesAction();
    getPerimssionAction();
  }, []);
  return (
    <>
      <div className={`${editRole ? 'hidden' : 'block'}`}>
        <div className="flex gap-[10px] justify-between items-end">
          <HemaHeadingWithSubText
            heading="Green Light Approval"
            sub={pageSub}
          />
        </div>
        <Alert />
        <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
          <Tabs
            defaultActiveKey="CompanyLocation"
            id="uncontrolled-tab-example"
            className="mb-3 gap-[20px]"
            onSelect={(key) => {
              setactiveTab(key);
              if (key === 'CompanyLocation') {
                setPageSub('Manage your green light approval here.');
              } else if (key === 'SystemUser') {
                setPageSub('Manage your green light approval here.');
              } else if (key === 'PortalUser') {
                setPageSub('Manage your green light approval here.');
              } else if (key === 'RoleManagment') {
                setPageSub('Manage your green light approval here.');
              } else {
                setPageSub('');
              }
            }}
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
                setokBtnIcon={setokBtnIcon}
                setokBtnText={setokBtnText}
                setCTA={setCTA}
                setformName={setformName}
                setFormIcon={setFormIcon}
                setUpdatedData={setUpdatedData}
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
              <PendingUser
                setokBtnIcon={setokBtnIcon}
                setokBtnText={setokBtnText}
                setCTA={setCTA}
                setformName={setformName}
                setFormIcon={setFormIcon}
                setUpdatedData={setUpdatedData}
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
              <Approved
                setokBtnIcon={setokBtnIcon}
                setokBtnText={setokBtnText}
                sites={settings?.sites}
                setCTA={setCTA}
                setformName={setformName}
                setFormIcon={setFormIcon}
                setUpdatedData={setUpdatedData}
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
              <Rejected
                setokBtnIcon={setokBtnIcon}
                setokBtnText={setokBtnText}
                setCTA={setCTA}
                setformName={setformName}
                setFormIcon={setFormIcon}
                setUpdatedData={setUpdatedData}
                setEditRole={setEditRole}
              />
            </Tab>
          </Tabs>
        </div>

        {/* detail section */}
        <div className="w-full">
          <div className="w-full rounded-[5px] bg-white pt-[24px] pb-[16px] mb-[10px]">
            <div className=" w-full px-[16px]">
              <Heading heading="Details" />
              <div className="flex items-center justify-between  pr-[120px] mt-[21px] mb-[32px]">
                <div className="flex items-center gap-[20px]">
                  <HemaLabel text="Order Confirmation Number" />
                  <HemaValue text="2280" />
                </div>
                <div className="flex items-center gap-[20px]">
                  <HemaLabel text="Sponsor" />
                  <HemaValue text="Pfizer" />
                </div>
                <div className="flex items-center gap-[20px]">
                  <HemaLabel text="Study Number" />
                  <HemaValue text="ARC-101 ARM 1" />
                </div>
                <div className="flex items-center gap-[20px] ">
                  <HemaLabel text="Site Code" />
                  <HemaValue text="001" />
                </div>
              </div>
              <Heading heading="Documents" border />
            </div>
            <div className="w-full border-t-[1px] border-b-[1px] border-solid border-[#DEE2E6]">
              <DataTable
                data={data}
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
                        <HemaValue text={row.name || 'Airway Bill'} />
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
                              cta={() => {
                                dispatch(editFormReducer(row));

                                setformName('Delete user');
                                setokBtnIcon();
                                setokBtnText('Confirm');
                                setFormIcon(<EyeIcon />);
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'deleteItem',
                                  })
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
              />
            </div>
          </div>

          <div className="w-full rounded-[5px] bg-white px-[16px] py-[21px]">
            <div className="w-full justify-end flex items-center gap-2">
              <Button
                Icon={<Cancel />}
                text="Reject"
                color="text-[#605DAF]"
                bg="bg-white"
                border="border-[2px] border-solid border-[#605DAF]"
                cta={() => {
                  GreenLightApproval[0].initialValue = '';
                  setUpdatedData(GreenLightApproval);
                  setformName('Reject');
                  setokBtnIcon();
                  setokBtnText('Submit');
                  setFormIcon(<Reject />);
                  dispatch(
                    setForm({
                      state: true,
                      type: 'green-reject',
                    })
                  );
                }}
              />
              <Button
                Icon={<Confirm />}
                text="Approve"
                color="text-white"
                bg="bg-[#605DAF]"
                cta={() => {
                  GreenLightApproval[0].initialValue = '';
                  setUpdatedData(GreenLightApproval);
                  setformName('Approve');
                  setokBtnIcon();
                  setokBtnText('Submit');
                  setFormIcon(<CheckApprove />);
                  dispatch(
                    setForm({
                      state: true,
                      type: 'green-approve',
                    })
                  );
                }}
              />
            </div>
          </div>
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
      </div>

      <div className={`${!editRole ? 'hidden' : 'block'}`}>
        {/* <AddRole setEditRole={setEditRole} /> */}
      </div>
    </>
  );
};

export default LightApproval;
