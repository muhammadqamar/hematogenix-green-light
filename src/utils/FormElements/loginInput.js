import React from "react";

const LoginInput = (props) => {
  const posRight = props.name === "password" ? "right-[40px]" : "right-[18px]";

  return (
    <div className="flex relative">
      <input
        {...props}
        className={` w-full  bg-[#fff] mt-[20px] py-[17px] pl-[10px] font-medium text-[12px] leading-[15px] border border-[#DEE2E6] rounded-[5px]`}
      />
      {props.crossIcon && (
        <span
          onClick={() => props?.setFieldValue(props.name, "")}
          className={`absolute  ${posRight} top-[41px] cursor-pointer`}
        >
          {props.crossIcon}
        </span>
      )}
      {props.inputIcon && (
        <span
          onClick={() => props?.setshowPassword(!props?.showPassword)}
          className="absolute right-[10px] top-[40px] cursor-pointer"
        >
          {props.inputIcon}
        </span>
      )}
    </div>
  );
};

export default LoginInput;
