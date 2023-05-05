import React from "react";
import { Search } from "../../HemeIconLibrary";
import "./style.scss";

function FormSearch(props) {
  const { cta, w, setsearchQuery, searchQuery } = props;

  return (
    <div className="relative">
      <div className="absolute top-[14px] left-[12px]">
        <Search color="#232323" />
      </div>
      <input
        className={` ${w} h-[40px] pl-[36px] rounded-[5px] solid border border-[#ccc]`}
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setsearchQuery(e.target.value);
        }}
        value={searchQuery}
      />
    </div>
  );
}

export default FormSearch;
