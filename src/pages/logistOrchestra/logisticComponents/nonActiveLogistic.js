import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../utils';
import { Setting, Danger } from '../../../HemeIconLibrary';

const NonActiveLogistic = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-[30px] mt-[165px]">
      <Danger />
      <p className="text-lg leading-[22px] font-semibold text-textColor2  w-[550px] text-center">
        The logistics orchestrator is not active for this study. Please activate it in Site Management.
      </p>
      <Button
        text="Go to Site Management"
        cta={() => {
          navigate('/study-management');
        }}
        bg="bg-primary1"
        border="border-primary1"
        color="text-white"
        // Icon={<Setting color="#FFFFFF" />}
        className="h-[48px] justify-center font-semibold"
      />
    </div>
  );
};

export default NonActiveLogistic;
