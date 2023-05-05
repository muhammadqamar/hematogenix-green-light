import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HemaHeadingWithSubText from '../../utils/HemaHeadingWithSubText';
import StorageLocationsComponent from './storageLocations';
import ItemCategoriesComponent from './itemCategories/itemCategories';
import { Button, Alert } from '../../utils';
import {
  Add,
  Cancel,
  DeleteStorage,
  Save,
  Location,
  InfoAlert,
  StorageGradient,
  MoveInventory,
  DeleteInventory,
  CustomField,
  AddCategory,
  ExpiryAlertPurple,
  DeletePurple,
} from '../../HemeIconLibrary';

import FormContainer from '../../components/Formik/formContainer';
import { createLocationStorage, changeReason, deleteReason, moveLocation } from '../../components/Formik/AllForms/addStorageLocation';
import { Remove } from '../../components/Formik/AllForms/remove';
import { createItemCategory, createCustomFields } from '../../components/Formik/AllForms/itemCategory';
import { setForm, setFormLoaderReducer, setFormCloseReducer, showSuccessReducer, showErrorReducer } from '../../Store/reducers/uiSettings';

import {
  getStorageLocationTreeAction,
  createStorageLocationAction,
  updateStorageLocationByIdAction,
  deleteStorageLocationByIdAction,
  moveStorageLocationAction,
} from '../../Actions/storageLocation';
import {
  createItemCategoryAction,
  updateBulkCustomFieldsAction,
  createItemCategoryCustomFieldAction,
  deleteItemCategoryByIdAction,
  deleteItemCategoryFieldIdAction,
} from '../../Actions/itemCategory';
import { getAllItemCategoriesAction, getAllFormatsActions, itemCategoryFormatAction } from '../../Actions/common';

import { Modal, Tabs, Tab, Alert as AlertBootstrap } from 'react-bootstrap';
import Explorer from '../../components/Explorer/explorer';
import { addPropertyToTree, markItemInTree, flattternTree, findPath } from '../../helpers/commonHelper';

import { textConstants, dataConstatnt } from '../../constants/formConstants';
import Skeleton from 'react-loading-skeleton';
import { ItemCategory, StorageLocation } from '../../HemeIconLibrary/storageIcons';

import FormSubheading from './components/formSubheading';
import TextWithIcon from './components/textWithIcon';
import {STORAGE_LOCATION_NAME_MAXSIZE} from '../../config'

