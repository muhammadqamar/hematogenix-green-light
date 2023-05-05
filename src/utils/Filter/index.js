import { useEffect, useState } from 'react';
import { getFullName } from '../../pages/Settings/Utils';
import { useDispatch } from 'react-redux';
import { Filter } from '../../HemeIconLibrary';
import './style.scss';

const FilterColumn = (props) => {
  const dispatch = useDispatch();
  const {
    options,
    columnName,
    type,
    boolTrueText,
    boolFalseText,
    setRedux,
    reduxValues,
  } = props;
  const [allChecks, setAllChecks] = useState([]);
  const [show, setShow] = useState();

  return (
    <div>
      <div className=" cursor-pointer my-[10px] flex  w-[220px] justify-between border border-[#ccc] rounded-[5px] py-[5px] px-[10px] items-center">
        <div
          className=" flex  gap-[10px]  items-center"
          onClick={() => {
            setShow(!show);
          }}
        >
          <Filter />

          <div className="text-[12px] flex items-center">
            Filter &nbsp;
            {!!allChecks.length && (
              <span className="flex">
                ( &nbsp;
                <span className="overflow-hidden inline-block whitespace-nowrap text-ellipsis max-w-[80px]">
                  {allChecks[0] === true
                    ? boolTrueText
                    : allChecks[0] === false
                    ? boolFalseText
                    : allChecks[0]}
                </span>
                &nbsp; ) &nbsp;
                {allChecks.length > 1 && '+ ' + String(allChecks.length - 1)}{' '}
              </span>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            setAllChecks([]);
            dispatch(setRedux({ ...reduxValues, [columnName]: [] }));
          }}
        >
          {!!allChecks.length && 'x'}
        </div>
      </div>
      <div
        className={`${
          show ? 'block' : 'hidden'
        } max-h-[320px] overflow-y-auto overflow-x-hidden absolute w-[220px] bg-white p-[10px] mt-[px] z-[5] border border-[#ccc] rounded-[5px] top-10`}
      >
        {options?.map((val) => {
          return (
            <div
              key={val}
              className="pb-[7px] "
              onClick={(e) => {
                if (allChecks.includes(val)) {
                  if (type === 'boolean') {
                    setAllChecks(
                      allChecks.filter((data) => (data !== val ? true : false))
                    );
                  } else {
                    setAllChecks(allChecks.filter((data) => data !== val));
                  }
                  dispatch(
                    setRedux({
                      ...reduxValues,
                      [columnName]: reduxValues[columnName].filter(
                        (data) => data !== val
                      ),
                    })
                  );
                } else {
                  if (type === 'boolean') {
                    setAllChecks([...allChecks, !!val]);
                  } else {
                    setAllChecks([...allChecks, val]);
                  }
                  if (reduxValues[columnName]) {
                    dispatch(
                      setRedux({
                        ...reduxValues,
                        [columnName]: [...reduxValues[columnName], val],
                      })
                    );
                  } else {
                    dispatch(setRedux({ ...reduxValues, [columnName]: [val] }));
                  }
                }
              }}
            >
              <div className="flex items-center gap-[10px] whitesapce-pre-wrap">
                <input type="checkbox" checked={allChecks.includes(val)} />
                <span className="">
                  {type === 'boolean'
                    ? val
                      ? boolTrueText
                      : boolFalseText
                    : val}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default FilterColumn;
