import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../utils";
import { Confirm, Cancel } from "../../../HemeIconLibrary";
import { useDispatch } from "react-redux";
import { setForm } from "../../../Store/reducers/uiSettings";
import Explorer from "../../../components/Explorer/explorer";
import { markItemInTree, addPropertyToTree } from "../../../helpers/commonHelper";
import { getStorageLocationTreeAction } from "../../../Actions/storageLocation";
import { useSelector } from "react-redux";

const StorageFormikForm = ({ controller, setShowStorage }) => {
  const [selectedLocation, updateSelectedLocation] = useState(null);
  const [selectedTree, updateSelectedTree] = useState([]);
  const [popupTree, setPopupTree] = useState([]);
  const { storageLocation } = useSelector((state) => state);
  const treePathName = useRef("");
  console.log("selectedLocation", popupTree);
  useEffect(() => {
    getStorageLocationTreeAction();
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storageLocation.locationTree) {
      const modifiedLocationTree = addPropertyToTree(storageLocation.locationTree, "expand", false);
      setPopupTree([...modifiedLocationTree]);
    }
  }, [storageLocation]);

 const getTreePathName = (allData,object,pathName) =>{
    if(object.parentId == null){
        pathName += " / " + object.name;
        treePathName.current = pathName;
    }else{
      pathName += " / " + object.name;
      let nextElement = allData.find(e => e.id === object.parentId);
      getTreePathName(allData,nextElement,pathName)
    }
}

  useEffect(() => {
    if(selectedTree.length > 0){
      getTreePathName(selectedTree,selectedTree[selectedTree.length -1],"");
    }
  }, [selectedTree]);

  function expandOrSelectItem(explorer, source = "sidebar") {
    // change 'name' to 'id' when IDs will be the unique key, otherwise issues are comming for duplicate name or ID
    const result = markItemInTree(popupTree, "name", explorer.name, source);
    updateSelectedLocation({
      name: explorer.name,
      id: explorer.id,
    });
    if(explorer.parentId != null){
      if (!selectedTree.find(e => e.id === explorer.id)){
          updateSelectedTree([...selectedTree, explorer]);
      }
    }else{
      updateSelectedTree([explorer]);
    }
    
    
    setPopupTree([...result.data]);
  }
  return (
    <>
      <div>
        <p className="mb-2 text-[#605DAF]">Storage Locations</p>
        <div className="border-dashed border-t-2 border-[#DEE2E6] mb-[21px]"></div>
      </div>
      <div className="h-[81%] overflow-y-scroll position-relative">
        <div className="mt-3 d-flex storage-location-container">
          <div className="flex-shrink-0 location-col">
            <ul className="p-0 m-0 list-unstyled">
              {popupTree.map((item) => {
                return (
                  <li className="mb-2 parent-lst" key={item.id}>
                    <Explorer
                      explorer={item}
                      onItemClick={expandOrSelectItem}
                      showOptions={false}
                      selectedLocation={selectedLocation}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex gap-[8px]  mt-[20px] mb-[50px] pb-[4em]">
          <Button
            cta={() => {
              setShowStorage(false);
            }}
            type="button"
            text="Cancel"
            bg="bg-white"
            border="border-primary1"
            color="text-primary1"
            Icon={<Cancel />}
          />
          <Button
            type="button"
            text="Confirm"
            bg="bg-primary1"
            color="text-white"
            Icon={<Confirm />}
            cta={() => {

              controller?.current?.setFieldValue("locationId", selectedLocation);
              selectedLocation.name = treePathName?.current.split("/").reverse().join(" / ");
              controller?.current?.setFieldValue("StorageLocation", selectedLocation);
              
              setShowStorage(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StorageFormikForm;
