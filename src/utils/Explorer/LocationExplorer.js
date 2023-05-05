import React, {useEffect} from "react";

const LocationExplorer = (props) => {
    const { text, onClick, width, height, disabled,setFieldValue,name,initialValue } = props;
     useEffect(()=>{
      console.log(text, initialValue, name)
      if(setFieldValue) {
       setFieldValue(text)
      }
    },[text])
    return (
        <div className={`relative cursor-pointer${disabled ? ' bg-[#ededed]' : ''}`} onClick={disabled ? null : onClick}>
            {/* <div className="absolute top-[14px] left-[12px]"><Search color="#232323" /></div> */}
            <div className={`${width} ${height} pl-[9px] rounded-[5px] flex text-left items-center solid border border-[#ccc]`}>
                <span className="font-medium text-[12px] text-[#9ca3af]">{text}</span>
            </div>
        </div>

    );

}
export default LocationExplorer