import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert as BootstrapAlert } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Skeleton from "react-loading-skeleton";

import { Button, FormSearch, HemaValue, Pagination } from "../../../utils";
import { ExpiryAlertPurple, DeletePurple, Edit, DeleteColor, EditColor } from "../../../HemeIconLibrary";
import {sortedData} from "../../../helpers/sort"
import { companyLocationField } from "../../../components/Formik/AllForms/companyLocationField";
import { Remove } from "../../../components/Formik/AllForms/remove";
import {filter} from 'smart-array-filter'
import {
  setForm,
  editFormReducer,
  setFormCloseReducer,
  showSuccessReducer,
  setFormLoaderReducer,
} from "../../../Store/reducers/uiSettings";

// Actions
import {
  getCompanyLocationAction,
  updateCompanyLocationAction,
  deleteCompanyLocationAction,
} from "../../../Actions/settings";


const CompanyLocationPage = ({ setCTA, setformName, setFormIcon, setUpdatedData,setokBtnText,setokBtnIcon }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state);


  useEffect(() => {
    getCompanyLocationAction();
  }, []);

  const [searchQuery, setsearchQuery] = useState("");
  const [dataList, setDataList] = useState(null);

  //search for location
  useEffect(() => {

    (async () => {
      if (searchQuery) {
        const filteredDataResult = filter(settings?.companyLocations, {
          keywords: searchQuery, // search for any field that contains the "Do" string

          caseSensitive: false,
        });
        setDataList(filteredDataResult);
      } else {
        setDataList(settings?.companyLocations);
      }

    })();
  }, [searchQuery, settings?.companyLocations]);

  const editCompanyLocation = (row) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const payload = {
        name: data.name,
        iconName: data.itemCategoryId,
        changeReason: data.changeReason,
      };
      const resp = await updateCompanyLocationAction(row.id, payload);
      dispatch(setFormLoaderReducer(false));
      if (resp?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${row?.name} edited.`));
        getCompanyLocationAction();
      }
    });
  };

  const deleteCompanyLocation = (row) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const resp = await deleteCompanyLocationAction(row.id, data.change_reason);
      if (resp?.status === 200) {
        dispatch(showSuccessReducer(`${row.name} company location deleted.`));
        dispatch(setFormCloseReducer());
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

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
            columns={[
              {
                name: <HemaValue text={"Flag"} className="font-normal text-[#000000]" />,
                sortable: true,
                selector: (row) => (
                  <img
                    width={20}
                    height={20}
                    alt="United States"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${row.iconName}.svg`}
                  />
                ),
                sortId:"iconName"
              },
              {
                name: (
                  <HemaValue
                    text={"Company location"}
                    className="font-normal text-[#000000]"
                  />
                ),
                sortable: true,
                selector: (row) => <HemaValue text={row.name} />,
                sortId:"name"
              },
              {
                name: "Actions",
                cell: (row) => {
                  return (
                    <div className="flex-grow four">
                      <div className="flex justify-end gap-[5px] meta">
                        <Button
                         Icon={<Edit />}
                          color="text-white"
                          bg="bg-bgActionDots"
                          cta={() => {
                            dispatch(editFormReducer(row));
                            setformName("Edit Company Location");
                            setFormIcon(<ExpiryAlertPurple />);
                            setokBtnIcon()
                            setokBtnText('Update')
                            companyLocationField[0].initialValue = row.name;
                            companyLocationField[1].initialValue = row.iconName;
                            companyLocationField[1].value = row.iconName;

                            setUpdatedData(companyLocationField);
                            dispatch(
                              setForm({
                                state: true,
                                type: "create-document-language",
                              })
                            );
                            editCompanyLocation(row);
                          }}
                        />
                        <Button
                          Icon={<DeleteColor />}
                          color="text-white"
                          bg="bg-bgActionDots"
                          cta={() => {
                            dispatch(editFormReducer(row));
                            Remove[0].label = "Company Location";
                            Remove[0].initialValue = row?.name;
                            setUpdatedData(Remove);
                            setokBtnIcon()
                            setokBtnText('Confirm')
                            setformName("Delete Company Location");
                            setFormIcon(<DeletePurple />);
                            dispatch(
                              setForm({
                                state: true,
                                type: "deleteItem",
                              })
                            );
                            deleteCompanyLocation(row);
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
            No Company Location to show. Please add by clicking on Add Company Location.
          </BootstrapAlert>
        )}
      </>
    </div>
  );
};

export default CompanyLocationPage;