const Storage = () => {
  const dispatch = useDispatch();
  const itemCategoryRef = useRef(null);
  const { uisettings, storageLocation, common } = useSelector((state) => state);
  const [locationStorageFormData, setLocationStorageFormData] = useState(null);
  const [locationTree, setLocationTree] = useState(null);
  const [popupTree, setPopupTree] = useState([]);
  const [selectedLocation, updateSelectedLocation] = useState(null);
  const [show, setShow] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryFormData, setcategoryFormData] = useState();
  const [customfieldsFormData, setCustomFieldsFormData] = useState();
  const [subheadingComponent, setFormsubHeading] = useState(null);
  const [locationModalTitleProps, setlocationModalTitleProps] = useState(dataConstatnt.defaultLocationModalProps);
  const [updatedData, setUpdatedData] = useState();

  /* form states */
  const [CTA, setCTA] = useState();

  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();

  const [key, setKey] = useState("Storage Location");

  //callallEnventoryRequiredAPI
  useEffect(() => {
    // remove catch block later, its for auto sign in
    getStorageLocationTreeAction();
    getAllFormatsActions();
    setLocationStorageFormData([...createLocationStorage]);
    setcategoryFormData(createItemCategory);
    setCustomFieldsFormData(createCustomFields);
    getAllItemCategoriesAction();
    itemCategoryFormatAction();
  }, []);

  const addLocationStorage = async (data) => {
    // let payload = { ...data };
    // console.log(data);
    // if (locationStorageFormData[2].disabled) {
    //   payload.parentId = null;
    // }

    // payload.parentId = locationStorageFormData[2].data?.id;
    // payload.changeReason = '';
    if(data.name && data.name.length > STORAGE_LOCATION_NAME_MAXSIZE){
      dispatch(
        showErrorReducer(`storage location name must not be empty or more than ${STORAGE_LOCATION_NAME_MAXSIZE} character`)
      );
    }else{
      dispatch(setFormLoaderReducer(true));
      const createdItem = await createStorageLocationAction({
        ...data,
        parentId: data?.StorageLocation?.id,
      });
      dispatch(setFormLoaderReducer(false));
      if (createdItem.status === 200) {
        await getStorageLocationTreeAction();
        // resetValues();
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${createdItem.data.name} location created.`));

        setLocationStorageFormData(null);
      }
    }
  };

  const updatedStorageLocation = async (data, currentLocation) => {
    if (currentLocation) {
      // if (locationStorageFormData[2].data.id === currentLocation.id) {
      //   dispatch(
      //     showErrorReducer(`Selected location is the current location!`)
      //   );
      //   return;
      // }
      // const childLocations = flattternTree(currentLocation.children || []);
      // const isChildLocationSelected = childLocations.find(
      //   (ele) => ele.id === locationStorageFormData[2].data.id
      // );
      // if (isChildLocationSelected) {
      //   dispatch(
      //     showErrorReducer(`Child Can not be selected as parent Location!`)
      //   );
      //   return;
      // }
      // let payload = { ...data };

      // if (locationStorageFormData[2].disabled) {
      //   payload.parentId = null;
      // } else if (!locationStorageFormData[2].data) {
      //   dispatch(showErrorReducer(`Please Select Parent Location!`));
      //   return;
      // }
      // payload.parentId = locationStorageFormData[2].data?.id;

      dispatch(setFormLoaderReducer(true));
      const updatedItem = await updateStorageLocationByIdAction(currentLocation.id, { ...data, parentId: data?.StorageLocation?.id });
      dispatch(setFormLoaderReducer(false));
      if (updatedItem?.status === 200) {
        await getStorageLocationTreeAction();
        resetValues();
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${updatedItem.data.name} location updated.`));
        dispatch(setFormLoaderReducer(false));
      }
    }
  };

  const addLocationStorageCTA = () => {
    setCTA(() => async (data) => {
      addLocationStorage(data);
    });
  };

  const resetValues = () => {
    // locationStorageFormData[0]?.initialValue = '';
    // locationStorageFormData[1]?.initialValue = '';
    // locationStorageFormData[2]?.data = null;
    // locationStorageFormData[2]?.text = 'Select Location';
    // if (locationStorageFormData?.length === 4) {
    //   locationStorageFormData.pop();
    // }
    // setLocationStorageFormData(locationStorageFormData);
    // setFormsubHeading(null);
  };

  const editLocationCTA = (location) => {
    const flatData = flattternTree(locationTree);
    const parentLocation = flatData.find((ele) => ele.id === location.parentId);

    createLocationStorage[0].initialValue = location.name;
    createLocationStorage[1].initialValue = location.iconName;
    createLocationStorage[2].initialValue = {
      id: parentLocation.id,
      name: parentLocation.name,
    };
    createLocationStorage[2].text = parentLocation.name;

    updateSelectedLocation(parentLocation);
    setCTA(() => async (data) => {
      updatedStorageLocation(data, location);
    });

    setformName('Edit Storage Location');
    setFormIcon(<ExpiryAlertPurple />);
    dispatch(setForm({ state: true, type: 'editLocationStorage' }));
    setUpdatedData([...createLocationStorage, changeReason]);
  };

  const deleteLocationCTA = (location) => {
    console.log("location",location);
    const flatData = flattternTree(locationTree);
    const parentLocation = flatData.find((ele) => ele.id === location.parentId);
    updateSelectedLocation(parentLocation);
    if (location.children && location.children.length) {
      deleteWithMoveCTA(location);
    } else {
      deleteWithoutMoveCTA(location);
    }
  };

  const deleteWithMoveCTA = (location) => {
    // const subheading = (
    //   <FormSubheading
    //     subheading={textConstants.deleteWithMoveSubheading}
    //     icon={<InfoAlert />}
    //   />
    // );
    // setFormsubHeading(subheading);
    setCTA(() => async (data) => {
      deleteStorageLocationWithMove(data, location);
    });
    setUpdatedData([moveLocation, deleteReason]);
    setformName('Delete Storage Location');
    setFormIcon(<DeleteStorage />);
    dispatch(setForm({ state: true, type: 'deleteStorageLocation' }));
  };

  const deleteWithoutMoveCTA = (location) => {
    // const path = findPath(locationTree, 'name', location.name);

    // const subheading = (
    //   <FormSubheading
    //     subheading={location.name}
    //     icon={<Location />}
    //     path={path}
    //   />
    // );
    // setFormsubHeading(subheading);
    setCTA(() => async (data) => {
      deleteStorageLocationWithoutMove(data, location);
    });

    setUpdatedData([deleteReason]);
    setformName('Delete Storage Location');
    setFormIcon(<DeletePurple />);
    dispatch(setForm({ state: true, type: 'deleteStorageLocation' }));
  };

  const deleteStorageLocationWithoutMove = async (data, location) => {
    dispatch(setFormLoaderReducer(true));
    console.log(location);
    const deletedItem = await deleteStorageLocationByIdAction(location.id, data?.deleteReason);
    dispatch(setFormLoaderReducer(false));
    if (deletedItem?.status === 200) {
      await getStorageLocationTreeAction();
      resetValues();
      dispatch(setFormCloseReducer());
      dispatch(showSuccessReducer(`${location?.name} deleted.`));
    }
  };

  const deleteStorageLocationWithMove = async (data, location) => {
    dispatch(setFormLoaderReducer(true));
    console.log(location, data);
    const movedLocation = await moveStorageLocationAction(location?.id, data?.StorageLocation?.id);

    if (movedLocation.status === 200) {
      const deletedItem = await deleteStorageLocationByIdAction(location.id, data.deleteReason);
      dispatch(setFormLoaderReducer(false));
      if (deletedItem?.status === 200) {
        await getStorageLocationTreeAction();
        resetValues();
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${location.name} deleted and items moved to ${data?.StorageLocation?.name}`));
      }
    } else {
      dispatch(setFormLoaderReducer(false));
    }
  };

  const onFormChange = (event) => {
    if (event.type === 'explorer') {
      handleShow();
    }
  };

  const handleClose = () => {
    setlocationModalTitleProps(dataConstatnt.defaultLocationModalProps);
    setShow(false);
  };

  const handleShow = () => {
    if (uisettings.formName === 'deleteStorageLocation') {
      const modalProps = {
        title: 'Move Items',
        icon: <MoveInventory />,
        subTitle: textConstants.chooseNewLocationText,
      };
      setlocationModalTitleProps(modalProps);
    }
    setShow(true);
  };

  const chooseLocation = () => {
    if (uisettings.formName === 'addlocationStorage') {
      locationStorageFormData[2].text = selectedLocation.name;
      locationStorageFormData[2].data = { ...selectedLocation };
      setLocationStorageFormData([...locationStorageFormData]);
    }

    if (uisettings.formName === 'deleteStorageLocation') {
      moveLocation.text = selectedLocation.name;
      moveLocation.data = { ...selectedLocation };
    }

    dispatch(showErrorReducer(''));
    handleClose();
  };

  useEffect(() => {
    if (storageLocation.locationTree) {
      const modifiedLocationTree = addPropertyToTree(storageLocation.locationTree, 'expand', false);
      // const modifiedPopupTree = structuredClone(modifiedLocationTree);
      setLocationTree([...modifiedLocationTree]);
      setPopupTree([...modifiedLocationTree]);
    }
  }, [storageLocation.locationTree]);

  useEffect(() => {
    if (common) {
      if (common.allCategories) {
        setCategoriesData(common?.allCategories);
      }
    }
  }, [common]);

  function expandOrSelectItem(explorer, source = 'sidebar') {
    // change 'name' to 'id' when IDs will be the unique key, otherwise issues are comming for duplicate name or ID
    const result = markItemInTree(popupTree, 'name', explorer.name, source);
    updateSelectedLocation({
      name: explorer.name,
      id: explorer.id,
    });
    setPopupTree([...result.data]);
  }

  const addCategoryCTA = (isEdit) => {
    setCTA(() => async (data) => {
      console.log("data",data);
      if (isEdit) {
        console.log(data);
      } else {
        addCategory(data);
      }
    });
    setUpdatedData(categoryFormData);
    setformName('Add Item Category');
    setFormIcon(<AddCategory />);
    dispatch(setForm({ state: true, type: 'addCategory' }));
  };

  const addCustomFieldsCTA = (isEdit) => {
    setCTA(() => async (data) => {
      if (isEdit) {
        console.log(data);
      } else {
        addCustomField(data);
      }
    });
    createCustomFields[1].options = common.itemCategoryFormat || [];
    setUpdatedData(createCustomFields);
    setformName('Add Custom Field');
    setFormIcon(<CustomField />);
    dispatch(setForm({ state: true, type: 'addCustomField' }));
  };

  const onFormClose = (data) => {
    resetValues();
  };

  const addCategory = async (data) => {
    let payload = { ...data };
    try {
      // payload.customFields = defaultFields;
      dispatch(setFormLoaderReducer(true));
      const createdItem = await createItemCategoryAction(payload);
      if (createdItem?.data?.id) {
        const newCategories = [...categoriesData];
        newCategories.push(createdItem.data);
        setCategoriesData(newCategories);
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${createdItem.data.name} item created.`));
        dispatch(setFormLoaderReducer(false));
      }
    } catch (error) {
      //dispatch(showErrorReducer(`${error.message}`));
      dispatch(setFormLoaderReducer(false));
    }
  };

  const addCustomField = async (data) => {
    dispatch(setFormLoaderReducer(true));
    const updatedItem = await createItemCategoryCustomFieldAction(storageLocation.itemCategories?.id, {
      ...data,
      options: data.options?.length
        ? data.options?.split(',')?.map((opt) => {
            return { name: opt };
          })
        : undefined,
    });
    if (updatedItem?.data?.id) {
      dispatch(setFormCloseReducer());
      dispatch(showSuccessReducer(`${updatedItem.data.name} item updated.`));
      dispatch(setFormLoaderReducer(false));
    } else {
      dispatch(setFormLoaderReducer(false));
    }
  };

  const removeCategoryCTA = async (data) => {
    Remove[0].label = 'Item Category Name';
    Remove[0].initialValue = data.name;
    console.log(data);
    setUpdatedData(Remove);
    setformName('Delete Item Category');
    setFormIcon(<DeletePurple />);
    dispatch(setForm({ state: true, type: 'DeleteItemCategory' }));
    setCTA(() => async (formValue) => {
      console.log(formValue);
      const change_reason = formValue?.change_reason?.trim();
      dispatch(setFormLoaderReducer(true));
      const deletedItem = await deleteItemCategoryByIdAction(data.id, change_reason);
      if (deletedItem.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${data.name} cetegory deleted.`));
        dispatch(setFormLoaderReducer(false));
      } else {
        dispatch(setFormLoaderReducer(false));
      }
    });
  };

  const deleteCustomFieldCTA = async (data) => {
    Remove[0].initialValue = data?.name;
    Remove[0].label = 'Field Name';
    setUpdatedData(Remove);
    setformName('Delete Custom Field');
    setFormIcon(<DeletePurple />);
    dispatch(setForm({ state: true, type: 'deleteCustomField' }));
    setCTA(() => async (formValue) => {
      dispatch(setFormLoaderReducer(true));
      const change_reason = formValue?.change_reason?.trim();
      const deletedItem = await deleteItemCategoryFieldIdAction(storageLocation.itemCategories?.id, data.id, change_reason);
      if (deletedItem.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${data.name} field deleted.`));
        dispatch(setFormLoaderReducer(false));
      } else {
        dispatch(setFormLoaderReducer(false));
      }
    });
  };

  const updateItemCategoryFields = async () => {
    Remove[0].initialValue = storageLocation.itemCategories?.name;
    Remove[0].label = 'Item Category Name';
    setUpdatedData(Remove);
    setformName('Edit Item Category');
    setFormIcon(<ExpiryAlertPurple />);
    dispatch(setForm({ state: true, type: 'editItemCategory' }));
    setCTA(() => async (formValue) => {
      dispatch(setFormLoaderReducer(true));
      const change_reason = formValue?.change_reason?.trim();
      const editItemItem = await updateBulkCustomFieldsAction(storageLocation.itemCategories?.id, storageLocation.itemCategories?.fields, change_reason);
      if (editItemItem.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${storageLocation.itemCategories.name} updated`));
        dispatch(setFormLoaderReducer(false));
        itemCategoryRef.current.toggleEditState();
      } else {
        dispatch(setFormLoaderReducer(false));
      }
    });
  };

  useEffect(() => {
    if (common.activeDropdownValue?.name === 'Single Select' || common.activeDropdownValue?.name === 'Multiple Select') {
      createCustomFields[2].disabled = false;
      createCustomFields[2].required = true;
    } else {
      createCustomFields[2].disabled = true;
      createCustomFields[2].initialValue = undefined;
      createCustomFields[2].placeholder = 'Enter Options';
    }
  }, [common.activeDropdownValue]);

  return (
    <>
      <div className="flex justify-between mb-[27px] items-align">
        <HemaHeadingWithSubText
          heading="Settings"
          sub="Manage your organization here."
        />
        {key === "Storage Location" ? <Button
          text="Add Storage Location"
          Icon={<Add color="white" />}
          color="text-white"
          bg="bg-primary1"
          className="shrink-[0] h-fit"
          cta={() => {
            createLocationStorage[0].initialValue = '';
            createLocationStorage[1].placeholder = 'Select Icon';
            createLocationStorage[1].initialValue = '';
            createLocationStorage[2].initialValue = '';
            setUpdatedData(createLocationStorage);
            setformName('Add Storage Location');
            setFormIcon(<StorageGradient />);
            dispatch(setForm({ state: true, type: 'addlocationStorage' }));
            addLocationStorageCTA();
          }}
        /> : <></>}
      </div>

      <Alert />
      <div className="bg-white rounded-[5px]  py-[15px] mt-[27px] mb-[13px] inventory-tabs">
        <Tabs
          defaultActiveKey="Storage Location"
          id="uncontrolled-tab-example"
          onSelect={(k) => setKey(k)}
          className="mb-3 ml-[16px]"
        >
          <Tab
            eventKey="Storage Location"
            title={
              <div className="flex items-center title-icon gap-[7px] ">
                <StorageLocation /> Storage Location
              </div>
            }
          >
            {locationTree === null ? (
              <div className="p-[16px]">
                <br />
                <Skeleton count={4} />
                <br />
                <Skeleton count={4} />
                <br />
                <Skeleton count={4} />
              </div>
            ) : locationTree.length ? (
              <StorageLocationsComponent
                explorer={locationTree}
                updateSelectedLocation={updateSelectedLocation}
                selectedLocation={selectedLocation}
                editCTA={editLocationCTA}
                deleteCTA={deleteLocationCTA}
              />
            ) : (
              <AlertBootstrap variant="warning">No storage locations to show. Please add by clicking on Add Storage Location.</AlertBootstrap>
            )}
          </Tab>
          <Tab
            eventKey="Item Categories"
            title={
              <div className="flex items-center title-icon gap-[7px]">
                <ItemCategory /> Item Categories
              </div>
            }
          >
            <ItemCategoriesComponent
              ref={itemCategoryRef}
              categories={categoriesData}
              addCategoryCTA={addCategoryCTA}
              addCustomFieldsCTA={addCustomFieldsCTA}
              removeCategoryCTA={removeCategoryCTA}
              itemCategoryFormat={common.itemCategoryFormat}
              deleteCustomFieldCTA={deleteCustomFieldCTA}
              updateItemCategoryFields={updateItemCategoryFields}
            />
          </Tab>
        </Tabs>
      </div>

      {uisettings?.openform && (
        <FormContainer
          cta={CTA}
          formType={updatedData}
          formName={formName}
          Icon={formIcon}
          onFormChange={onFormChange}
          onFormClose={onFormClose}
          subheadingComponent={subheadingComponent || undefined}
        />
      )}

      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="contents">
            <TextWithIcon text={locationModalTitleProps.title} icon={locationModalTitleProps.icon} verticalAlignClass="align-baseline" />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {locationModalTitleProps.subTitle && (
            <h6 className="mb-4">
              {' '}
              {locationModalTitleProps.subTitle} <hr />{' '}
            </h6>
          )}
          <div className="mt-3 d-flex storage-location-container">
            <div className="flex-shrink-0 location-col">
              <ul className="p-0 m-0 list-unstyled">
                {popupTree.map((item) => {
                  return (
                    <li className="mb-2 parent-lst" key={item.id}>
                      <Explorer explorer={item} onItemClick={expandOrSelectItem} showOptions={false} selectedLocation={selectedLocation} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button text="Cancel" bg="bg-white" border="border-primary1" color="text-primary1" Icon={<Cancel />} cta={handleClose} />
          <Button
            disabled={selectedLocation === null}
            text={selectedLocation === null ? 'Select' : selectedLocation.name}
            Icon={<Save color="white" />}
            color="text-white"
            bg="bg-primary1"
            cta={chooseLocation}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Storage;
