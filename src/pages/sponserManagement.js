import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import DataTable from 'react-data-table-component';

import HemaHeadingWithSubText from '../utils/HemaHeadingWithSubText';
import { Button, FormSearch, Alert, Pagination, HemaValue, FilterColumn } from '../utils';
import { Add, CreateSite, Edit, SearchColor, ExpiryAlertPurple } from '../HemeIconLibrary';
import FormContainer from '../components/Formik/formContainer';
import { setForm, editFormReducer, setFormCloseReducer, showSuccessReducer, setFormLoaderReducer } from '../Store/reducers/uiSettings';
import { createNeSponserAction, getAllSponserAction, updateNewSponserAction } from '../Actions/sponsers';
import { setSponsorsFilter } from '../Store/reducers/sponser';
import { createNewSponser } from '../components/Formik/AllForms/createNewSponser';
import { SponserManagementColumns } from '../components/Tables';
import { sortedData } from '../helpers/sort';

const SponserManagement = () => {
  const dispatch = useDispatch();
  const { uisettings, sponsers, common } = useSelector((state) => state);
  const { sponsorFilter } = sponsers;
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
    })();
  }, []);

  // control item thresold switch
  useEffect(() => {
    createNewSponser[2].disabled = !common.switch.threshold;
  }, [common.switch.threshold]);

  // CTA item add
  const addSponserCTA = (edit) => {
    setCTA(() => async (data) => {
      if (edit) {
        dispatch(setFormLoaderReducer(true));
        const editSponser = await updateNewSponserAction(edit, { ...data, changeReason: data.changeReason.trim() });
        dispatch(setFormLoaderReducer(false));
        dispatch(showSuccessReducer(`${editSponser.data.name} Sponsor updated.`));
        dispatch(setFormCloseReducer());
      } else {
        dispatch(setFormLoaderReducer(true));
        const createdSponser = await createNeSponserAction({
          ...data,
          ChangeReason: '',
        });
        if (createdSponser?.data?.id) {
          dispatch(setFormCloseReducer());
          dispatch(showSuccessReducer(`${createdSponser.data.name} Sponsor added.`));
        }
        dispatch(setFormLoaderReducer(false));
      }
    });
    setFormValidation(() => (errors, values) => {
      if (values?.abbreviation?.length > 6) {
        errors.abbreviation = 'max 6 character allowed';
      }
    });
  };

  // CTA for inventory for selected item
  // filter and search
  useEffect(() => {
    const regex = new RegExp(searchQuery, 'i');
    (async () => {
      if (searchQuery) {
        const data = sponsers?.allSponsers?.filter((obj) => {
          for (const key in obj) {
            if (regex.test(obj[key])) {
              return true;
            }
          }
          return false;
        });
        setfilteredData(data);
      } else {
        setfilteredData(sponsers?.allSponsers);
      }
    })();
  }, [searchQuery, sponsers?.allSponsers]);

  // sponser filter
  useEffect(() => {
    if (Object.keys(sponsorFilter)?.length) {
      const filterResult = sponsers?.allSponsers?.filter((port) => {
        if (
          (sponsorFilter?.name?.length ? sponsorFilter?.name.includes(port.name) : true) &&
          (sponsorFilter?.abbreviation?.length ? sponsorFilter.abbreviation?.includes(port.abbreviation) : true) &&
          (sponsorFilter?.isActive?.length ? sponsorFilter.isActive?.includes(port.isActive) : true)
        ) {
          return true;
        } else {
          return false;
        }
      });
      setfilteredData(filterResult);
    } else {
      setfilteredData(sponsers?.allSponsers);
    }
  }, [JSON.stringify(sponsorFilter)]);

  return (
    <>
      <div className="flex gap-[10px] justify-between items-end">
        <HemaHeadingWithSubText heading="Sponsor Management" sub="Manage your sponsor here." />
        <div className="flex gap-[10px] ">
          <Button
            text="Create New Sponsor"
            Icon={<Add color="white" />}
            color="text-white"
            bg="bg-primary1"
            cta={() => {
              setformName('Create Sponsor');
              createNewSponser[0].initialValue = '';
              createNewSponser[1].initialValue = '';
              createNewSponser[2].initialValue = true;
              setFormIcon(<CreateSite />);
              setUpdatedData(createNewSponser?.filter((item) => item.name !== 'changeReason'));
              addSponserCTA();
              dispatch(setForm({ state: true, type: 'addSponser' }));
            }}
          />
        </div>
      </div>

      <Alert />
      <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
        <>
          <FormSearch w="w-[400px]" searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
          {sponsers?.allSponsers ? (
            filteredData?.length > 0 || Object.keys(sponsorFilter)?.length ? (
              <DataTable
                data={[{}, ...filteredData]}
                columns={[
                  {
                    name: <HemaValue text={'Sponsor Name'} className="font-normal text-[#000000]" />,
                    sortable: true,
                    selector: (row, index) => (
                      <>
                        {index === 0 ? (
                          <FilterColumn
                            columnName="name"
                            setRedux={setSponsorsFilter}
                            reduxValues={sponsorFilter || []}
                            options={Array.from(new Set(sponsers?.allSponsers.map((filter) => filter.name)))}
                          />
                        ) : (
                          <HemaValue text={row?.name} />
                        )}
                      </>
                    ),
                    sortId: 'name',
                  },
                  {
                    name: <HemaValue text={'Sponsor Abbreviation'} className="font-normal text-[#000000]" />,
                    sortable: true,
                    selector: (row, index) => (
                      <>
                        {index === 0 ? (
                          <FilterColumn
                            columnName="abbreviation"
                            setRedux={setSponsorsFilter}
                            reduxValues={sponsorFilter || []}
                            options={Array.from(new Set(sponsers?.allSponsers.map((filter) => filter.abbreviation)))}
                          />
                        ) : (
                          <HemaValue text={row?.abbreviation} />
                        )}
                      </>
                    ),
                    sortId: 'abbreviation',
                  },
                  {
                    name: <HemaValue text={'Active'} className="font-normal text-[#000000]" />,
                    sortable: true,
                    selector: (row) => <HemaValue text={row?.isActive ? 'Yes' : 'No'} />,
                    selector: (row, index) => (
                      <>
                        {index === 0 ? (
                          <FilterColumn
                            columnName="isActive"
                            type="boolean"
                            boolTrueText="Active"
                            boolFalseText="In-Active"
                            setRedux={setSponsorsFilter}
                            reduxValues={sponsorFilter || []}
                            options={Array.from(new Set(sponsers?.allSponsers.map((filter) => filter.isActive)))}
                          />
                        ) : (
                          <HemaValue text={row?.isActive ? 'Yes' : 'No'} />
                        )}
                      </>
                    ),
                    sortId: 'isActive',
                  },
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
                                createNewSponser[0].initialValue = row?.name;
                                createNewSponser[1].initialValue = row?.abbreviation;
                                createNewSponser[2].initialValue = row?.isActive;
                                setUpdatedData(createNewSponser);
                                setformName('Edit Sponsor');
                                setFormIcon(<ExpiryAlertPurple />);
                                dispatch(editFormReducer(row));
                                addSponserCTA(row?.id);
                                dispatch(setForm({ state: true, type: 'edit-sponser' }));
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
                  setfilteredData(sortedData(row.sortId, direction, sorted)?.filter((data) => Object.keys(data)?.length));
                }}
                paginationComponent={(e) => {
                  console.log(e);
                  return <Pagination e={e} />;
                }}
              />
            ) : (
              <BootstrapAlert variant="warning" className="mt-3 text-center">
                No Sponsors to show. Please add by clicking on Create New.
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

export default SponserManagement;
