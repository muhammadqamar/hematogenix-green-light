import React from "react";
const FormTitle = (props) => {
    const { text, Icon } = props;

    return (
        <div className="flex items-center gap-[13px] text-mainheadingColor">
           <div className="h-[48px] w-[48px] flex justify-center items-center bg-hemaSecondary rounded-full"> {Icon}</div>
           <h2 className="m-0">{text}</h2>
        </div>
    )

}
export default FormTitle