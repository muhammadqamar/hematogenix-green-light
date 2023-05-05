import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";

import { Add, Assemblies, BlueTick, Check, CheckAction, CheckApprove, CheckReady, Checked, CrossIcon, FormReject, Pending, Reject } from "../../HemeIconLibrary";
import FormContainer from "../../components/Formik/formContainer";
import { companyLocationField } from "../../components/Formik/AllForms/companyLocationField";
import { createUserField, bulkFileImport } from "../../components/Formik/AllForms/addUserFields";
import { addPortalUserFields } from "../../components/Formik/AllForms/addPortalUserFields";

import CompanyLocation from "../../HemeIconLibrary/settingsIcons/companyLocation";
import PortalUser from "../../HemeIconLibrary/settingsIcons/portalUser";
import RoleManagmrnt from "../../HemeIconLibrary/settingsIcons/roleManagmrnt";
import SystemUser from "../../HemeIconLibrary/settingsIcons/systemUser";
import LocationPurple from "../../HemeIconLibrary/settingsIcons/locationPurple";
import ImportIcon from "../../HemeIconLibrary/settingsIcons/import";
import UserPurple from "../../HemeIconLibrary/settingsIcons/userPurple";
import { Import } from "../../HemeIconLibrary";
// import AddRole from "./RoleManagmentList/addRole";
// Utils
import HemaHeadingWithSubText from "../../utils/HemaHeadingWithSubText";
import { Button, Alert } from "../../utils";
import { getFullName } from "./Utils";

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
} from "../../Actions/settings";
import { setForm, setFormCloseReducer, showSuccessReducer, editFormReducer, setFormLoaderReducer } from "../../Store/reducers/uiSettings";

// Components
import AllApproval from "./All";
import PendingUser from "./Pending";
import Approved from "./Approved";
import Rejected from "./Rejected";

