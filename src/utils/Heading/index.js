import React from 'react';
import Button from '../Button';

const Index = ({ buttonData, heading, border }) => {
  return (
    <div
      className={`${
        border && 'border-none'
      } "w-full flex items-center justify-between pb-[9px] border-b border-dashed border-[#DEE2E6] mb-[21px]"`}
    >
      <h2 className="m-0 text-base font-bold text-primary1">{heading}</h2>
      <div className="flex items-center gap-2">
        {buttonData?.map((item) => (
          <Button
            type={item.type}
            text={item.text}
            cta={item.cta}
            Icon={item.Icon}
            className={` pl-[10px] pr-[10px] py-[8px] border text-primary1 border-primary1 ${item.className}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
