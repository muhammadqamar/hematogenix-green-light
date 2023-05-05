import React from "react";

const HemaHeadingWithSubText = ({
  heading,
  sub,
  HeadingFontSize = "30px",
  HeadingLineHeight = "38px",
  SubFontSize = "16px",
  SubLineHeight = "24px",
  classNameForHeader,
  showIcons
}) => {
  return (
    <div>
      {heading && (
        <div>
        <h1
          className={`font-bold text-[${HeadingFontSize}] leading-[${HeadingLineHeight}] text-mainheadingColor m-0 ${classNameForHeader}`}
        >
          {heading}
        </h1>

      </div>
      )}
      {sub && (
        <p
          className={`pt-[4px] m-0 text-[${SubFontSize}] leading-[${SubLineHeight}] text-textColor`}
        >
          {sub}
        </p>
      )}
    </div>
  );
};
export default HemaHeadingWithSubText;
