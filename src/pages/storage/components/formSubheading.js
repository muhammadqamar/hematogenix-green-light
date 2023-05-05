import React from "react";
import LocationPath from "./locationPath";
import TextWithIcon from "./textWithIcon";

export default function FormSubheading({ subheading, icon, type, path }) {
    return (
        <div className="pb-4 border-b-1 border-[#243c5a]">
            <TextWithIcon icon={icon} text={subheading} verticalAlignClass='align-middle' />
            {path && path.length && <LocationPath path={path} />}
        </div>
    );
}
