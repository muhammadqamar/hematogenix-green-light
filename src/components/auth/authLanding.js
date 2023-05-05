import React from "react";

import CompanyLogo from "../../assets/images/company-hemo-logo.svg";
const AuthLanding = () => {
  return (
    <div className="flex  justify-center items-center bg-[url('../../assets/images/loginBack.svg')]  bg-cover bg-no-repeat w-[50%] h-[100vh]">
      <div>
        <img src={CompanyLogo} alt="Company logo" />
      </div>
    </div>
  );
};

export default AuthLanding;
