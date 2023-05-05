import React from "react";

const HemaValue = (props) => {
  const { text, cta, bg, color = "text-[#595959]", className } = props;

  return (
    <p
      className={`m-0 text-[14px] w-fit leading-[21px] font-medium ${className} ${color} ${bg}  ${
        bg && "px-[8px] rounded-[90px]"
      }`}
      onClick={() => {
        if (cta) {
          cta();
        }
      }}
    >
      {text}
    </p>
  );
};
export default HemaValue;
