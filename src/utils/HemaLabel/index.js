import React from 'react';
import { Caret } from '../../HemeIconLibrary/caret';
const HemaLabel = (props) => {
  const {
    text,
    showCaret,
    required,
    Icon,
    color = 'black',
    className,
    textSize = 'text-[14px]',
    type,
  } = props;
  return type === 'heading-bar' ? (
    <label
      className={`flex gap-[4px] border-dashed border-[1px] border-[#605DAF] pb-[6px] bold text-[14px] text-[#605DAF] items-center ${className} capitalize`}
    >
      {text}
    </label>
  ) : (
    <label className={`flex gap-[4px] items-center ${className} capitalize`}>
      {Icon}
      <span className={`${textSize} leading-[18px] font-medium text-[${color}]`}>{text}</span>
      {showCaret && <Caret />}
      {required && <span className="text-[red] leading-[0]">*</span>}
    </label>
  );
};
export default HemaLabel;
