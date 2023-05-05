import React from "react";
export const ActionDots = () => {
  return (
    <svg
      width="6"
      height="20"
      viewBox="0 0 6 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="2.5" fill="url(#paint0_linear_1188_41272)" />
      <circle cx="3" cy="10" r="2.5" fill="url(#paint1_linear_1188_41272)" />
      <circle cx="3" cy="17" r="2.5" fill="url(#paint2_linear_1188_41272)" />
      <defs>
        <linearGradient
          id="paint0_linear_1188_41272"
          x1="0.5"
          y1="3"
          x2="5.5"
          y2="3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE318A" />
          <stop offset="1" stopColor="#EC6551" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1188_41272"
          x1="0.5"
          y1="10"
          x2="5.5"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE318A" />
          <stop offset="1" stopColor="#EC6551" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1188_41272"
          x1="0.5"
          y1="17"
          x2="5.5"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE318A" />
          <stop offset="1" stopColor="#EC6551" />
        </linearGradient>
      </defs>
    </svg>
  );
};
