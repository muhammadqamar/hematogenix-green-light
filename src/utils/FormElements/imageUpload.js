import React, { useRef, useState,useEffect } from 'react';
import { SelectUpload } from '../../HemeIconLibrary';

const ImageUpload = (props) => {
  const openFile = useRef();
  const [imgData, setImgData] = useState();

  const { setFieldValue, name, value,storageUrl } = props;

    const renderImage = () =>{
        if(imgData && value){
            return(
                <img className="max-w-[70px] m-[10px]" src={imgData || value} alt="" />
            )
        }else if(storageUrl){
            return(
                <img className="max-w-[70px] m-[10px]" src={storageUrl} alt="" />
            )
        }
    }

  return (
    <>
      <input
        ref={openFile}
        type="file"
        {...props}
        className="hidden"
        onChange={(e) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setImgData(fileReader.result);
          };
          fileReader.readAsDataURL(e.target.files[0]);

          setFieldValue(name, e.target.files[0]);
        }}
        value={undefined}
      />
      <div
        onClick={() => openFile.current.click()}
        className="h-[64p] cursor-pointer  px-[10px] flex flex-col items-center  border-[#DEE2E6] border-solid p-[9px] font-medium text-[12px] leading-[15px] border rounded-[5px]"
      >
        {name === 'userFile' ? (
          <>
            <div className="font-medium text-[10px] leading-[15px]">
              Drag and Drop files here or <span className="text-[#605DAF]">Browse</span>
            </div>
            <div className="font-medium text-[10px] leading-[15px] text-[#F54C3B]">Max: 15MB, Files Supported: XLS, XLSX</div>
          </>
        ) : (
          <>
            <SelectUpload />
            <div className="font-medium text-[10px] leading-[15px]">Upload the image</div>
            <div className="font-medium text-[10px] leading-[15px] text-[#3D88E0]"> Max 2MB, Support: jpeg, jpg, png, gif</div>
          </>
        )}

        {renderImage()}
      </div>
    </>
  );
};
export default ImageUpload;
