import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import { filter } from 'smart-array-filter';
import { Button, FormSearch, HemaValue, Pagination, FilterColumn } from '../../../utils';
import { ExpiryAlertPurple, DeletePurple } from '../../../HemeIconLibrary';
import deleteIcon from '../../../assets/images/deleteIcon.svg';
import editIcon from '../../../assets/images/editIcon.svg';
import searchIcon from '../../../assets/images/searchIcon.svg';
import { sortedData } from '../../../helpers/sort';
import { addPortalUserFields } from '../../../components/Formik/AllForms/addPortalUserFields';
import { Remove } from '../../../components/Formik/AllForms/remove';
import { setportalUsersFilter } from '../../../Store/reducers/settings';
import { setForm, editFormReducer, setFormCloseReducer, showSuccessReducer, setFormLoaderReducer } from '../../../Store/reducers/uiSettings';

// Actions
import { getPortalUserAction, getPortalUserByIdAction, updatePortalUserAction, deletePortalUserAction } from '../../../Actions/settings';

// Utils
import { getFullName } from '../Utils';

const SystemUserList = ({ sites, setCTA, setformName, setFormIcon, setUpdatedData, setokBtnIcon, setokBtnText }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state);
  const { isLoading, portalUsers, portalUsersFilter } = settings;

  useEffect(() => {
    getPortalUserAction();
  }, []);

  const [searchQuery, setsearchQuery] = useState('');
  const [dataList, setDataList] = useState(null);

  //senpnarch for location
  useEffect(() => {
    (async () => {
      if (searchQuery) {
        const filteredDataResult = filter(portalUsers, {
          keywords: searchQuery, // search for any field that contains the "Do" string

          caseSensitive: false,
        });
        setDataList(filteredDataResult);
      } else {
        setDataList(portalUsers);
      }
    })();
  }, [searchQuery, portalUsers]);

  const editSystemUser = (row) => {
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
      const resp = await updatePortalUserAction(row.id, filterpayload);
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`User updated.`));
        getPortalUserAction();
      }
    });
  };

  const deleteSystemUser = (row) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const resp = await deletePortalUserAction(row.id, data.change_reason);
      if (resp?.status === 200) {
        dispatch(showSuccessReducer(`User deleted.`));
        dispatch(setFormCloseReducer());
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  useEffect(() => {
    if (Object.keys(portalUsersFilter)?.length) {
      const filterResult = portalUsers?.filter((port) => {
        if (
          (portalUsersFilter.email?.length ? portalUsersFilter.email.includes(port.email) : true) &&
          (portalUsersFilter.isActive?.length ? portalUsersFilter.isActive?.includes(port.isActive) : true) &&
          (portalUsersFilter.firstName?.length ? portalUsersFilter.firstName?.includes(getFullName(port)) : true)
        ) {
          return true;
        } else {
          return false;
        }
      });
      setDataList(filterResult);
    } else {
      setDataList(portalUsers);
    }
  }, [JSON.stringify(portalUsersFilter)]);

  const SkelatonCoponent = () => {
    return (
      <>
        <br />
        <Skeleton count={4} />
        <br />
        <Skeleton count={4} />
        <br />
        <Skeleton count={4} />
        <br />
      </>
    );
  };

  return (
    <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
      <>
        <FormSearch w="w-[400px]" searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
        {!dataList ? (
          <SkelatonCoponent />
        ) : dataList?.length > 0 || Object.keys(portalUsersFilter)?.length ? (
          <DataTable
            data={[{ showFilter: true }, ...dataList]}
            columns={[
              {
                name: (
                  <div className="relative flex">
                    <HemaValue text={'Name'} className="font-normal text-[#000000]" />
                  </div>
                ),
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                        columnName="firstName"
                        setRedux={setportalUsersFilter}
                        reduxValues={portalUsersFilter || []}
                        options={Array.from(new Set(portalUsers.map((filter) => getFullName(filter))))}
                      />
                    ) : (
                      <HemaValue text={getFullName(row)} />
                    )}
                  </>
                ),

                sortId: 'firstName',
              },
              {
                name: <HemaValue text={'Email'} className="font-normal text-[#000000]" />,
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {' '}
                    {index === 0 ? (
                      <FilterColumn
                        columnName="email"
                        setRedux={setportalUsersFilter}
                        reduxValues={portalUsersFilter || []}
                        options={Array.from(new Set(portalUsers.map((filter) => filter.email)))}
                      />
                    ) : (
                      <HemaValue text={row.email} />
                    )}
                  </>
                ),
                sortId: 'email',
              },
              {
                name: <HemaValue text={'Status'} className="font-normal text-[#000000]" />,
                sortable: true,
                sortId: 'isActive',
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                        columnName="isActive"
                        options={Array.from(new Set(portalUsers.map((filter) => filter.isActive)))}
                        setRedux={setportalUsersFilter}
                        reduxValues={portalUsersFilter || []}
                        type="boolean"
                        boolTrueText="Active"
                        boolFalseText="In-Active"
                      />
                    ) : (
                      <HemaValue text={row.isActive ? '• Active' : '• In-Active'} color={row.isActive ? 'text-[#16a34a]' : 'text-black'} />
                    )}
                  </>
                ),
              },
              {
                name: 'Actions',
                cell: (row) => {
                  return (
                    <div className="flex">
                      <div className="flex justify-end gap-[5px] meta">
                        <Button
                          Icon={<img src={editIcon} />}
                          padding={false}
                          color="text-[#dc2626]"
                          bg="bg-bgActionDots"
                          cta={async () => {
                            dispatch(editFormReducer(row));
                            setformName('Edit user');
                            setokBtnIcon();
                            setokBtnText('Update');
                            setFormIcon(<ExpiryAlertPurple />);
                            const resp = await getPortalUserByIdAction(row.id);
                            const selectedSites = resp.data;

                            addPortalUserFields[0].initialValue = row.firstName;
                            addPortalUserFields[1].initialValue = row.lastName;
                            addPortalUserFields[2].initialValue = row.email;
                            addPortalUserFields[2].disabled = true;
                            addPortalUserFields[3].initialValue = row.isActive;
                            addPortalUserFields[4].initialValue = row.isLocked;
                            const selectedEdit =
                              settings?.sites?.map((obj) => {
                                const found = selectedSites?.sites?.find((objSite) => objSite.site.id === obj.id);
                                return {
                                  ...obj,
                                  checked: found ? true : false,
                                };
                              }) || [];
                            addPortalUserFields[5].initialValue = selectedEdit;

                            setUpdatedData(addPortalUserFields);
                            dispatch(
                              setForm({
                                state: true,
                                type: 'create-document-language',
                              }),
                            );
                            editSystemUser(row);
                          }}
                        />
                        <Button Icon={<img src={searchIcon} />} padding={false} color="text-white" bg="bg-bgActionDots" />
                        <Button
                          Icon={<img src={deleteIcon} />}
                          padding={false}
                          color="text-[#dc2626]"
                          bg="bg-bgActionDots"
                          cta={() => {
                            dispatch(editFormReducer(row));
                            Remove[0].label = 'User Name';
                            Remove[0].initialValue = row?.firstName + row?.lastName;
                            setUpdatedData(Remove);
                            setokBtnIcon();
                            setokBtnText('Confirm');
                            setformName('Delete user');
                            setFormIcon(<DeletePurple />);
                            dispatch(
                              setForm({
                                state: true,
                                type: 'deleteItem',
                              }),
                            );
                            deleteSystemUser(row);
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
            pagination
            onSort={(row, direction, sorted) => {
              setDataList(sortedData(row.sortId, direction, sorted)?.filter((data) => Object.keys(data)?.length));
            }}
            paginationComponent={(e) => {
              return <Pagination e={e} />;
            }}
          />
        ) : (
          <BootstrapAlert variant="warning" className="mt-3 text-center">
            No Portal User to show. Please add by clicking on Add New User.
          </BootstrapAlert>
        )}
      </>
    </div>
  );
};

export default SystemUserList;
