import React from 'react';

export const DragDrop = ({ color }) => {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 10 15"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2.5" cy="2.25195" r="2" fill="#737373" />
      <circle cx="7.5" cy="2.25195" r="2" fill="#737373" />
      <circle cx="2.5" cy="7.25195" r="2" fill="#737373" />
      <circle cx="7.5" cy="7.25195" r="2" fill="#737373" />
      <circle cx="2.5" cy="12.252" r="2" fill="#737373" />
      <circle cx="7.5" cy="12.252" r="2" fill="#737373" />
    </svg>
  );
};
