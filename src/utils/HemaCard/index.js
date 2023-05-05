import React from 'react';
import { HemaHeadingWithSubText } from '../../utils';

const HemaCard = ({ heading, sub, Icon, className, shadeColor }) => {
  return (
    <div
      className={`py-[26px] px-[20px]  rounded-[12px] bg-white border-solid border-b-[3px] border-[${shadeColor}] ${className}`}
      style={{
        borderBottomColor: shadeColor,
      }}
    >
      <div className="flex gap-[10px] items-center">
        {!!Icon && <Icon />}
        {heading && (
          <HemaHeadingWithSubText
            HeadingFontSize="30px"
            HeadingLineHeight="38px"
            heading={heading}
          />
        )}
      </div>
      {sub && (
        <div className="flex gap-[5px] items-center pt-[20px]">
          <div
            className={`rounded-[100%] w-[8px] h-[8px] bg-[${shadeColor}]`}
          />
          <p className={` m-[0] font-semibold text-sm text-[${shadeColor}]`}>
            {sub}
          </p>
        </div>
      )}
    </div>
  );
};
export default HemaCard;
