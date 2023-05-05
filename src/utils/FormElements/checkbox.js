import React from 'react';

const FormCheckbox = (props) => {
  return <input {...props} className={`${props.className} border-solid p-[9px] font-medium text-[12px] leading-[15px] border rounded-[5px]`} />;
};
export default FormCheckbox;
