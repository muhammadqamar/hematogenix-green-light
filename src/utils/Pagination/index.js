import React from 'react';
import { FormSelect } from '../../utils';
import {
  PaginationRightArrow,
  PaginationLeftArrow,
} from '../.././HemeIconLibrary';

const Pagination = (props) => {
  const { e } = props;

  return (
    <div className="flex items-center justify-between pagination-wrapper px-[10px] pt-[10px] border-t-[1px] border-solid border-[#DEE2E6] ">
      {e?.rowCount && (
        <div className="flex items-center gap-[8px]">
          <p className="font-semibold text-sm text-[#454545] m-0">showing</p>
          <FormSelect
            options={[
              { name: 10, id: 10 },
              { name: 20, id: 20 },
              { name: 30, id: 30 },
              { name: 'All', id: 'All' },
            ]}
            placeholder={e?.rowsPerPage}
            setFieldValue={(f, total) => {
              console.log(total);
              if (total === 'All') {
                e.onChangeRowsPerPage(e?.rowCount, 1);
              } else {
                e.onChangeRowsPerPage(total, 1);
              }
            }}
            className="w-[100px]"
          />
          <p className="font-semibold text-sm  text-[#454545] m-0">
            of {e?.rowCount} entries
          </p>
        </div>
      )}

      <div className="flex items-center gap-[8px]">
        <div
          className="cursor-pointer"
          onClick={() => {
            e.onChangePage(1, e?.rowsPerPage);
          }}
        >
          <PaginationLeftArrow />
        </div>
        <div className="flex items-center gap-[8px]">
          {[...Array(Math.ceil(e.rowCount / e?.rowsPerPage)).keys()].map(
            (numb) => {
              return (
                <div
                  className={`w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-[5px] font-normal text-[12px] leading-[18px]  cursor-pointer hover:bg-primary1 hover:text-[white]  ${
                    e.currentPage === numb + 1 && 'bg-primary1 text-[white]'
                  }`}
                  onClick={() => {
                    e.onChangePage(numb + 1, e?.rowsPerPage);
                  }}
                >
                  {numb + 1}
                </div>
              );
            }
          )}
        </div>
        <div
          className="cursor-pointer "
          onClick={() => {
            e.onChangePage(
              Math.ceil(e.rowCount / e?.rowsPerPage),
              e?.rowsPerPage
            );
          }}
        >
          <PaginationRightArrow />
        </div>
      </div>
    </div>
  );
};
export default Pagination;
