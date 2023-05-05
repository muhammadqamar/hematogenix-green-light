import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import { filter } from 'smart-array-filter';
import { setSystemUsersFilter } from '../../../Store/reducers/settings';
import {
  Button,
  FormSearch,
  HemaValue,
  Pagination,
  FilterColumn,
} from '../../../utils';
import {
  AddInventory,
  DeleteInventory,
  DeletePurple,
  EditColor,
  SearchColor,
  ExpiryAlertPurple,
  EyeIcon,
} from '../../../HemeIconLibrary';
import eyeIcon from '../../../assets/images/eye.svg';
import { createUserField } from '../../../components/Formik/AllForms/addUserFields';
import { Remove } from '../../../components/Formik/AllForms/remove';
import { sortedData } from '../../../helpers/sort';
import {
  setForm,
  editFormReducer,
  setFormCloseReducer,
  showSuccessReducer,
  setFormLoaderReducer,
} from '../../../Store/reducers/uiSettings';



// Utils
import { getFullName } from '../Utils';

// assets

const Approved = ({
  setCTA,
  setformName,
  setFormIcon,
  setUpdatedData,
  setokBtnText,
  setokBtnIcon,
}) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state);
  const { systemUsers, systemUsersFilter } = settings;



  const [searchQuery, setsearchQuery] = useState('');
  const [dataList, setDataList] = useState(null);

  //search for location
  useEffect(() => {
    (async () => {
      if (searchQuery) {
        const filteredDataResult = filter(systemUsers, {
          keywords: searchQuery, // search for any field that contains the "Do" string

          caseSensitive: false,
        });
        setDataList(filteredDataResult);
      } else {
        setDataList(systemUsers);
      }
    })();
  }, [searchQuery, systemUsers]);



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

  useEffect(() => {
    if (Object.keys(systemUsersFilter)?.length) {
      const filterResult = systemUsers?.filter((port) => {
        if (
          (systemUsersFilter.email?.length
            ? systemUsersFilter.email.includes(port.email)
            : true) &&
          (systemUsersFilter.isActive?.length
            ? systemUsersFilter.isActive?.includes(port.isActive)
            : true) &&
          (systemUsersFilter.firstName?.length
            ? systemUsersFilter.firstName?.includes(getFullName(port))
            : true) &&
          (systemUsersFilter.role?.length
            ? systemUsersFilter.role?.includes(port.role.name)
            : true)
        ) {
          return true;
        } else {
          return false;
        }
      });
      setDataList(filterResult);
    } else {
      setDataList(systemUsers);
    }
  }, [JSON.stringify(systemUsersFilter)]);
  return (
    <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
      <>
        <FormSearch
          w="w-[400px]"
          searchQuery={searchQuery}
          setsearchQuery={setsearchQuery}
        />
        {!dataList ? (
          <SkelatonCoponent />
        ) : dataList?.length > 0 || Object.keys(systemUsersFilter)?.length ? (
          <DataTable
            data={[{}, ...dataList]}
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
                    text={'Order Confirmation Number'}
                    className="font-normal text-[#000000]"
                  />
                ),
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                        columnName="firstName"
                        secondColumnName="lastName"
                        setRedux={setSystemUsersFilter}
                        reduxValues={systemUsersFilter || []}
                        options={Array.from(
                          new Set(
                            systemUsers.map((filter) => getFullName(filter))
                          )
                        )}
                      />
                    ) : (
                      <HemaValue text={getFullName(row)} />
                    )}
                  </>
                ),
                sortId: 'firstName',
              },
              {
                name: (
                  <HemaValue
                    text={'Sponsor'}
                    className="font-normal text-[#000000]"
                  />
                ),
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                        columnName="email"
                        setRedux={setSystemUsersFilter}
                        reduxValues={systemUsersFilter || []}
                        options={Array.from(
                          new Set(systemUsers.map((filter) => filter.email))
                        )}
                      />
                    ) : (
                      <HemaValue text={row.email} />
                    )}
                  </>
                ),
                sortId: 'email',
              },
              {
                name: (
                  <HemaValue
                    text={'Study Number'}
                    className="font-normal text-[#000000]"
                  />
                ),
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                        columnName="role"
                        setRedux={setSystemUsersFilter}
                        reduxValues={systemUsersFilter || []}
                        options={Array.from(
                          new Set(
                            systemUsers.map((filter) => filter.role?.name)
                          )
                        )}
                      />
                    ) : (
                      <HemaValue text={row.role?.name} />
                    )}
                  </>
                ),
                sortId: 'role.name',
              },
              {
                name: (
                  <HemaValue
                    text={'Site Code'}
                    className="font-normal text-[#000000]"
                  />
                ),
                sortable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                        columnName="isActive"
                        type="boolean"
                        boolTrueText="Active"
                        boolFalseText="In-Active"
                        setRedux={setSystemUsersFilter}
                        reduxValues={systemUsersFilter || []}
                        options={Array.from(
                          new Set(systemUsers.map((filter) => filter.isActive))
                        )}
                      />
                    ) : (
                      <HemaValue
                        text={row.isActive ? '• Active' : '• In-Active'}
                        color={row.isActive ? 'text-[#16a34a]' : 'text-black'}
                      />
                    )}
                  </>
                ),
                sortId: 'isActive',
              },
              {
                name: 'Actions',
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
                            Remove[0].label = 'User Name';
                            Remove[0].initialValue =
                              row?.firstName + row?.lastName;
                            setUpdatedData(Remove);
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
            pagination
            onSort={(row, direction, sorted) => {
              setDataList(
                sortedData(row.sortId, direction, sorted)?.filter(
                  (data) => Object.keys(data)?.length
                )
              );
            }}
            paginationComponent={(e) => {
              return <Pagination e={e} />;
            }}
          />
        ) : (
          <BootstrapAlert variant="warning" className="mt-3 text-center">
            No System User to show. Please add by clicking on Add New User.
          </BootstrapAlert>
        )}
      </>
    </div>
  );
};

export default Approved;
