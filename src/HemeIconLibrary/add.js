import React from "react";
export const Add = ({ color }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="11.749"
        width="11.498"
        height="2"
        transform="rotate(-90 5 11.749)"
        fill={color || "url(#paint0_linear_1188_30761)"}
      />
      <rect
        x="0.25"
        y="5"
        width="11.498"
        height="2"
        fill={color || "url(#paint1_linear_1188_30761)"}
      />
      <defs>
        <linearGradient
          id="paint0_linear_1188_30761"
          x1="5"
          y1="12.749"
          x2="16.498"
          y2="12.749"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE318A" />
          <stop offset="1" stopColor="#EC6551" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1188_30761"
          x1="0.25"
          y1="6"
          x2="11.748"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE318A" />
          <stop offset="1" stopColor="#EC6551" />
        </linearGradient>
      </defs>
    </svg>
  );
};
