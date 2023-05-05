import React from "react";

export default function TextWithIcon({ text, icon, verticalAlignClass = 'align-top', textColor = 'text-[black]', fontWeight='' }) {
    return (
        <>
            {icon &&
                <span className={`d-inline-block ${textColor} mr-2 ${verticalAlignClass} ${fontWeight}`}>
                    {icon}
                </span>
            }
            <span className={`d-inline-blockcursor-pointer ${textColor} ${fontWeight}`}>{text}</span>
        </>
    );
}