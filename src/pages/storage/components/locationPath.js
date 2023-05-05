import { PaginationRightArrow } from "../../../HemeIconLibrary";
import React from "react";
import TextWithIcon from "./textWithIcon";

export default function LocationPath({ path }) {
    console.log("Location Path.....", path);
    return (
        <div className="mt-3">
            {path.map((item, index) => {
                return <TextWithIcon text={item.name} icon={index > 0 ? <PaginationRightArrow /> : null}
                    textColor={index === path.length - 1 ? 'text-primary1' : 'text-secondary'} fontWeight='bold-text'/>
            })}
        </div>
    );
}