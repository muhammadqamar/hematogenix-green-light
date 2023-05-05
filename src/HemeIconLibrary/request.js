import React from 'react';

export const Request = ({ color }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0C2.68625 0 0 2.68625 0 6C0 9.31375 2.68625 12 6 12C9.31375 12 12 9.31375 12 6C12 2.68625 9.31375 0 6 0ZM6 2C8.20925 2 10 3.79075 10 6C10 8.20925 8.20925 10 6 10C3.79075 10 2 8.20925 2 6C2 3.79075 3.79075 2 6 2ZM6 3C5.44775 3 5 3.44775 5 4C5 4.55225 5.44775 5 6 5C6.55225 5 7 4.55225 7 4C7 3.44775 6.55225 3 6 3ZM6 5.75C5.58575 5.75 5.25 6.08575 5.25 6.5V8.25C5.25 8.66425 5.58575 9 6 9C6.41425 9 6.75 8.66425 6.75 8.25V6.5C6.75 6.08575 6.41425 5.75 6 5.75Z"
        fill={color || 'url(#paint0_linear_3619_69444)'}
      />
      <defs>
        <linearGradient
          id="paint0_linear_3619_69444"
          x1="5.44823e-08"
          y1="5.99999"
          x2="12"
          y2="5.99999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFCB57" />
          <stop offset="1" stop-color="#FF7443" />
        </linearGradient>
      </defs>
    </svg>
  );
};
