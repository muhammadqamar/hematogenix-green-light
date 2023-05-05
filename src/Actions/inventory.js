import {
  getAllItem,
  createNewItem,
  uploadFileItem,
  updateItem,
  getAllItemInventory,
  addLanguageForItem,
  addItemInventory,
  updateAllItemInventory,
  deleteItemInventory,
  updateExpiryAlert,
  editLanguageForItem,
  deleteItem,
  deleteLanguageVersion,
  getItemById,
} from '../Services/inventory';
import { store } from '../Store';
import {
  setAllItemsReducer,
  addNewItemsReducer,
  addItemReadyInventoryReducer,
  addItemDamagedInventoryReducer,
  addItemExpiredInventoryReducer,
  addItemLostInventoryReducer,
  addItemDisposedInventoryReducer,
  addItemUsedInventoryReducer,
  addItemDeletedInventoryReducer,
  addItemReservedInventoryReducer,
  editItemInventoryReducer,
  addNewVersiontoItemReducer,
  editNewVersiontoItemReducer,
  editMoveItemInventoryReducer,
  editItemExpireInventoryReducer,
  deleteItemsReducer,
  deleteLanguageReducer,
  updateItemReducer,
  updateReadyCount,
} from '../Store/reducers/items';

const getAllItemAction = async (data) => {
  const result = await getAllItem(data);
  store.dispatch(setAllItemsReducer(result?.data));
};

const getItemByIdAction = async (data) => {
  const result = await getItemById(data);
  return result;
};

const createNewItemAction = async (data) => {
  delete data.fileId;
  const result = await createNewItem(data);
  if (result?.data) {
    store.dispatch(addNewItemsReducer(result?.data));
  }
  return result;
};

const updateNewItemAction = async (id, data) => {
  const result = await updateItem(id, data);
  store.dispatch(updateItemReducer(result?.data));
  return result;
};

const deleteNewItemAction = async (id, reason) => {
  const result = await deleteItem(id, reason);
  if (result?.status === 200) {
    store.dispatch(deleteItemsReducer(id));
  }
  return result;
};
const deleteItemsLanguageAction = async (itemId, langId) => {
  const result = await deleteLanguageVersion(itemId, langId);
  if (result?.status === 200) {
    store.dispatch(deleteLanguageReducer({ itemId, langId }));
  }
  return result;
};

const uploadFileItemAction = async (id, data) => {
  var formdata = new FormData();
  formdata.append('file', data);
  const result = await uploadFileItem(id, formdata);
  //store.dispatch(addNewItemsReducer(result.data))
};

// all inevntories action

const getAllInventoriesAction = async (id, type, stock, state) => {
  const result = await getAllItemInventory(id, type, stock, state);
  if (state === 'ready') {
    store.dispatch(addItemReadyInventoryReducer(result?.data));
  } else if (state === 'expired') {
    store.dispatch(addItemExpiredInventoryReducer(result?.data));
  } else if (state === 'damaged') {
    store.dispatch(addItemDamagedInventoryReducer(result?.data));
  } else if (state === 'lost') {
    store.dispatch(addItemLostInventoryReducer(result?.data));
  } else if (state === 'disposed') {
    store.dispatch(addItemDisposedInventoryReducer(result?.data));
  } else if (state === 'used') {
    store.dispatch(addItemUsedInventoryReducer(result?.data));
  } else if (state === 'deleted') {
    store.dispatch(addItemDeletedInventoryReducer(result?.data));
  } else if (state === 'reserved') {
    store.dispatch(addItemReservedInventoryReducer(result?.data));
  }
  return result;
};

const updateAllItemInventoryAction = async (itemId, inventoryId, state, data) => {
  const result = await updateAllItemInventory(itemId, inventoryId, state, data);
  if (result?.status === 200) {
    if (state === 'use') {
      store.dispatch(
        editItemInventoryReducer({
          id: inventoryId,
          quantity: data.qty,
          reducer: 'itemUsedInventory',
          data: result.data,
        }),
      );
    } else if (state === 'expire') {
      store.dispatch(
        editItemExpireInventoryReducer({
          id: inventoryId,
          quantity: data.qty,
          reducer: 'itemExpiredInventory',
          data: result.data,
        }),
      );
    } else if (state === 'damage') {
      store.dispatch(
        editItemInventoryReducer({
          id: inventoryId,
          quantity: data.qty,
          reducer: 'itemDamagedInventory',
          data: result.data,
        }),
      );
    } else if (state === 'loss') {
      store.dispatch(
        editItemInventoryReducer({
          id: inventoryId,
          quantity: data.qty,
          reducer: 'itemLostInventory',
          data: result.data,
        }),
      );
    } else if (state === 'dispose') {
      store.dispatch(
        editItemInventoryReducer({
          id: inventoryId,
          quantity: data.qty,
          reducer: 'itemDisposedInventory',
          data: result.data,
        }),
      );
    } else if (state === 'change-location') {
      store.dispatch(
        editMoveItemInventoryReducer({
          id: inventoryId,
          quantity: data.qty,
          data: result.data,
          reducer: '',
        }),
      );
    }
  }
  return result;
};
const deleteItemInventoryAction = async (itemId, inventoryId, reason) => {
  const result = await deleteItemInventory(itemId, inventoryId, reason);
  store.dispatch(editItemExpireInventoryReducer({ id: inventoryId, reducer: 'itemDeletedInventory', data: result?.data }));
  return result;
};

const addLanguageForItemAction = async (itemId, data) => {
  const result = await addLanguageForItem(itemId, data);
  store.dispatch(addNewVersiontoItemReducer({ itemid: itemId, data: result.data }));
  return result;
};

const editLanguageForItemAction = async (itemId, data) => {
  const result = await editLanguageForItem(itemId, data);
  store.dispatch(editNewVersiontoItemReducer({ itemid: itemId, data: result.data }));
  return result;
};

const addItemInventoryAction = async (itemId, data) => {
  const result = await addItemInventory(itemId, data);
  store.dispatch(updateReadyCount(result.data));
  return result;
};

const updateExpiryAlertAction = async (itemId, inventoryId, data) => {
  const result = await updateExpiryAlert(itemId, inventoryId, data);
  //store.dispatch(addNewItemsReducer(result.data))
  return result;
};

export {
  getAllItemAction,
  createNewItemAction,
  uploadFileItemAction,
  updateNewItemAction,
  getAllInventoriesAction,
  addLanguageForItemAction,
  addItemInventoryAction,
  updateAllItemInventoryAction,
  deleteItemInventoryAction,
  updateExpiryAlertAction,
  editLanguageForItemAction,
  deleteNewItemAction,
  deleteItemsLanguageAction,
  getItemByIdAction,
};
