import React from 'react';
import { useEffect } from 'react';

const FormText = (props) => {

  useEffect(() => {
    if (props.disabled && (props.name === 'options' || props.name === 'lowInventoryThreshold')) {
      props.setFieldValue(props.name, '');
    }
  }, [props.disabled]);
  const posRight = props.type === 'number' || props.type === 'date' ? 'right-[30px]' : 'right-[12px]';
  return (
    <div className="relative flex items-center justify-center w-full">
      <input {...props}  className={` w-full  border-solid p-[9px] pr-[30px] font-medium text-[12px] leading-[15px] border rounded-[5px]`} />
      {(props.crossIcon && !props?.disabled) && (
        <span onClick={() => props?.setFieldValue(props.name, '')} className={`absolute   top-[13px] ${posRight} cursor-pointer`}>
          {props.crossIcon}
        </span>
      )}
    </div>
  );
};
export default FormText;
