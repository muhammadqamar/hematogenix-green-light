import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';

import HemaHeadingWithSubText from '../utils/HemaHeadingWithSubText';
import { Button, HemaValue, Alert } from '../utils';
import {
  DeleteInventory,
  ReadyIcon,
  CheckReady,
  ActionCursor,
  UsedGradientInventory,
  UsedInventory,
  MoveInventory,
  LostInventory,
  ExpiryAlertPurple,
  DeletePurple,
  TickPurple,
  DisposeInventory,
  ExpireInventory,
  TabDamaged,
  DamageInventory,
  TapLost,
  TabExpired,
  TabDeleted,
  TabDisposed,
  ActionDots,
} from '../HemeIconLibrary';
import FormContainer from '../components/Formik/formContainer';
import {
  setForm,
  editFormReducer,
  setFormCloseReducer,
  showSuccessReducer,
  setFormLoaderReducer,
} from '../Store/reducers/uiSettings';
import {
  getAllInventoriesAction,
  updateAllItemInventoryAction,
  deleteItemInventoryAction,
  updateExpiryAlertAction,
  getAllItemAction,
  getItemByIdAction,
} from '../Actions/inventory';

import { getTypesAction, getAllItemCategoriesAction } from '../Actions/common';
import { createNewItem } from '../components/Formik/AllForms/createNewItem';
import { useInventory } from '../components/Formik/AllForms/useInventory';
import { useInventoryAll } from '../components/Formik/AllForms/useInventoryAll';
import { deleteInventory } from '../components/Formik/AllForms/deleteInvetory';
import { moveInventoryForm } from '../components/Formik/AllForms/moveInvenotry';
import { editExpiryAlertForm } from '../components/Formik/AllForms/editExpiryAlert';
import { InventoryColumns } from '../components/Tables';
import Hemadatatable from '../components/datatables/itemdetailHematable';
const getStatus = (type) => {
  let text = '';
  alert(type)
  switch (type) {
    case 'use':
      text = 'used';
      break;
    case 'loss':
      text = 'lost';
      break;
    case 'damage':
      text = 'damaged';
      break;
    case 'delete':
      text = 'deleted';
      break;
    case 'dispose':
      text = 'disposed';
      break;
      case 'change-location':
        text = 'moved to new location';
        break;
    default:
      text = '';
  }
  return text;
};

