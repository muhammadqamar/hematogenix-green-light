import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, HemaLabel, HemaValue } from '../../../utils';
import {
  AddBlack,
  AddInKit,
  Cancel,
  EditBlue,
  BlueTick,
  Delete,
} from '../../../HemeIconLibrary';

import ItemCategoryField from './categoryField';
import { getItemCategoryByIdAction } from '../../../Actions/itemCategory';
import Skeleton from 'react-loading-skeleton';
import { setItemCategoriesReducer } from '../../../Store/reducers/storageLocation';
import { Alert } from 'react-bootstrap';

const ItemCategoriesComponent = forwardRef(({
  addCategoryCTA,
  removeCategoryCTA,
  addCustomFieldsCTA,
  itemCategoryFormat,
  deleteCustomFieldCTA,
  updateItemCategoryFields,
}, ref) => {
  const dispatch = useDispatch();
  const { common, storageLocation } = useSelector((state) => state);
  const [showEditState, setShowEditState] = useState(false);

  useEffect(() => {
    setShowEditState(false);
  }, [storageLocation.itemCategories?.id]);

  useEffect(() => {
    if (common) {
      if (common.allCategories?.length) {
        getItemCategoryByIdAction(common.allCategories[0]?.id);
      }
    }
  }, [common?.allCategories]);

  const handleItemCategoryClick = (category) => {
    dispatch(setItemCategoriesReducer(null));
    getItemCategoryByIdAction(category.id);
  };



  useImperativeHandle(ref, () => ({
    toggleEditState() {
      setShowEditState((prevState) => !prevState);
    }
  }));

  return (
    <>
      <div className="flex mt-[26px] h-full">
        <div className="border-r-2 border-solid border-[#ccc] w-[250px] ">
          <Button
            text={'Add Item Category'}
            Icon={<AddBlack />}
            className="p-[16px]"
            cta={addCategoryCTA}
          />
          <div className="">
            {common.allCategories ? (
              common.allCategories?.map((category) => {
                return (
                  <div
                    className={
                      storageLocation.itemCategories?.id === category.id
                        ? 'bg-[#F9F5FF] cursor-pointer leading-[24px]  p-[10px]'
                        : 'cursor-pointer leading-[24px] p-[10px]'
                    }
                    onClick={() => handleItemCategoryClick(category)}
                  >
                    <HemaLabel
                      text={category.name}
                      key={category.id}
                      className="cursor-pointer px-[16px] break-words "
                    />
                  </div>
                );
              })
            ) : (
              <div className="p-[16px]">
                <Skeleton count={1} />
                <Skeleton count={1} />
                <Skeleton count={1} />
              </div>
            )}
            {common.allCategories?.length ===0 && <Alert variant="warning" >No Categories Available.</Alert>}
          </div>
        </div>
        <div className="w-full mt-2 ml-[15px]">
          {storageLocation.itemCategories && (
            <>
              <div className="flex gap-[17px] items-center  ml-[15px]">
                <HemaValue
                  className="bold text-[20px] leading-[30px] text-[#2c2c2c]"
                  text={storageLocation.itemCategories?.name}
                />
                <div className="flex gap-[26px]">
                  {showEditState ? (
                    <>
                      <div
                        className="cursor-pointer "
                        onClick={() => {
                          updateItemCategoryFields();
                        }}
                      >
                        <BlueTick />
                      </div>
                      <div
                        onClick={() => {
                          setShowEditState(false);
                          getItemCategoryByIdAction(
                            storageLocation.itemCategories?.id
                          );
                        }}
                        className="cursor-pointer "
                      >
                        <Cancel />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="cursor-pointer "
                        onClick={() => {
                          setShowEditState(true);
                        }}
                      >
                        <EditBlue />
                      </div>
                      <div
                        className="cursor-pointer "
                        onClick={() => {
                          removeCategoryCTA(storageLocation.itemCategories);
                        }}
                      >
                        <Delete />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <HemaValue
                className="font-normal text-[16px] leading-[24px] pl-[15px] text-[#595959]"
                text={`${storageLocation.itemCategories?.numberOfItems} items are categorized as ${storageLocation.itemCategories?.name}`}
              />
            </>
          )}
          {!storageLocation.itemCategories ? (
            <div className="px-[16px]">
              <Skeleton count={4} />
              <br />
              <Skeleton count={4} />
              <br />
              <Skeleton count={4} />
            </div>
          ) : (
            <ItemCategoryField
              selectedCategory={storageLocation.itemCategories}
              addCustomFieldsCTA={addCustomFieldsCTA}
              showEditState={showEditState}
              itemCategoryFormat={itemCategoryFormat}
              deleteCustomFieldCTA={deleteCustomFieldCTA}
              dispatch={dispatch}

            />
          )}
          {storageLocation.itemCategories && (
            <div className="flex ">
              <Button
                type="button"
                cta={addCustomFieldsCTA}
                Icon={<AddInKit />}
                text="Custom Fields "
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
});




export default ItemCategoriesComponent;
