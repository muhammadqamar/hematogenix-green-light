import React, { useState } from 'react';
import HemaLogo from '../assets/images/HematogenixRed.svg';
import LoginForm from '../components/ClientPortal/login';
import SettingForm from '../components/ClientPortal/selectSettings';
import AuthLanding from '../components/auth/authLanding';
const PortalLogin = () => {
  const [firstAttemptToSelectDropdown, setFirstAttemptToSelectDropdown] =
    useState();
  return (
    <div className="flex w-full">
      <AuthLanding />
      <div className="pl-[70px] w-[50%] bg-hemaSecondary">
        <div className="mt-[60px] mb-[104px]">
          <img src={HemaLogo} alt="Company logo" />
        </div>
        {firstAttemptToSelectDropdown ? (
          <SettingForm
            setFirstAttemptToSelectDropdown={setFirstAttemptToSelectDropdown}
          />
        ) : (
          <LoginForm
            setFirstAttemptToSelectDropdown={setFirstAttemptToSelectDropdown}
          />
        )}
      </div>
    </div>
  );
};

export default PortalLogin;
