import React from 'react';
const Button = (props) => {
  const { text, Icon, color, bg, cta, border, disabled, className } = props;
  return (
    <button
      {...props}
      disabled={disabled ? true : false}
      onClick={() => {
        if (cta) {
          cta();
        }
      }}
      className={` ${border ? ` fit-content solid border ${border}` : 'fit-content'} ${
        disabled && 'opacity-30'
      } flex w-fit fit-content items-center ${className} ${bg} ${color} gap-[8px] rounded-[5px] ${
        text ? ' fit-content py-[11px] px-[20px]' : 'p-[8px]'
      }  fit-content text-[14px] leading-[17px] font-medium`}
    >
      {Icon}
      {text}
    </button>
  );
};
export default Button;
