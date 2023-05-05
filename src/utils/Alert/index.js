import React from "react";

import Alert from "react-bootstrap/Alert";
import { useSelector, useDispatch } from "react-redux";

import { Cancel, Check, AlertIcon, InfoAlert } from "../../HemeIconLibrary";
import { showErrorReducer, showSuccessReducer } from "../../Store/reducers/uiSettings";

const HemaAlert = ({ type }) => {
  const { showError, showSuccess } = useSelector((state) => state.uisettings);
  const dispatch = useDispatch();
  return (
    <>
      {showError && type === "error" && (
        <div className="w-full">
          <Alert className="flex justify-between w-full text-center" variant={"danger"}>
            <div className="flex gap-[10px]">
              {/*<Check />*/}
              <InfoAlert />
              <div className="text-[14px]  font-semibold">{showError}</div>
            </div>
            <div
              className="cursor-pointer ml-[10px]"
              onClick={() => {
                dispatch(showErrorReducer(null));
              }}
            >
              <Cancel />
            </div>
          </Alert>
        </div>
      )}

      {showSuccess && (
        <div className=" mt-[30px] w-full ">
          <Alert className="flex justify-between w-full text-center" variant={"success"}>
            <div className="flex gap-[10px]">
              <AlertIcon />
              <div className="text-[14px] text-[#38C280] font-semibold">{showSuccess}</div>
            </div>

            <div
              className="cursor-pointer ml-[10px]"
              onClick={() => {
                dispatch(showSuccessReducer(null));
              }}
            >
              <Cancel />
            </div>
          </Alert>
        </div>
      )}
    </>
  );
};

export default HemaAlert;
