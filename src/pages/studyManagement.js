import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';

import HemaHeadingWithSubText from '../utils/HemaHeadingWithSubText';
import { Button, FormSearch, Alert, Pagination } from '../utils';
import { Add, Edit, ExpiryAlertPurple, CreateSite, SearchColor } from '../HemeIconLibrary';
import FormContainer from '../components/Formik/formContainer';
import { setForm, editFormReducer, showSuccessReducer, setFormLoaderReducer, setFormCloseReducer } from '../Store/reducers/uiSettings';
import { sortedData } from '../helpers/sort';
import { getAllStudyAction, createNewStudyAction, updateStudyAction } from '../Actions/study';
import { createNewStudy } from '../components/Formik/AllForms/createNewStudy';
import createNewItemValidator from '../components/Formik/allFormValidation/createItem';
import { StudyManagementColumns } from '../components/Tables';
import { getAllSponserAction } from '../Actions/sponsers';

const StudyManagement = () => {
  const dispatch = useDispatch();
  const { uisettings, sponsers, studies } = useSelector((state) => state);

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
      getAllSponserAction();
      getAllStudyAction();
    })();
  }, []);

  // control item thresold switch
  // useEffect(() => {
  //   createNewStudy[2].disabled = !common.switch.threshold;
  // }, [common.switch.threshold]);

  // CTA item add
  const addStudyCTA = (edit) => {
    setCTA(() => async (data) => {
      const fildata = {
        ...data,
        logisticOrchestratorStatus: data.logisticOrchestratorStatus === undefined ? false : data.logisticOrchestratorStatus,
        nameAlias: data.nameAlias === undefined ? '' : data.nameAlias,
        studyCodeAlias: data.studyCodeAlias === undefined ? '' : data.studyCodeAlias,
      };
      if (edit) {
        dispatch(setFormLoaderReducer(true));
        const editSponser = await updateStudyAction(edit, { ...fildata, changeReason: fildata.changeReason.trim() });
        dispatch(setFormLoaderReducer(false));
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${editSponser.data.name} Study updated.`));
      } else {
        dispatch(setFormLoaderReducer(true));
        const createdSponser = await createNewStudyAction(fildata);
        if (createdSponser?.data?.id) {
          dispatch(setFormCloseReducer());
          dispatch(showSuccessReducer(`${createdSponser.data.name} Study added.`));
        }
        dispatch(setFormLoaderReducer(false));
      }
    });
    setFormValidation((error, values) => (errors, values) => {
      createNewItemValidator(errors, values);
      if (values?.nameAlias?.length > 50) {
        errors.nameAlias = 'max 50 character allowed';
      }
      if (values?.studyCodeAlias?.length > 50) {
        errors.studyCodeAlias = 'max 50 character allowed';
      }
    });
  };

  // CTA for inventory for selected item
  // filter and search

  useEffect(() => {
    const regex = new RegExp(searchQuery, 'i');
    (async () => {
      if (searchQuery) {
        const data = studies?.allStudies?.filter((obj) => {
          for (const key in obj) {
            if (regex.test(obj[key])) {
              return true;
            }
            if (key === 'sponsor') {
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
        setfilteredData(studies?.allStudies);
      }
    })();
  }, [searchQuery, studies?.allStudies]);
  return (
    <>
      <div className="flex gap-[10px] justify-between items-end">
        <HemaHeadingWithSubText heading="Study Management" sub="Manage your study here." />
        <div className="flex gap-[10px] ">
          <Button
            text="Create New Study"
            Icon={<Add color="white" />}
            color="text-white"
            bg="bg-primary1"
            cta={() => {
              setformName('Create Study');
              createNewStudy[0].options = sponsers?.allSponsers?.filter((sponsor) => sponsor.isActive === true);
              createNewStudy[0].disabled = false;
              createNewStudy[1].initialValue = '';
              createNewStudy[2].initialValue = '';
              createNewStudy[3].initialValue = '';
              createNewStudy[4].initialValue = '';
              setFormIcon(<CreateSite />);
              setUpdatedData(createNewStudy?.filter((item) => item.name !== 'changeReason'));
              addStudyCTA();
              dispatch(setForm({ state: true, type: 'create-Study' }));
            }}
          />
        </div>
      </div>

      <Alert />
      <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
        <>
          <FormSearch w="w-[400px]" searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
          {studies?.allStudies ? (
            filteredData?.length > 0 ? (
              <DataTable
                data={filteredData}
                columns={[
                  ...StudyManagementColumns,
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
                                createNewStudy[0].initialValue = row?.sponsor?.id;
                                createNewStudy[0].placeholder = row?.sponsor?.name;
                                createNewStudy[0].disabled = true;
                                createNewStudy[1].initialValue = row?.name;
                                createNewStudy[2].initialValue = row?.studyCode;
                                createNewStudy[3].initialValue = row?.nameAlias;
                                createNewStudy[4].initialValue = row?.studyCodeAlias;
                                createNewStudy[5].initialValue = row?.isActive;
                                createNewStudy[6].initialValue = row?.logisticOrchestratorStatus;
                                setUpdatedData(createNewStudy);
                                setformName('Edit Study');
                                setFormIcon(<ExpiryAlertPurple />);
                                dispatch(editFormReducer(row));
                                addStudyCTA(row?.id);
                                dispatch(setForm({ state: true, type: 'edit-study' }));
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
                paginationComponent={(e) => {
                  console.log(e);
                  return <Pagination e={e} />;
                }}
              />
            ) : (
              <BootstrapAlert variant="warning" className="mt-3 text-center">
                No Study to show. Please add by clicking on Create New.
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

export default StudyManagement;
