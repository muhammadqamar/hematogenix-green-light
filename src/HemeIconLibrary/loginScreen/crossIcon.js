import React from "react";

const CrossIcon = ({ color }) => {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.95768 1.04172L8.95893 0.0429688L4.99935 4.00255L1.03977 0.0429688L0.0410156 1.04172L4.0006 5.0013L0.0410156 8.96089L1.03977 9.95963L4.99935 6.00005L8.95893 9.95963L9.95768 8.96089L5.9981 5.0013L9.95768 1.04172Z"
        fill={color || "#989898"}
      />
    </svg>
  );
};

export default CrossIcon;
