import React from 'react';

import { HemaLabel, HemaValue } from '../../../utils';

const TableData = ({
  studyName,
  sponserName,
  studyCode,
  studyNameAlais,
  studyCodeAlais,
  tableHeading,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center flex-wrap gap-2">
        {tableHeading[0] && (
          <div className=" flex items-center gap-0">
            <HemaLabel className="w-[150px]" textSize="text-[14px]" text={tableHeading[0]} />
            <HemaValue className="min-w-[250px]" text={sponserName || 'NA'} />
          </div>
        )}
        {tableHeading[1] && (
          <div className="flex items-center gap-0">
            <HemaLabel className="w-[150px]" textSize="text-[14px]" text={tableHeading[1]} />
            {tableHeading[1] === 'Countires' ? (
              studyName?.map((c) => {
                return <HemaValue className="min-w-[100px]" text={c.name || 'NA'} />;
              })
            ) : (
              <HemaValue className="min-w-[250px]" text={studyName || 'NA'} />
            )}
          </div>
        )}
      </div>
      <div className="w-full flex items-center flex-wrap gap-2">
        {tableHeading[2] && (
          <div className="flex items-center gap-0">
            <HemaLabel className="w-[150px]" textSize="text-[14px]" text={tableHeading[2]} />
            <HemaValue className="min-w-[250px]" text={studyCode || 'NA'} />
          </div>
        )}
        {tableHeading[3] && (
          <div className="flex items-center gap-0">
            <HemaLabel className="w-[150px]" textSize="text-[14px]" text={tableHeading[3]} />
            <HemaValue className="min-w-[250px]" text={studyNameAlais || 'NA'} />
          </div>
        )}
      </div>
      {tableHeading[4] && (
        <div className="flex items-center gap-0">
          <HemaLabel className="w-[150px]" textSize="text-[14px]" text={tableHeading[4]} />
          <HemaValue className="min-w-[250px]" text={studyCodeAlais || 'NA'} />
        </div>
      )}
    </div>
  );
};

export default TableData;
