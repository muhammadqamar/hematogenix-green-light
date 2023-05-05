import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import { filter } from 'smart-array-filter';

import { Button, FormSearch, HemaValue, Pagination, FilterColumn } from '../../../utils';
import { CopyColor } from '../../../HemeIconLibrary';
import deleteIcon from '../../../assets/images/deleteIcon.svg';
import editIcon from '../../../assets/images/editIcon.svg';
import { sortedData } from '../../../helpers/sort';
import { setForm, editFormReducer } from '../../../Store/reducers/uiSettings';

const RoleManagmentList = ({ setEditRole }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state);
  const { userRole } = settings;
  const [searchQuery, setsearchQuery] = useState('');
  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    (async () => {
      if (searchQuery) {
        const filteredDataResult = filter(userRole, {
          keywords: searchQuery, // search for any field that contains the "Do" string

          caseSensitive: false,
        });
        setDataList(filteredDataResult);
      } else {
        setDataList(userRole);
      }
    })();
  }, [searchQuery, userRole]);

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
        <FormSearch
          w="w-[400px]"
          searchQuery={searchQuery}
          setsearchQuery={setsearchQuery}
        />
        {!dataList ? (
          <SkelatonCoponent />
        ) : dataList?.length > 0 ? (
          <DataTable
            data={dataList}
            customStyles={{
              rows: {
                style: {
                  paddingRight: '20px',
                },
              },
            }}
            columns={[
              {
                name: (
                  <div>
                  <HemaValue
                    text={'Roles'}
                    className="font-normal text-[#000000]"
                  />

                  </div>
                ),
                sortable: true,

                selector: (row) => <HemaValue text={row?.name} />,
                sortId:"name",
              },

              {
                name: 'Actions',
                cell: (row) => {
                  return (
                    <div className="flex-grow four">
                      <div className="flex justify-end gap-[5px] meta">
                        <Button
                          Icon={<img src={editIcon} />}
                          padding={false}
                          color="text-[#dc2626]"
                          bg="bg-bgActionDots"
                          cta={async () => {
                            dispatch(editFormReducer(row));
                            dispatch(
                              setForm({ state: false, type: 'edit role' })
                            );
                            setEditRole(true);
                          }}
                        />
                        <Button
                          Icon={<CopyColor />}
                          padding={false}
                          color="text-[#dc2626]"
                          bg="bg-bgActionDots"
                          cta={async () => {
                            dispatch(editFormReducer(row));
                            dispatch(
                              setForm({ state: false, type: 'copy role' })
                            );
                            setEditRole(true);
                          }}
                        />

                        <Button
                          Icon={<img src={deleteIcon} />}
                          padding={false}
                          color="text-[#dc2626]"
                          bg="bg-bgActionDots"
                          cta={async () => {
                            dispatch(editFormReducer(row));
                            dispatch(
                              setForm({ state: false, type: 'delete role' })
                            );
                            setEditRole(true);
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
              setDataList(sortedData(row.sortId, direction, sorted));
            }}
            paginationComponent={(e) => {

              return (
                <Pagination e={e} />
              );
            }}
          />
        ) : (
          <BootstrapAlert variant="warning" className="mt-3 text-center">
            No Roles to show. Please add by clicking on Add New Role.
          </BootstrapAlert>
        )}
      </>
    </div>
  );
};

export default RoleManagmentList;
