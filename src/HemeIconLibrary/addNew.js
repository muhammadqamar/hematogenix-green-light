import React from "react";
export const AddNew = ({color}) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill={color||"white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.8327 6.83317H6.83268V11.8332H5.16602V6.83317H0.166016V5.1665H5.16602V0.166504H6.83268V5.1665H11.8327V6.83317Z"
        fill="white"
      />
    </svg>
  );
};
