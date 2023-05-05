import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';

import { sortedData } from '../helpers/sort';
import HemaHeadingWithSubText from '../utils/HemaHeadingWithSubText';
import { Button, FormSearch, Alert } from '../utils';
import { Add, CreateSite, Edit, ExpiryAlertPurple, SearchColor } from '../HemeIconLibrary';
import FormContainer from '../components/Formik/formContainer';
import { setForm, editFormReducer, showSuccessReducer, setFormLoaderReducer, setFormCloseReducer } from '../Store/reducers/uiSettings';
import { getCountriesLogisticBuilder } from '../Actions/logistic';
import { getAllStudyAction } from '../Actions/study';
import { createNewSite } from '../components/Formik/AllForms/addNewSite';
import createNewItemValidator from '../components/Formik/allFormValidation/createItem';
import { SiteManagementColumns } from '../components/Tables';
import { getAllSiteAction, createNewSiteAction, updateSiteAction } from '../Actions/siteManagment';

const SiteManagement = () => {
  const dispatch = useDispatch();
  const { uisettings, studies, sites, common } = useSelector((state) => state);

  /* form states */
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [searchQuery, setsearchQuery] = useState('');
  const [filteredData, setfilteredData] = useState([]);
  //callallEnventoryRequiredAPI
  useEffect(() => {
    (async () => {
      getAllStudyAction();
      getAllSiteAction();
      getCountriesLogisticBuilder();
    })();
  }, []);

  // CTA item add
  const addSiteCTA = (edit) => {
    setCTA(() => async (data) => {
      const sitePayload = {
        siteCode: data?.siteCode,
        name: data?.name,
        studyId: data?.studyId,
        isActive: data?.isActive,
        principalInvestigator: {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email || '',
          personnelTypeId: 2,
          phone: data?.phone || '',
          fax: data?.fax || '',
          institutionName: data?.institutionName || '',
          department: data?.department || '',
          address: {
            address1: data?.address1,
            address2: data?.address2 || '',
            city: data?.city,
            stateProvince: data?.stateProvince || '',
            postalCode: data?.postalCode || '',
            countryId: data?.countryId,
          },
        },
      };
      if (edit) {
        dispatch(setFormLoaderReducer(true));
        const editSponser = await updateSiteAction(edit, sitePayload);
        dispatch(setFormLoaderReducer(false));
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${editSponser.data.name} Site updated.`));
      } else {
        dispatch(setFormLoaderReducer(true));
        const createdSponser = await createNewSiteAction(sitePayload);
        if (createdSponser?.data?.id) {
          dispatch(setFormCloseReducer());
          dispatch(showSuccessReducer(`${createdSponser.data.name} Site added.`));
        }
        dispatch(setFormLoaderReducer(false));
      }
    });
    setFormValidation((error, values) => (error, values) => {
      createNewItemValidator(error, values);
    });
  };

  // CTA for inventory for selected item
  // filter and search
  useEffect(() => {
    const regex = new RegExp(searchQuery, 'i');
    (async () => {
      if (searchQuery) {
        const data = sites?.allSites?.filter((obj) => {
          for (const key in obj) {
            if (regex.test(obj[key])) {
              return true;
            }
            if (key === 'sponsor' || key === 'study' || key === 'principalInvestigator') {
              const childObj = obj[key];
              for (const k in childObj) {
                if (regex.test(childObj[k])) {
                  return true;
                }
                // return false;
              }
            }
          }
          return false;
        });
        setfilteredData(data);
      } else {
        setfilteredData(sites?.allSites);
      }
    })();
  }, [searchQuery, sites?.allSites]);
  return (
    <>
      <div className="flex gap-[10px] justify-between items-end">
        <HemaHeadingWithSubText heading="Site Management" sub="Manage your site here." />
        <div className="flex gap-[10px] ">
          <Button
            text="Create New Site"
            Icon={<Add color="white" />}
            color="text-white"
            bg="bg-primary1"
            cta={() => {
              setformName('Create Site');
              createNewSite[0].options = studies?.allStudies?.filter((site) => site.isActive === true);
              createNewSite[0].disabled = false;
              createNewSite[1].initialValue = '';
              createNewSite[2].initialValue = '';
              createNewSite[3].initialValue = '';
              createNewSite[4].initialValue = '';
              createNewSite[5].initialValue = '';
              createNewSite[6].initialValue = '';
              createNewSite[6].placeholder = 'Select country';
              createNewSite[6].options = common?.allCountries;
              createNewSite[7].initialValue = '';
              createNewSite[9].initialValue = '';
              createNewSite[10].initialValue = '';
              createNewSite[11].initialValue = '';
              createNewSite[12].initialValue = '';
              setFormIcon(<CreateSite />);
              setUpdatedData(createNewSite?.filter((item) => item.name !== 'changeReason'));
              addSiteCTA();
              dispatch(setForm({ state: true, type: 'create-site' }));
            }}
          />
        </div>
      </div>

      <Alert />
      <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
        <>
          <FormSearch w="w-[400px]" searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
          {sites?.allSites ? (
            filteredData?.length > 0 ? (
              <DataTable
                data={filteredData}
                columns={[
                  ...SiteManagementColumns,
                  {
                    name: 'Actions',
                    cell: (row) => {
                      return (
                        <div className="flex-grow four">
                          <div className="flex justify-end gap-[5px] meta">
                            <Button
                              Icon={<Edit />}
                              color="text-white"
                              bg="bg-bgActionDots"
                              cta={() => {
                                createNewSite[0].initialValue = row?.study?.id;
                                createNewSite[0].placeholder = row?.study?.name;
                                createNewSite[0].disabled = true;
                                createNewSite[1].initialValue = row?.name;
                                createNewSite[2].initialValue = row?.siteCode;
                                createNewSite[3].initialValue = row?.principalInvestigator?.address?.address1;
                                createNewSite[4].initialValue = row?.principalInvestigator?.address?.city;
                                createNewSite[5].initialValue = row?.principalInvestigator?.address?.stateProvince;
                                createNewSite[6].placeholder = row?.principalInvestigator?.address?.country?.name;
                                createNewSite[6].initialValue = row?.principalInvestigator?.address?.country?.id;
                                createNewSite[6].options = common?.allCountries;
                                createNewSite[7].initialValue = row?.principalInvestigator?.address?.postalCode;
                                createNewSite[8].initialValue = row?.isActive;
                                createNewSite[9].initialValue = row?.principalInvestigator?.firstName;
                                createNewSite[10].initialValue = row?.principalInvestigator?.lastName;
                                createNewSite[11].initialValue = row?.principalInvestigator?.email;
                                setUpdatedData(createNewSite);
                                setformName('Edit Site');
                                setFormIcon(<ExpiryAlertPurple />);
                                dispatch(editFormReducer(row));
                                addSiteCTA(row?.id);
                                dispatch(setForm({ state: true, type: 'edit-site' }));
                              }}
                            />
                            <Button Icon={<SearchColor />} color="text-white" bg="bg-bgActionDots" cta={() => {}} />
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
                onSort={(row, direction, sorted) => {
                  setfilteredData(sortedData(row.sortId, direction, sorted));
                }}
              />
            ) : (
              <BootstrapAlert variant="warning" className="mt-3 text-center">
                No Site to show. Please add by clicking on Create New Site.
              </BootstrapAlert>
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
        </>
      </div>

      {uisettings?.openform && <FormContainer cta={CTA} formType={updatedData} formName={formName} Icon={formIcon} formValidation={formValidation} />}
    </>
  );
};

export default SiteManagement;
