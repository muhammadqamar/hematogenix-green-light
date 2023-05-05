import React from "react";
import HemaLogo from "../../assets/images/HematogenixRed.svg";
import LoginForm from "./loginForm";
import AuthLanding from "../../components/auth/authLanding";
const Index = () => {
  return (
    <div className="flex w-full">
      <AuthLanding />
      <div className="pl-[70px] w-[50%] bg-hemaSecondary">
        <div className="mt-[60px] mb-[104px]">
          <img src={HemaLogo} alt="Company logo" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
