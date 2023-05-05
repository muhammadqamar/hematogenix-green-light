import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Dropdown } from 'react-bootstrap';
import {
  HemaHeadingWithSubText,
  Button,
  HemaLabel,
  Pagination,
  HemaValue,
} from '../../utils';
import { setType, setActiveSite } from '../../Store/reducers/orders';
import { Add, ActionEye } from '../../HemeIconLibrary';
import { sortedData } from '../../helpers/sort';
import { editFormReducer } from '../../Store/reducers/uiSettings';
import { getOrderDetailAction } from '../../Actions/order';
import { useDispatch } from 'react-redux';
const RequestTable = ({ data, setShowDashboard }) => {
  const [orderDetail, setOrderDetial] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setOrderDetial(data);
  }, [data]);
  const customStyles = {
    headCells: {
      style: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        color: '#000000',
      },
    },
    responsiveWrapper: {
      style: { overflow: 'visible !important' },
    },
  };

  return (
    <div className="w-full h-auto bg-white ">
      <div className="w-full flex items-center justify-between px-4 pt-4 pb-[10px] border-[#DEE2E6] border-b-[1px]">
        <HemaHeadingWithSubText
          HeadingFontSize="16px"
          HeadingLineHeight="24px"
          heading="Request Queue"
        />

        <Dropdown className="hemato-dropdown-btn">
          <Dropdown.Toggle variant="" id="dropdown-basic">
            <Add color="#ffffff" /> Create Kit Request
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setShowDashboard(false);
                dispatch(editFormReducer());
                dispatch(setType(1));
              }}
            >
              Controlled Kit Request
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setShowDashboard(false);
                dispatch(editFormReducer());
                dispatch(setType(2));
              }}
            >
              Uncontrolled Kit Request
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* table */}

      <DataTable
        pagination
        customStyles={customStyles}
        data={orderDetail || []}
        columns={[
          {
            name: 'Order ID',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer ">
                  <HemaLabel textSize="12px" color="#595959" text={row?.id} />
                </div>
              );
            },
            sortId: 'id',
            sortable: true,
          },
          {
            name: 'Control Name',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer ">
                  <HemaLabel
                    textSize="12px"
                    color="#595959"
                    text={row?.orderType?.name}
                  />
                </div>
              );
            },
            sortId: 'orderType.name',
            sortable: true,
          },
          {
            name: 'Sponsor',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer ">
                  <HemaLabel
                    textSize="12px"
                    color="#595959"
                    text={row?.sponsor?.name}
                  />
                </div>
              );
            },
            sortable: true,
            sortId: 'id',
          },
          {
            name: 'Study Number',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer ">
                  <HemaLabel
                    textSize="12px"
                    color="#595959"
                    text={row?.study?.name}
                  />
                </div>
              );
            },
            sortable: true,
            sortId: 'study.name',
          },
          {
            name: 'Site Code',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer ">
                  <HemaLabel
                    textSize="12px"
                    color="#595959"
                    text={row?.site?.name}
                  />
                </div>
              );
            },
            sortable: true,
            sortId: 'site.name',
          },
          {
            name: 'Needed by Date',
            cell: (row, index) => {
              return (
                <div className="block items-center gap-[10px] w-full cursor-pointer ">
                  <HemaLabel
                    textSize="12px"
                    color="#595959"
                    text={row?.neededDate}
                  />
                </div>
              );
            },
            sortable: true,
            sortId: 'neededDate',
          },
          {
            name: 'Status',
            cell: (row, index) => {
              return (
                <div className="flex items-center w-full gap-1 cursor-pointer ">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      (row?.status?.name === 'New' && 'bg-[#06B6D4]') ||
                      (row?.status?.name === 'In Process' && 'bg-[#F97316]') ||
                      (row?.status?.name === 'Shipped' && 'bg-[#C92286]') ||
                      (row?.status?.name === 'Completed' && 'bg-[#065528]')
                    }`}
                  />

                  <HemaValue
                    className="text-[12px] leading-[18px]"
                    color={
                      (row?.status?.name === 'New' && 'text-[#06B6D4]') ||
                      (row?.status?.name === 'In Process' &&
                        'text-[#F97316]') ||
                      (row?.status?.name === 'Shipped' && 'text-[#C92286]') ||
                      (row?.status?.name === 'Completed' && 'text-[#065528]')
                    }
                    text={row?.status?.name}
                  />
                </div>
              );
            },
            sortable: true,
            sortId: 'status.name',
          },
          {
            name: 'Actions',

            cell: (row, index) => {
              return (
                <div className="ml-auto cursor-pointer ">
                  <Button
                    Icon={<ActionEye />}
                    color="text-white"
                    bg="bg-bgActionDots"
                    cta={async () => {
                      // dispatch(editFormReducer(row));
                      await getOrderDetailAction(row.id);
                      setShowDashboard(false);
                      dispatch(setType(row?.orderType?.id));

                      // setformName('Inventory Management');
                      // setFormIcon(<CreateItemPurple />);
                      // setokBtnText('Save');
                      // setCancelBtnText('Cancel');
                      // ScreeningKitBuild[1].initialValue = 5;

                      // setUpdatedData(ScreeningKitBuild);
                      // //  addInventoryCTA();
                      // dispatch(
                      //   setForm({
                      //     state: true,
                      //     type: 'build-screening-kit',
                      //   }),
                      // );
                    }}
                  />
                </div>
              );
            },
          },
        ]}
        onSort={(row, direction, sorted) => {
          setOrderDetial(sortedData(row.sortId, direction, sorted));
        }}
        paginationComponent={(e) => {
          return <Pagination e={e} />;
        }}
      />
    </div>
  );
};

export default RequestTable;
