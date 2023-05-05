import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as AlertBootstrap } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getItemCategoryByIdAction } from '../Actions/itemCategory';
import HemaHeadingWithSubText from '../utils/HemaHeadingWithSubText';
import { Button, FormSearch, HemaLabel, HemaValue, Alert } from '../utils';
import { Remove } from '../components/Formik/AllForms/remove';
import {
  Add,
  AddInventory,
  ExpiryAlertPurple,
  AddInventoryPurple,
  CreateItemPurple,
  DeletePurple,
  CreateTranslation,
  Art,
  Edit,
  CreateItem,
  ActionDots,
  Delete,
  Dust,
  DeleteInventory,
} from '../HemeIconLibrary';
import { buildNewKitAction } from '../Actions/kitBuilder';
import FormContainer from '../components/Formik/formContainer';
import {
  setForm,
  editFormReducer,
  setFormCloseReducer,
  showSuccessReducer,
  setFormLoaderReducer,
} from '../Store/reducers/uiSettings';
import { getKitBuilderAction } from '../Actions/kitBuilder';
import { getStorageLocationTreeAction } from '../Actions/storageLocation';
import {
  getAllItemAction,
  createNewItemAction,
  uploadFileItemAction,
  addLanguageForItemAction,
  addItemInventoryAction,
  editLanguageForItemAction,
  deleteNewItemAction,
  deleteItemsLanguageAction,
  updateNewItemAction,
} from '../Actions/inventory';
import {
  getTypesAction,
  getAllItemCategoriesAction,
  getAllInventoryLanguages,
} from '../Actions/common';
import { quantityChcek, negativeQuantityCheck } from '../components/Formik/allFormValidation';
import { createNewItem } from '../components/Formik/AllForms/createNewItem';
import { addNewInventory } from '../components/Formik/AllForms/addInventory';
import { createNewItemVersion } from '../components/Formik/AllForms/createItemTranslation';
import { addNewInventoryCheck } from '../components/Formik/AllForms/addInventoryCheck';
import createNewItemValidator from '../components/Formik/allFormValidation/createItem';
import { ConfirmKitBuilder } from '../components/Formik/AllForms/confirmKitBuilder';
import { InventoryItemColumns } from '../components/Tables';
import { inventoryKitBuilder } from '../components/Formik/AllForms/inventoryKitbuilder';
import { getType } from '../helpers/getType';
import { filter } from 'smart-array-filter';
const Inventory = () => {
  const dispatch = useDispatch();
  const { uisettings, allItems, common, builder } = useSelector(
    (state) => state
  );
  const [updatedData, setUpdatedData] = useState();
  const [searchQuery, setsearchQuery] = React.useState('');
  // const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [filteredData, setfilteredData] = useState(null);

  useEffect(() => {
    (async () => {
      if (allItems?.allItems) {
        if (searchQuery) {
          const searchResult = filter(allItems?.allItems, {
            keywords: searchQuery, // search for any field that contains the "Do" string

            caseSensitive: false,
          });

          setfilteredData(searchResult);
        } else {
          setfilteredData(allItems?.allItems || []);
        }
      }
    })();
  }, [searchQuery, allItems?.allItems]);

  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [okBtnText, setokBtnText] = useState();
  const [okBtnIcon, setokBtnIcon] = useState();
  const [cancelBtnText, setCancelBtnText] = useState();
  const [cancelBtnIcon, setSancelBtnIcon] = useState();

  //callallEnventoryRequiredAPI
  useEffect(() => {
    getAllItemAction();
    getTypesAction();
    getAllItemCategoriesAction();
    getAllInventoryLanguages();
    getKitBuilderAction();
    getStorageLocationTreeAction();
  }, []);

  // control item thresold switch
  useEffect(() => {
    createNewItem[6].disabled = !common.switch.threshold;
    createNewItem[6].initialValue = "";
    addNewInventory[8].disabled = !common.switch.threshold;
    addNewInventory[3].disabled = !common.switch.threshold;
    if (common.switch.threshold) {
      createNewItem[6].required = true;
      addNewInventory[3].required = true;
      addNewInventory[8].required = true;
    } else {
      createNewItem[6].required = false;
      addNewInventory[3].required = false;
      addNewInventory[8].required = false;
    }
  }, [common.switch]);

  // CTA item add
  const addInventoryCTA = (edit) => {
    setCTA(() => async (data) => {
      if (edit) {
        dispatch(setFormLoaderReducer(true));
        const imageToUpload = data.fileId;
        const editIem = await updateNewItemAction(edit, data);
        if (editIem?.data?.id) {
          if (imageToUpload) {
            const imageCreation = await uploadFileItemAction(
              editIem.data?.id,
              imageToUpload
            );
            if (imageCreation.data.id) {
              dispatch(setFormCloseReducer());
            }
          } else {
            dispatch(setFormCloseReducer());
          }
        }
        dispatch(setFormLoaderReducer(false));
        dispatch(showSuccessReducer(`${editIem.data.name} item updated.`));
      } else {
        dispatch(setFormLoaderReducer(true));
        const imageToUpload = data.fileId;
        const createNewIem = await createNewItemAction(data);
        if (createNewIem?.status === 200) {
          if (imageToUpload) {
            const imageCreation = await uploadFileItemAction(
              createNewIem.data?.id,
              imageToUpload
            );
            // if (imageCreation.data.id) {
            //   dispatch(setFormCloseReducer());
            // }
          } else {
            // dispatch(setFormCloseReducer());
          }
          dispatch(
            showSuccessReducer(`${createNewIem.data.name} item created.`)
          );
          setformName('Add Inventory');
          setFormIcon(<AddInventoryPurple />);
          setokBtnText('Yes');
          setCancelBtnText('No');
          setUpdatedData([
            {
              label:
                'Would you like to add inventory to the item you just created?',
              initialValue: '',
              name: 'expire',
              fluid: true,
              type: 'table',
            },
          ]);
          setCTA(() => async (data) => {
            console.log(data);
            const result = await getItemCategoryByIdAction(
              createNewIem?.data?.itemCategory?.id
            );

            var customEnventory = [];
            result.data?.fields?.forEach((field, index) => {
              var obj = {};
              if (!field.isStandard) {
                obj.type = getType(field.format?.name);
                obj.name = field.id || undefined;
                obj.label = field.name || undefined;
                obj.initialValue = field.value || undefined;
                obj.required = field.isRequired || false;
                obj.placeholder = field.placeholder || field.name;
                obj.options = field.options || [];
                customEnventory.push(obj);
              }
            });
            addNewInventory[0].initialValue = createNewIem?.data.id;
            addNewInventory[0].placeholder = createNewIem?.data.name;
            addNewInventory[0].disabled = true;
            addNewInventory[7].initialValue = false;

            setokBtnText('Save');
            setCancelBtnText('Cancel');
            setUpdatedData([...addNewInventory, ...customEnventory]);
            addInventoryForItemCTA();
            dispatch(setForm({ state: true, type: 'addInventory' }));
          });
        }

        dispatch(setFormLoaderReducer(false));
      }
    });
    setFormValidation((error, values) => (error, values) => {
      createNewItemValidator(error, values);
    });
  };

  // CTA Item verison
  const addVersionCTA = (id, type) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      let createNewIemVerison;
      if (type === 'edit') {
        createNewIemVerison = await editLanguageForItemAction(id, data);
      } else {
        createNewIemVerison = await addLanguageForItemAction(id, data);
      }
      if (createNewIemVerison?.data?.id) {
        dispatch(setFormCloseReducer());
        dispatch(
          showSuccessReducer(
            `${createNewIemVerison.data.name} ${type === 'edit' ? 'version updated.' :'version created.'}`
          )
        );
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  // CTA for inventory for selected item
  const addInventoryForItemCTA = () => {
    setCTA(() => async (id, data) => {
      dispatch(setFormLoaderReducer(true));

      delete data.StorageLocation;
      const createNewIem = await addItemInventoryAction(id, {
        fields: data,
      });
      if (createNewIem?.data?.id) {
        dispatch(setFormCloseReducer());
        dispatch(
          showSuccessReducer(
            `${createNewIem.data.quantity} ${createNewIem.data.item?.name} added.`
          )
        );
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  //CTA for remove

  const deleteInventoryForItemCTA = async (id, name, reason) => {
    dispatch(setFormLoaderReducer(true));
    const deleteNewIem = await deleteNewItemAction(id, reason);
    if (deleteNewIem?.status === 200) {
      dispatch(
        setForm({
          state: false,
          type: '',
        })
      );
      dispatch(showSuccessReducer(`${name} deleted.`));
    }
    dispatch(setFormLoaderReducer(false));
  };

  const deleteLanguageForItemCTA = async (name, itemName, itemId, langId) => {
    const deleteLang = await deleteItemsLanguageAction(itemId, langId);
    if (deleteLang?.status === 200) {
      dispatch(
        showSuccessReducer(`${name} translation deleted for ${itemName}.`)
      );
    }
  };

  const addkitTemplate = async (data, store) => {
    console.log(data, store);
    dispatch(setFormLoaderReducer(true));
    const { uisettings, builder } = store;
    const createNewIem = await buildNewKitAction(uisettings.editForm?.id, {
      qty: uisettings.editForm?.selectedQuantity,
      storageLocationId: data?.locationId?.id,
      closeToExpiryAlert: data.closeToExpiryAlert,
      closeToExpiryDays: data.closeToExpiryNumberOfDays,
      items: builder.buildKit?.items?.map((item) => {
        return item.lots.map((lot, counter) => {
          if (counter === 0) {
            return { id: lot.id };
          }
        })?.[0];
      }),
    });
    if (createNewIem?.status === 200) {
      dispatch(setFormCloseReducer());
      dispatch(
        showSuccessReducer(
          `${createNewIem?.data?.quantity} ${createNewIem?.data?.item?.name} Kit added.`
        )
      );
    }
    dispatch(setFormLoaderReducer(false));
  };

  const callCreateNewItem = () =>{
    createNewItem[4].options = common.allTypes;
    createNewItem[1].options = common.allCategories;
    createNewItem[0].disabled = false;
    createNewItem[1].disabled = false;
    createNewItem[0].initialValue = '';
    createNewItem[1].initialValue = '';
    createNewItem[2].initialValue = '';
    createNewItem[5].initialValue = '';
    createNewItem[1].placeholder = 'Select category';
    createNewItem[4].placeholder = 'Select unit Type';
    createNewItem[6].initialValue = '';
    createNewItem[7].initialValue = false;
    setformName('Create New Item');
    setFormIcon(<CreateItemPurple />);
    setokBtnText('Save');
    setCancelBtnText('Cancel');
    // createNewItem = createNewItem?.filter((item) => item.name !== "change_reason");
    setUpdatedData(
      createNewItem?.filter((item) => item.name !== 'change_reason')
    );
    addInventoryCTA();
    dispatch(setForm({ state: true, type: 'additem' }));
  }

  return (
    <>
      <div className="flex gap-[10px] justify-between items-end">
        <HemaHeadingWithSubText
          heading="Inventory Management"
          sub="Manage your inventory here."
        />
        <div className="flex gap-[10px] ">
          {allItems?.allItems && filteredData?.length > 0 ? <Button
            text="Add Inventory"
            Icon={<Add color="white" />}
            color="text-white"
            bg="bg-primary1"
            cta={() => {
              addNewInventoryCheck[0].options = allItems?.allItems;
              addNewInventoryCheck[0].disabled = false;
              addNewInventoryCheck[0].placeholder = 'Select an item';
              addNewInventoryCheck[0].initialValue = '';
              addNewInventory[7].initialValue = false;
              addNewInventory[8].disabled = true;
              addNewInventory[3].disabled = true;

              setCTA(() => async (data) => {
                const itemFound = allItems?.allItems.filter(
                  (item) => item.id === data.itemName
                )?.[0];
                if (itemFound) {
                  if (itemFound.itemCategory?.name === 'H-Kit') {
                    // const row = builder?.allTemplates?.filter(
                    //   (kit) => kit.id === itemFound?.kitId
                    // )?.[0];
                    //if (itemFound) {
                    dispatch(editFormReducer(itemFound));
                    //  }
                    inventoryKitBuilder[0].initialValue = itemFound.name;

                    setformName(`Build Kit`);
                    setFormIcon(<CreateItem />);
                    setUpdatedData(inventoryKitBuilder);
                    // addInventoryForItemCTA();
                    dispatch(setForm({ state: true, type: 'addKit' }));
                    setFormValidation(() => (error, values, store) => {
                      quantityChcek(error, values, store);
                    });
                    setokBtnText('Build');
                    setCTA(() => async (data) => {
                      dispatch(
                        editFormReducer({
                          ...itemFound,
                          selectedQuantity: data?.qty,
                        })
                      );
                      setformName(`Build Kit`);
                      setformName(`${itemFound.name} Kit Template`);
                      setFormIcon(<AddInventory />);
                      dispatch(
                        setForm({
                          state: true,
                          type: 'edit-kit-template',
                        })
                      );
                      setCTA(() => async () => {
                        dispatch(
                          setForm({ state: true, type: 'confirm-kit-template' })
                        );
                        setokBtnText('Confirm');
                        setUpdatedData(ConfirmKitBuilder);
                        setformName('Build Kit');
                        setFormIcon(<CreateItem />);
                        dispatch(setFormLoaderReducer(false));
                        setCTA(() => async (data, undefined, store) => {
                          addkitTemplate(data, store);
                        });
                      });
                    });
                  } else {
                    const result = await getItemCategoryByIdAction(
                      itemFound.itemCategory.id
                    );

                    

                    var customEnventory = [];
                    result.data?.fields?.forEach((field, index) => {
                      var obj = {};
                      if (!field.isStandard) {
                        obj.type = getType(field.format?.name);
                        obj.name = field.id || undefined;
                        obj.label = field.name || undefined;
                        obj.initialValue = field.value || undefined;
                        obj.required = field.isRequired || false;
                        obj.placeholder = field.placeholder || field.name;
                        obj.options = field.options || [];
                        customEnventory.push(obj);
                      }
                    });

                    setformName('Add Inventory');
                    setFormIcon(<AddInventoryPurple />);
                    addNewInventory[0].initialValue = itemFound?.id;
                    addNewInventory[0].placeholder = itemFound.name;
                    addNewInventory[0].disabled = true;
                    addNewInventory[7].initialValue = false;
                    addNewInventory[8].disabled = true;
                    addNewInventory[3].disabled = true;
                    setUpdatedData([...addNewInventory, ...customEnventory]);
                    addInventoryForItemCTA();
                    dispatch(setForm({ state: true, type: 'addInventory' }));
                  }
                }
              });
              setformName('Add Inventory');
              setFormIcon(<AddInventoryPurple />);
              setUpdatedData(addNewInventoryCheck);
              dispatch(setForm({ state: true, type: 'addInventory1stStep' }));
              setFormValidation(() => (error, values, store) => {
                negativeQuantityCheck(error, values);
              });
              setokBtnText('Create');
            }}
          /> : <></>}
          <Button
            text="Create New Item"
            Icon={<Add color="white" />}
            color="text-white"
            bg="bg-primary1"
            cta={() => {
              callCreateNewItem();
            }}
          />
        </div>
      </div>
      <Alert />
      <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px]">
        <FormSearch
          w="w-[400px]"
          searchQuery={searchQuery}
          setsearchQuery={setsearchQuery}
        />
      </div>
      {allItems?.allItems ? (
        filteredData?.length > 0 ? (
          <DataTable
            data={filteredData}
            columns={[
              {
                cell: (row) => {
                  return (
                    <div>
                      <div className="flex items-center gap-[5px] meta mb-[12px]">
                        <HemaLabel text="Item Name" showCaret />
                        <Link to={`/inventory/${row.id}`}>
                          <HemaValue
                            text={row?.name || '--'}
                            color="textColor"
                          />
                        </Link>
                      </div>
                      <div className="flex items-center gap-[5px] meta mb-[12px]">
                        <HemaLabel text="Category" showCaret />
                        <HemaValue
                          text={row?.itemCategory?.name || '--'}
                          color="textColor"
                        />
                      </div>
                      <div className="flex items-center gap-[5px] meta mb-[12px]">
                        <HemaLabel text="Translation" showCaret />
                        {row.translations?.map((data) => (
                          <div className="flex cursor-pointer items-center gap-[4px] hover-language-icon-delete">
                            <HemaValue
                              text={data?.name}
                              cta={() => {
                                dispatch(editFormReducer(row));
                                createNewItemVersion[0].disabled = true;
                                createNewItemVersion[0].initialValue = data.id;
                                createNewItemVersion[0].placeholder = data.name;
                                createNewItemVersion[1].initialValue =
                                  data.itemName;
                                createNewItemVersion[2].initialValue =
                                  data.itemDescription;
                                createNewItemVersion[2].placeholder =
                                  'Enter description';
                                createNewItemVersion[3].disabled = true;
                                createNewItemVersion[4].disabled = true;
                                createNewItemVersion[5].disabled = true;
                                createNewItemVersion[3].placeholder =
                                  row.itemCategory?.name;
                                createNewItemVersion[3].initialValue =
                                  row.itemCategory?.id;
                                createNewItemVersion[4].initialValue =
                                  row.unitType?.name;
                                createNewItemVersion[5].initialValue =
                                  row.unitSize;
                                setUpdatedData(createNewItemVersion);
                                setformName('Update Translation');
                                setFormIcon(<CreateItemPurple />);
                                dispatch(
                                  setForm({ state: true, type: 'editversion' })
                                );
                                addVersionCTA(row.id, 'edit');
                              }}
                              style={{ cursor: 'pointer' }}
                              color="text-[#3D88E0]"
                            />
                            <div
                              className="mx-[10px] hidden"
                              onClick={() => {
                                deleteLanguageForItemCTA(
                                  data.name,
                                  row?.name,
                                  row.id,
                                  data?.id
                                );
                              }}
                            >
                              <Dust color="red" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                },
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
              },
              ...InventoryItemColumns,

              {
                cell: (row) => {
                  return (
                    <div className="flex-grow four">
                      <div className="flex justify-end gap-[5px] meta mb-[12px]">
                        <Button
                          Icon={<Add />}
                          color="text-white"
                          bg="bg-bgActionDots"
                          cta={async () => {
                            if (row.itemCategory?.name === 'H-Kit') {
                              const row1 = builder?.allTemplates?.filter(
                                (kit) => kit.id === row?.kitId
                              )?.[0];
                              if (row1) {
                                dispatch(editFormReducer(row1));
                              }
                              inventoryKitBuilder[0].initialValue = row.name;

                              setformName(`Build Kit`);
                              setFormIcon(<AddInventoryPurple />);
                              setUpdatedData(inventoryKitBuilder);
                              // addInventoryForItemCTA();
                              dispatch(
                                setForm({ state: true, type: 'addKit' })
                              );
                              setFormValidation(
                                () => (error, values, store) => {
                                  quantityChcek(error, values, store);
                                }
                              );
                              setokBtnText('Build');
                              setCTA(() => async (data) => {
                                dispatch(
                                  editFormReducer({
                                    ...row,
                                    selectedQuantity: data?.qty,
                                  })
                                );
                                setformName(`Build Kit`);
                                setformName(`${row.name} Kit Template`);
                                setFormIcon(<AddInventoryPurple />);
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'edit-kit-template',
                                  })
                                );
                                setCTA(() => async () => {
                                  dispatch(
                                    setForm({
                                      state: true,
                                      type: 'confirm-kit-template',
                                    })
                                  );
                                  setokBtnText('Confirm');
                                  setUpdatedData(ConfirmKitBuilder);
                                  setformName('Build Kit');
                                  setFormIcon(<AddInventoryPurple />);
                                  dispatch(setFormLoaderReducer(false));
                                  setCTA(
                                    () => async (data, undefined, store) => {
                                      addkitTemplate(data, store);
                                    }
                                  );
                                });
                              });
                            } else {
                              const result = await getItemCategoryByIdAction(
                                row.itemCategory.id
                              );

                              var customEnventory = [];
                              result.data?.fields?.forEach((field, index) => {
                                var obj = {};
                                if (!field.isStandard) {
                                  obj.type = getType(field.format?.name);
                                  obj.name = field.id || undefined;
                                  obj.label = field.name || undefined;
                                  obj.initialValue = field.value || undefined;
                                  obj.required = field.isRequired || false;
                                  obj.placeholder =
                                    field.placeholder || field.name;
                                  obj.options = field.options || [];
                                  customEnventory.push(obj);
                                }
                              });

                              setformName('Add Inventory');
                              setFormIcon(<AddInventoryPurple />);
                              addNewInventory[0].initialValue = row?.id;
                              addNewInventory[0].placeholder = row.name;
                              addNewInventory[0].disabled = true;
                              addNewInventory[7].initialValue = false;
                              addNewInventory[8].disabled = true;
                              setUpdatedData([
                                ...addNewInventory,
                                ...customEnventory,
                              ]);
                              addInventoryForItemCTA();
                              dispatch(
                                setForm({ state: true, type: 'addInventory' })
                              );
                            }
                          }}
                        />
                        <NavDropdown
                          title={
                            <Button
                              Icon={<ActionDots />}
                              color="text-white"
                              bg="bg-bgActionDots"
                            />
                          }
                          className="hema-ellipse-dropdown"
                        // id="navbarScrollingDropdown"
                        >
                          <NavDropdown.Item
                            className="mb-1"
                            onClick={() => {
                              createNewItem[0].initialValue = row?.name;
                              createNewItem[0].disabled = true;
                              createNewItem[1].initialValue =
                                row?.itemCategory?.id;
                              createNewItem[1].placeholder =
                                row?.itemCategory?.name;
                              createNewItem[1].disabled = true;
                              createNewItem[2].initialValue = row?.description;
                              createNewItem[3].storageUrl = row?.image != null ? row?.image?.storageUrl : undefined;
                              createNewItem[4].options = common?.allTypes;
                              createNewItem[4].initialValue = row?.unitType?.id;
                              createNewItem[4].placeholder =
                                row?.unitType?.name || 'Select Unit Type';
                              createNewItem[5].initialValue = row?.unitSize;
                              createNewItem[7].initialValue =
                                row?.lowInventoryThreshold ? true : false;
                              createNewItem[6].initialValue =
                                row.lowInventoryThreshold;
                              createNewItem[6].disabled =
                                row.lowInventoryThreshold ? false : true;

                              setUpdatedData(createNewItem);
                              setformName('Edit Item');
                              setFormIcon(<ExpiryAlertPurple />);
                              dispatch(editFormReducer(row));
                              addInventoryCTA(row.id);
                              dispatch(
                                setForm({ state: true, type: 'editItem' })
                              );
                            }}
                          >
                            <div className="flex gap-[10px] items-center">
                              <Edit color="#3D88E0" />
                              <HemaValue text="Edit" />
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            className="mb-1"
                            cta={() => {
                              Remove[0].label = 'Assembly Name';
                              Remove[0].initialValue = row?.item?.name;
                              setUpdatedData(Remove);
                              setformName('Delete Assembly Item');
                              setFormIcon(<DeletePurple />);
                              dispatch(
                                setForm({
                                  state: true,
                                  type: 'deleteItem',
                                })
                              );
                            }}
                            onClick={() => {
                              Remove[0].label = 'Item Name';
                              Remove[0].initialValue = row?.name;
                              setformName('Delete Item');
                              setFormIcon(<DeletePurple />);
                              dispatch(
                                setForm({
                                  state: true,
                                  type: 'deleteItem',
                                })
                              );
                              setUpdatedData(Remove);
                              setCTA(() => async (data) => {
                                deleteInventoryForItemCTA(
                                  row.id,
                                  row.name,
                                  data?.change_reason
                                );
                              });
                            }}
                          >
                            <div className="flex gap-[10px] items-center">
                              <Delete color="#3D88E0" />
                              <HemaValue text="Delete" />
                            </div>
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            className="mb-1"
                            onClick={() => {
                              dispatch(editFormReducer(row));
                              createNewItemVersion[0].options =
                                common?.allInventorylanguages;
                              createNewItemVersion[0].disabled = false;
                              createNewItemVersion[1].initialValue = row.name;
                              createNewItemVersion[2].initialValue =
                                row.description;
                              createNewItemVersion[2].placeholder =
                                'Enter description';
                              createNewItemVersion[3].disabled = true;
                              createNewItemVersion[4].disabled = true;
                              createNewItemVersion[5].disabled = true;
                              createNewItemVersion[3].placeholder =
                                row.itemCategory?.name;
                              createNewItemVersion[3].initialValue =
                                row.itemCategory?.id;
                              createNewItemVersion[4].initialValue =
                                row.unitType?.name;
                              createNewItemVersion[5].initialValue =
                                row.unitSize;
                              setUpdatedData(
                                createNewItemVersion?.filter(
                                  (rem) => rem.name !== 'change_reason'
                                )
                              );
                              setformName('Create New Translation');
                              setFormIcon(<CreateTranslation />);
                              dispatch(
                                setForm({ state: true, type: 'editversion' })
                              );
                              addVersionCTA(row.id);
                            }}
                          >
                            <div className="flex gap-[10px] items-center">
                              <Art color="#3D88E0" />
                              <HemaValue text="Translate" />
                            </div>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    </div>
                  );
                },
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
              },
            ]}
            pagination
            paginationComponentOptions={{
              selectAllRowsItem: true,
              selectAllRowsItemText: 'ALL',
              rowsPerPageText: 'Showing',
            }}
            customStyles={{
              table: {
                style: { background: 'transparent !important', border: 'none' },
              },
              responsiveWrapper: {
                style: { overflow: 'visible !important' },
              },

              head: { style: { display: 'none' } },
              cells: {
                style: {
                  flexGrow: '1 !important',
                  justifyContent: 'left !important',
                },
              },
              rows: {
                style: {
                  padding: '9px 16px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                },
              },
            }}
          />
        ) : (
          <AlertBootstrap variant="warning" className="text-center">
            There are no records to display
          </AlertBootstrap>
        )
      ) : (
        <>
          <br />
          <Skeleton count={4} />
          <br />
          <Skeleton count={4} />
          <br />
          <Skeleton count={4} />
        </>
      )}

      {uisettings?.openform && (
        <FormContainer
          cta={CTA}
          formType={updatedData}
          formName={formName}
          Icon={formIcon}
          formValidation={formValidation}
          setUpdatedData={setUpdatedData}
          setCTA={setCTA}
          cancelBtnIcon={cancelBtnIcon}
          cancelBtnText={cancelBtnText}
          okBtnIcon={okBtnIcon}
          okBtnText={okBtnText}
          setokBtnIcon={setokBtnIcon}
          setokBtnText={setokBtnText}
          callCreateNewItem={callCreateNewItem}
        />
      )}
    </>
  );
};

export default Inventory;