const InventoryDetail = () => {
  const dispatch = useDispatch();
  const { uisettings, allItems, common } = useSelector((state) => state);
  let { id } = useParams();

  /* form states */
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [catType, setcatType] = useState('');
  const [formValidation, setFormValidation] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [searchQuery, setsearchQuery] = useState('');
  const [activeTab, setactiveTab] = useState();
  const [filteredData, setfilteredData] = useState([]);
  const [okBtnText, setokBtnText] = useState();
  const [okBtnIcon, setokBtnIcon] = useState();
  const [cancelBtnText, setCancelBtnText] = useState();
  const [cancelBtnIcon, setSancelBtnIcon] = useState();

  useEffect(() => {
    (async () => {
      const typeCheck = await getItemByIdAction(id);
      if (typeCheck?.status === 200) {
        setcatType(typeCheck?.data.itemCategory.name);
        if (typeCheck?.data.itemCategory.name === 'H-kit') {
          getAllInventoriesAction(id, 'kits', 'inventory-management', 'ready');
          getAllInventoriesAction(
            id,
            'kits',
            'inventory-management',
            'expired'
          );
          getAllInventoriesAction(
            id,
            'kits',
            'inventory-management',
            'damaged'
          );
          getAllInventoriesAction(id, 'kits', 'inventory-management', 'lost');
          getAllInventoriesAction(
            id,
            'kits',
            'inventory-management',
            'disposed'
          );
          getAllInventoriesAction(
            id,
            'kits',
            'inventory-management',
            'deleted'
          );
          getAllInventoriesAction(id, 'kits', 'inventory-management', 'used');
        } else {
          getAllInventoriesAction(id, 'items', 'inventories', 'ready');
          getAllInventoriesAction(id, 'items', 'inventories', 'expired');
          getAllInventoriesAction(id, 'items', 'inventories', 'damaged');
          getAllInventoriesAction(id, 'items', 'inventories', 'lost');
          getAllInventoriesAction(id, 'items', 'inventories', 'disposed');
          getAllInventoriesAction(id, 'items', 'inventories', 'deleted');
          getAllInventoriesAction(id, 'items', 'inventories', 'used');
        }
      }

      getAllItemAction();
      getTypesAction();
      getAllItemCategoriesAction();
    })();
  }, []);

  // control item thresold switch
  useEffect(() => {
    createNewItem[7].disabled = !common.switch.threshold;
  }, [common.switch.threshold]);

  const addInventoryCTAUse = (item, state) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const createNewIem = await updateAllItemInventoryAction(
        id,
        item.id,
        state,
        {
          ...data,
          locationId: data?.locationId?.id,
        }
      );
      if (createNewIem?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(
          showSuccessReducer(`${data.qty} ${data.name} ${getStatus(state)}.`)
        );
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const expireInventoryCTA = (item, state) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const createNewIem = await updateAllItemInventoryAction(
        id,
        item.id,
        state,
        data
      );
      if (createNewIem?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${data.qty} ${data.name} expired.`));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const deleteInventoryCTA = (item, state) => {
    setCTA(() => async (data) => {
      console.log(data);
      dispatch(setFormLoaderReducer(true));
      const createNewIem = await deleteItemInventoryAction(
        id,
        item.id,
        data?.change_reason
      );
      if (createNewIem?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${data.qty} ${data.name} deleted.`));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const expireAlertInventoryCTA = (item, state) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const createNewIem = await updateExpiryAlertAction(id, item.id, data);
      if (createNewIem?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(` expire alert updated.`));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };
  useEffect(() => {
    const regex = new RegExp(searchQuery, 'i');
    (async () => {
      if (activeTab === 'Ready') {
        const data = allItems?.itemReadyInventory?.filter((obj) => {
          for (const key in obj) {
            if (regex.test(obj[key])) {
              return true;
            }
          }
          return false;
        });
        setfilteredData(data);
      } else {
        setfilteredData(allItems?.itemReadyInventory);
      }
    })();
  }, [searchQuery, allItems?.itemReadyInventory]);

  return (
    <>
      <div className="flex gap-[10px] justify-between items-end">
        <HemaHeadingWithSubText
          heading="Inventory Management"
          sub="Manage your inventory here."
        />
      </div>

      <Alert />
      <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
        <Tabs
          defaultActiveKey="Ready"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(key) => {
            setactiveTab(key);
          }}
        >
          <Tab
            eventKey="Ready"
            title={
              <div className="flex items-center gap-1 title-icon">
                <ReadyIcon /> Ready
              </div>
            }
          >
            <Hemadatatable
              allItems={allItems?.itemReadyInventory || []}
              InventoryColumns={[
                ...InventoryColumns,
                {
                  name: 'Actions',
                  cell: (row) => {
                    return (
                      <div className="flex-grow four">
                        <div className="flex justify-end gap-[5px] meta">
                          <Button
                            Icon={<ActionCursor />}
                            color="text-white"
                            bg="bg-bgActionDots"
                            cta={() => {
                              useInventory[0].initialValue = row.item?.name;
                              useInventory[1].initialValue = row.location?.name;
                              useInventory[2].initialValue = row.lotNumber;
                              useInventory[3].initialValue = row.expirationDate;
                              setUpdatedData(useInventory);
                              setformName('Use Inventory');
                              setFormIcon(<TickPurple />);
                              dispatch(editFormReducer(row));
                              addInventoryCTAUse(row, 'use');
                              dispatch(
                                setForm({ state: true, type: 'use-inventory' })
                              );
                            }}
                          />
                          {/* <Button Icon={<Edit />} color="text-white" bg="bg-bgActionDots" /> */}
                          <NavDropdown
                            title={
                              <Button
                                Icon={<ActionDots />}
                                color="text-white"
                                bg="bg-bgActionDots"
                              />
                            }
                            // id="navbarScrollingDropdown"
                            className="hema-ellipse-dropdown"
                          >
                            <NavDropdown.Item
                              className="mb-1"
                              onClick={() => {
                                dispatch(editFormReducer(row));

                                moveInventoryForm[0].initialValue =
                                  row.item.name;
                                moveInventoryForm[1].initialValue =
                                  row.location?.name;
                                moveInventoryForm[2].initialValue =
                                  row.lotNumber;
                                moveInventoryForm[3].initialValue =
                                  row.expirationDate;

                                setUpdatedData(moveInventoryForm);
                                setformName('Move Inventory');
                                setFormIcon(<MoveInventory />);
                                addInventoryCTAUse(row, 'change-location');
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'change-location-inventory',
                                  })
                                );
                              }}
                            >
                              Move
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              className="mb-1"
                              onClick={() => {
                                useInventory[0].initialValue = row.item?.name;
                                useInventory[1].initialValue =
                                  row.location?.name;
                                useInventory[2].initialValue = row.lotNumber;
                                useInventory[3].initialValue =
                                  row.expirationDate;
                                setUpdatedData(useInventory);
                                dispatch(editFormReducer(row));
                                setformName('Damage');
                                setFormIcon(<DamageInventory />);
                                addInventoryCTAUse(row, 'damage');
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'use-inventory',
                                  })
                                );
                              }}
                            >
                              Mark as Damaged
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              className="mb-1"
                              onClick={() => {
                                useInventory[0].initialValue = row.item?.name;
                                useInventory[1].initialValue =
                                  row.location?.name;
                                useInventory[2].initialValue = row.lotNumber;
                                useInventory[3].initialValue =
                                  row.expirationDate;
                                setUpdatedData(useInventory);
                                dispatch(editFormReducer(row));
                                addInventoryCTAUse(row, 'loss');
                                setformName('Lost');
                                setFormIcon(<LostInventory />);
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'use-inventory',
                                  })
                                );
                              }}
                            >
                              Mark as Lost
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              className="mb-1"
                              onClick={() => {
                                useInventory[0].initialValue = row.item?.name;
                                useInventory[1].initialValue =
                                  row.location?.name;
                                useInventory[2].initialValue = row.lotNumber;
                                useInventory[3].initialValue =
                                  row.expirationDate;
                                setUpdatedData(useInventory);
                                dispatch(editFormReducer(row));
                                addInventoryCTAUse(row, 'dispose');
                                setformName('Dispose');
                                setFormIcon(<DisposeInventory />);
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'use-inventory',
                                  })
                                );
                              }}
                            >
                              Dispose
                            </NavDropdown.Item>

                            <NavDropdown.Item
                              className="mb-1"
                              onClick={() => {
                                dispatch(editFormReducer(row));
                                editExpiryAlertForm[0].initialValue =
                                  row.item?.name;
                                editExpiryAlertForm[1].initialValue =
                                  row.location?.name;
                                editExpiryAlertForm[2].initialValue =
                                  row.lotNumber;
                                editExpiryAlertForm[3].initialValue =
                                  row.expirationDate || 'N/A';
                                editExpiryAlertForm[4].initialValue =
                                  row.quantity;

                                expireAlertInventoryCTA(row, 'expire');
                                setformName('Edit Expiry Alert');
                                setFormIcon(<ExpiryAlertPurple />);
                                console.log(editExpiryAlertForm)
                                setUpdatedData(editExpiryAlertForm);

                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'expire-inventory',
                                  })
                                );
                              }}
                            >
                              Edit Expiry Alert
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              className="mb-1"
                              onClick={() => {
                                dispatch(editFormReducer(row));
                                useInventoryAll[0].initialValue = row.item.name;
                                useInventoryAll[1].initialValue =
                                  row.location?.name;
                                useInventoryAll[2].initialValue = row.lotNumber;
                                useInventoryAll[3].initialValue =
                                  row.expirationDate;
                                useInventoryAll[4].initialValue = row.quantity;

                                setformName('Expire Inventory');
                                setFormIcon(<ExpireInventory />);
                                expireInventoryCTA(row, 'expire');
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'expire-inventory',
                                  })
                                );
                                setUpdatedData(useInventoryAll);
                              }}
                            >
                              Expire (Admin)
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              className="mb-1"
                              onClick={() => {
                                dispatch(editFormReducer(row));
                                deleteInventory[0].initialValue = row.item.name;
                                deleteInventory[1].initialValue =
                                  row.location?.name;
                                deleteInventory[2].initialValue = row.lotNumber;
                                deleteInventory[3].initialValue =
                                  row.expirationDate;
                                deleteInventory[4].initialValue = row.quantity;
                                setUpdatedData(deleteInventory);
                                setformName('Delete Inventory');
                                setFormIcon(<DeletePurple />);
                                deleteInventoryCTA(row, 'delete');
                                dispatch(
                                  setForm({
                                    state: true,
                                    type: 'delete-inventory',
                                  })
                                );
                              }}
                            >
                              Delete (Admin)
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
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
              activeTab={activeTab}
              type={catType}
            />
          </Tab>
          {allItems?.itemUsedInventory?.length > 0 && (
            <Tab
              eventKey="Used"
              title={
                <div className="flex items-center gap-1 title-icon">
                  <UsedGradientInventory /> Used
                </div>
              }
            >
              <Hemadatatable
                allItems={allItems?.itemUsedInventory || []}
                InventoryColumns={[
                  ...InventoryColumns,
                  {
                    name: 'Used on',
                    cell: (row) => {
                      return <HemaValue text={row.createdUtc} />;
                    },
                  },
                ]}
                activeTab={activeTab}
              />
            </Tab>
          )}
          {allItems?.itemDamagedInventory?.length > 0 && (
            <Tab
              eventKey="Damaged"
              title={
                <div className="flex items-center gap-1 title-icon">
                  <TabDamaged /> Damaged
                </div>
              }
            >
              <Hemadatatable
                allItems={allItems?.itemDamagedInventory || []}
                InventoryColumns={[
                  ...InventoryColumns,
                  {
                    name: 'Damaged on',
                    cell: (row) => {
                      return <HemaValue text={row.createdUtc} />;
                    },
                  },
                ]}
                activeTab={activeTab}
              />
            </Tab>
          )}
          {allItems?.itemLostInventory?.length > 0 && (
            <Tab
              eventKey="Lost"
              title={
                <div className="flex items-center gap-1 title-icon">
                  <TapLost /> Lost
                </div>
              }
            >
              <Hemadatatable
                allItems={allItems?.itemLostInventory || []}
                InventoryColumns={[
                  ...InventoryColumns,
                  {
                    name: 'Lost on',
                    cell: (row) => {
                      return <HemaValue text={row.createdUtc} />;
                    },
                  },
                ]}
                activeTab={activeTab}
              />
            </Tab>
          )}
          {allItems?.itemDisposedInventory?.length > 0 && (
            <Tab
              eventKey="Disposed"
              title={
                <div className="flex items-center gap-1 title-icon">
                  <TabDisposed /> Disposed
                </div>
              }
            >
              <Hemadatatable
                allItems={allItems?.itemDisposedInventory || []}
                InventoryColumns={[
                  ...InventoryColumns,
                  {
                    name: 'Disposed on',
                    cell: (row) => {
                      return <HemaValue text={row.createdUtc} />;
                    },
                  },
                ]}
                activeTab={activeTab}
              />
            </Tab>
          )}
          {allItems?.itemExpiredInventory?.length > 0 && (
            <Tab
              eventKey="Expired"
              title={
                <div className="flex items-center gap-1 title-icon">
                  <TabExpired /> Expired
                </div>
              }
            >
              <Hemadatatable
                allItems={allItems?.itemExpiredInventory || []}
                InventoryColumns={[
                  ...InventoryColumns,
                  {
                    name: 'Expired on',
                    cell: (row) => {
                      return <HemaValue text={row.createdUtc} />;
                    },
                  },
                ]}
                activeTab={activeTab}
              />
            </Tab>
          )}
          {allItems?.itemDeletedInventory?.length > 0 && (
            <Tab
              eventKey="Deleted"
              title={
                <div className="flex items-center gap-1 title-icon">
                  <TabDeleted /> Deleted
                </div>
              }
            >
              <Hemadatatable
                allItems={allItems?.itemDeletedInventory || []}
                InventoryColumns={[
                  ...InventoryColumns,
                  {
                    name: 'Deleted on',
                    cell: (row) => {
                      return <HemaValue text={row.createdUtc} />;
                    },
                  },
                ]}
                activeTab={activeTab}
              />
            </Tab>
          )}
        </Tabs>
      </div>

      {uisettings?.openform && (
        <FormContainer
          cta={CTA}
          formType={updatedData}
          formName={formName}
          Icon={formIcon}
          formValidation={formValidation}
          cancelBtnIcon={cancelBtnIcon}
          cancelBtnText={cancelBtnText}
          okBtnIcon={okBtnIcon}
          okBtnText={okBtnText}
          setokBtnIcon={setokBtnIcon}
          setokBtnText={setokBtnText}
        />
      )}
    </>
  );
};

export default InventoryDetail;