const LightApproval = () => {
  const dispatch = useDispatch();
  const { uisettings, settings } = useSelector((state) => state);

  /* form states */
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [activeTab, setactiveTab] = useState("CompanyLocation");
  const [pageSub, setPageSub] = useState("Manage your green light approval here.");
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
      formData.append("userFile", payload.userFile);
      const resp = await createSystemUserUploadAction(formData);
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${getFullName(resp.data)} system user added.`));
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
      formData.append("userFile", payload.userFile);
      const resp = await createPortalUserUploadAction(formData);
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${getFullName(resp.data)} portal user added.`));
        getPortalUserAction();
      }
    });
  };

  const handleDownload = async (downloadType) => {
    if (downloadType === "SystemUser") {
      dispatch(setFormLoaderReducer(true));
      const resp = await getSystemUserDownloadAction();
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        //dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`File downloaded.`));
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "SystemUsers.xlsx");
        document.body.appendChild(link);
        link.click();
      }
    }
    if (downloadType === "PortalUser") {
      dispatch(setFormLoaderReducer(true));
      const resp = await getPortalUserDownloadAction();
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(showSuccessReducer(`File downloaded.`));

        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "PortalUsers.xlsx");
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
      <div className={`${editRole ? "hidden" : "block"}`}>
        <div className="flex gap-[10px] justify-between items-end">
          <HemaHeadingWithSubText heading="Green Light Approval" sub={pageSub} />

          {/* {activeTab === "CompanyLocation" ? (
            <div className="flex gap-[10px] ">
              <Button
                text="Add Company Location"
                Icon={<Add color="white" />}
                color="text-white"
                bg="bg-primary1"
                cta={() => {
                  setformName("Add Company Location");
                  setokBtnText("Create");
                  setokBtnIcon(<Add color="white" />);
                  setFormIcon(<LocationPurple />);
                  companyLocationField[0].initialValue = "";
                  companyLocationField[1].initialValue = "";
                  setUpdatedData(companyLocationField.slice(0, 2));
                  addCompanyLocation();
                  dispatch(setForm({ state: true, type: "additem" }));
                }}
              />
            </div>
          ) : activeTab === "SystemUser" ? (
            <div className="flex gap-[10px] ">
              <Button
                text="Bulk Import"
                Icon={<ImportIcon color="white" />}
                color="text-white"
                bg="bg-primary1"
                cta={() => {
                  setformName("Bulk Import");
                  setFormIcon(<Import />);
                  setokBtnText("Import");
                  setokBtnIcon(<ImportIcon color="white" />);
                  bulkFileImport[0].onClick = () => {
                    handleDownload("SystemUser");
                  };
                  setUpdatedData(bulkFileImport);
                  bulkImportSystemUser();
                  dispatch(setForm({ state: true, type: "additem" }));
                }}
              />
              <Button
                text="Add New User"
                Icon={<Add color="white" />}
                color="text-white"
                bg="bg-primary1"
                cta={() => {
                  setformName("Add New User");
                  setFormIcon(<UserPurple />);
                  setokBtnText("Create");
                  setokBtnIcon(<Add color="white" />);
                  createUserField[0].initialValue = "";
                  createUserField[1].initialValue = "";
                  createUserField[2].initialValue = "";
                  createUserField[2].disabled = false;
                  createUserField[3].initialValue = "";
                  createUserField[3].options = settings?.userRole;
                  createUserField[4].initialValue = true;
                  setUpdatedData(createUserField.slice(0, 5));

                  addSystemUser();
                  dispatch(setForm({ state: true, type: "additem" }));
                }}
              />
            </div>
          ) : activeTab === "PortalUser" ? (
            <div className="flex gap-[10px] ">
              <Button
                text="Bulk Import"
                Icon={<ImportIcon color="white" />}
                color="text-white"
                bg="bg-primary1"
                cta={() => {
                  setformName("Bulk Import");
                  setFormIcon(<Import />);
                  setokBtnText("Import");
                  setokBtnIcon(<ImportIcon color="white" />);
                  bulkFileImport[0].onClick = () => {
                    handleDownload("PortalUser");
                  };
                  setUpdatedData(bulkFileImport);
                  bulkImportPortalUser();
                  dispatch(setForm({ state: true, type: "additem" }));
                }}
              />
              <Button
                text="Add New User"
                Icon={<Add color="white" />}
                color="text-white"
                bg="bg-primary1"
                cta={() => {
                  setformName("Add New User");
                  setFormIcon(<UserPurple />);
                  setokBtnText("Create");
                  setokBtnIcon(<Add color="white" />);
                  addPortalUserFields[0].initialValue = "";
                  addPortalUserFields[1].initialValue = "";
                  addPortalUserFields[2].initialValue = "";
                  addPortalUserFields[2].disabled = false;
                  // addPortalUserFields[4].options = settings?.sites;
                  addPortalUserFields[4].initialValue = false;
                  addPortalUserFields[5].initialValue = settings?.sites?.map((site) => {
                    return { ...site, checked: false };
                  });
                  setUpdatedData(addPortalUserFields.slice(0, 6));
                  addPortalUser();
                  dispatch(setForm({ state: true, type: "additem" }));
                }}
              />
            </div>
          ) : (
            <div className="flex gap-[10px] ">
              <Button
                text="Add New Role"
                Icon={<Add color="white" />}
                color="text-white"
                bg="bg-primary1"
                cta={() => {
                  dispatch(editFormReducer(null));
                  setEditRole(true);
                }}
              />
            </div>
          )} */}
        </div>
        <Alert />
        <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
          <Tabs
            defaultActiveKey="CompanyLocation"
            id="uncontrolled-tab-example"
            className="mb-3 gap-[20px]"
            onSelect={(key) => {
              setactiveTab(key);
              if (key === "CompanyLocation") {
                setPageSub("Manage your green light approval here.");
              } else if (key === "SystemUser") {
                setPageSub("Manage your green light approval here.");
              } else if (key === "PortalUser") {
                setPageSub("Manage your green light approval here.");
              } else if (key === "RoleManagment") {
                setPageSub("Manage your green light approval here.");
              } else {
                setPageSub("");
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

      <div className={`${!editRole ? "hidden" : "block"}`}>{/* <AddRole setEditRole={setEditRole} /> */}</div>
    </>
  );
};

export default LightApproval;
