import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert as BootstrapAlert } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Skeleton from "react-loading-skeleton";
import { filter } from "smart-array-filter";
import { setAllFilter } from "../../../Store/reducers/orders";
import { Button, FormSearch, HemaValue, Pagination, FilterColumn } from "../../../utils";

import binocularIcon from "../../../assets/images/binocular.svg";
import { getDetailRecordIdAction } from "../../../Action/order";
import { sortedData } from "../../../helpers/sort";

// Utils
import { getFullName } from "../Utils";

// assets

const All = ({ setShowDetial, data }) => {
  const dispatch = useDispatch();
  const { settings, orders } = useSelector((state) => state);
  const [searchQuery, setsearchQuery] = useState("");
  const [dataList, setDataList] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (data) {
      setDataList(data || []);
    }
  }, [data]);

  // Search Green light ...
  useEffect(() => {
    const searchdataList = dataList?.filter((item) => item?.shipment?.sponsor?.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResult(searchdataList);
  }, [dataList, searchQuery]);

  //search for location
  // useEffect(() => {
  //   (async () => {
  //     if (searchQuery) {
  //       const filteredDataResult = filter(systemUsers, {
  //         keywords: searchQuery, // search for any field that contains the "Do" string

  //         caseSensitive: false,
  //       });
  //       setDataList(filteredDataResult);
  //     } else {
  //       setDataList(orders.allOrders);
  //     }
  //   })();
  // }, [searchQuery, orders.allOrders]);

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

  // useEffect(() => {
  //   if (Object.keys(systemUsersFilter)?.length) {
  //     const filterResult = systemUsers?.filter((port) => {
  //       if (
  //         (systemUsersFilter.email?.length
  //           ? systemUsersFilter.email.includes(port.email)
  //           : true) &&
  //         (systemUsersFilter.isActive?.length
  //           ? systemUsersFilter.isActive?.includes(port.isActive)
  //           : true) &&
  //         (systemUsersFilter.firstName?.length
  //           ? systemUsersFilter.firstName?.includes(getFullName(port))
  //           : true) &&
  //         (systemUsersFilter.role?.length
  //           ? systemUsersFilter.role?.includes(port.role.name)
  //           : true)
  //       ) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //     setDataList(filterResult);
  //   } else {
  //    // setDataList(systemUsers);
  //   }
  // }, [JSON.stringify(systemUsersFilter)]);
  return (
    <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
      <>
        <FormSearch w="w-[400px]" searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
        {!searchResult ? (
          <SkelatonCoponent />
        ) : searchResult?.length > 0 ? (
          <DataTable
            data={[{}, ...searchResult]}
            customStyles={{
              rows: {
                style: {
                  paddingRight: "20px",
                  style: { overflow: "visible !important" },
                },
              },

              cells: {
                style: { overflow: "visible !important" },
              },

              responsiveWrapper: {
                style: { overflow: "visible !important" },
              },
            }}
            columns={[
              {
                name: <HemaValue text={"Order Confirmation Number"} className="font-normal text-[#000000]" />,
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                      // columnName="firstName"
                      // secondColumnName="lastName"
                      // setRedux={setAllFilter}
                      // reduxValues={systemUsersFilter || []}
                      // options={Array.from(
                      //   new Set(
                      //     systemUsers?.map((filter) => getFullName(filter))
                      //   )
                      // )}
                      />
                    ) : (
                      <HemaValue text={row?.shipment?.order?.orderCode} />
                    )}
                  </>
                ),
                sortId: "firstName",
              },
              {
                name: <HemaValue text={"Sponsor"} className="font-normal text-[#000000]" />,
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                      // columnName="email"
                      // setRedux={setAllFilter}
                      // reduxValues={systemUsersFilter || []}
                      // options={Array.from(
                      //   new Set(systemUsers?.map((filter) => filter.email))
                      // )}
                      />
                    ) : (
                      <HemaValue text={row?.shipment?.sponsor?.name} />
                    )}
                  </>
                ),
                sortId: "email",
              },
              {
                name: <HemaValue text={"Study Name"} className="font-normal text-[#000000]" />,
                sortable: true,
                filterable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                      // columnName="role"
                      // setRedux={setAllFilter}
                      // reduxValues={systemUsersFilter || []}
                      // options={Array.from(
                      //   new Set(
                      //     systemUsers?.map((filter) => filter.role?.name)
                      //   )
                      // )}
                      />
                    ) : (
                      <HemaValue text={row?.shipment?.studyName} />
                    )}
                  </>
                ),
                sortId: "role.name",
              },
              {
                name: <HemaValue text={"Study Code"} className="font-normal text-[#000000]" />,
                sortable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                      // columnName="isActive"
                      // type="boolean"
                      // boolTrueText="Active"
                      // boolFalseText="In-Active"
                      // setRedux={setAllFilter}
                      // reduxValues={systemUsersFilter || []}
                      // options={Array.from(
                      //   new Set(systemUsers?.map((filter) => filter.isActive))
                      // )}
                      />
                    ) : (
                      <HemaValue text={row.shipment?.studyCode} />
                    )}
                  </>
                ),
                sortId: "isActive",
              },
              {
                name: <HemaValue text={"Status"} className="font-normal text-[#000000]" />,
                sortable: true,
                selector: (row, index) => (
                  <>
                    {index === 0 ? (
                      <FilterColumn
                      // columnName="isActive"
                      // type="boolean"
                      // boolTrueText="Active"
                      // boolFalseText="In-Active"
                      // setRedux={setAllFilter}
                      // reduxValues={systemUsersFilter || []}
                      // options={Array.from(
                      //   new Set(systemUsers?.map((filter) => filter.isActive))
                      // )}
                      />
                    ) : (
                      <HemaValue text={row.status?.name} />
                    )}
                  </>
                ),
                sortId: "isActive",
              },
              {
                name: "Actions",
                selector: (row, index) =>
                  index === 0 ? (
                    <></>
                  ) : (
                    <div className="flex">
                      <div className="flex w-[100px] justify-end meta">
                        <Button
                          Icon={<img src={binocularIcon} alt="" />}
                          padding={false}
                          color="text-[#dc2626]"
                          bg="bg-bgActionDots"
                          cta={async () => {
                            const result = await getDetailRecordIdAction(row.id);
                            if (result.status === 200) {
                              setShowDetial(true);
                            }
                          }}
                        />
                      </div>
                    </div>
                  ),

                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
              },
            ]}
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
            No records available.
          </BootstrapAlert>
        )}
      </>
    </div>
  );
};

export default All;
