import React from "react";
export const Search = ({color}) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8034 12.8154L11.208 10.2409C12.2154 8.98475 12.7033 7.39032 12.5713 5.78547C12.4393 4.18063 11.6974 2.68735 10.4983 1.6127C9.29906 0.538039 7.7337 -0.0363167 6.12404 0.00772937C4.51437 0.0517755 2.98276 0.710875 1.84413 1.8495C0.705504 2.98813 0.0464044 4.51974 0.00235827 6.12941C-0.0416878 7.73907 0.532668 9.30443 1.60733 10.5036C2.68198 11.7028 4.17526 12.4447 5.7801 12.5767C7.38495 12.7087 8.97938 12.2208 10.2355 11.2133L12.81 13.7878C12.8751 13.8534 12.9524 13.9054 13.0377 13.9409C13.1229 13.9765 13.2144 13.9947 13.3067 13.9947C13.3991 13.9947 13.4905 13.9765 13.5758 13.9409C13.661 13.9054 13.7384 13.8534 13.8034 13.7878C13.9295 13.6574 14 13.483 14 13.3016C14 13.1202 13.9295 12.9458 13.8034 12.8154ZM6.31088 11.2133C5.34233 11.2133 4.39552 10.9261 3.5902 10.388C2.78488 9.84993 2.15721 9.08511 1.78656 8.19028C1.41591 7.29546 1.31893 6.31082 1.50789 5.36088C1.69684 4.41093 2.16324 3.53836 2.84811 2.85348C3.53298 2.16861 4.40556 1.70221 5.3555 1.51326C6.30545 1.3243 7.29009 1.42128 8.18491 1.79193C9.07974 2.16258 9.84456 2.79025 10.3827 3.59557C10.9208 4.40089 11.208 5.3477 11.208 6.31625C11.208 7.61504 10.692 8.86063 9.77364 9.77901C8.85526 10.6974 7.60967 11.2133 6.31088 11.2133Z"
        fill={color || "white"}
      />
    </svg>
  );
};
