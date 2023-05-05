import { post, get, put, remove } from './http';
import { errorHandling } from './error';

const createNewItem = async (data) => {
  try {
    return await post(`inventory/items`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getItemById = async (id) => {
  try {
    return await get(`inventory/items/${id}`);
  } catch (e) {
    console.log(e);
    return e;
  }
};

const updateItem = async (id, data) => {
  try {
    return await put(`inventory/items/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const deleteItem = async (id, reason) => {
  try {
    return await remove(`inventory/items/${id}?change_reason=${reason}`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const deleteLanguageVersion = async (itemId, langId) => {
  try {
    return await remove(`inventory/items/${itemId}/versions/${langId}`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getAllItem = async (data) => {
  try {
    return await get(`inventory/items/manage`, data);
  } catch (e) {
    console.log(e);
  }
};

const uploadFileItem = async (id, data) => {
  try {
    return await put(`inventory/items/${id}/file`, data, {
      'Content-Type': 'multipart/form-data',
    });
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

//inventory
const getAllItemInventory = async (id, type, stock, state) => {
  try {
    return await get(`inventory/${type}/${id}/${stock}/${state}`);
  } catch (e) {
    console.log(e);
  }
};

const updateAllItemInventory = async (itemId, inventoryId, state, data) => {
  try {
    return await post(`inventory/items/${itemId}/inventories/${inventoryId}/${state}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const addItemInventory = async (id, data) => {
  try {
    return await post(`inventory/items/${id}/new-inventories`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const deleteItemInventory = async (id, inventoryId, reason) => {
  try {
    return await remove(`inventory/items/${id}/inventories/${inventoryId}?changeReason=${reason}`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const updateExpiryAlert = async (itemId, inventoryId, data) => {
  try {
    return await put(`inventory/items/${itemId}/inventories/${inventoryId}/expiry-alert`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getLanguageForItem = async (langId, itemId) => {
  try {
    return await get(`inventory/items/${itemId}/version/${langId}`);
  } catch (e) {
    console.log(e);
  }
};

const addLanguageForItem = async (itemId, data) => {
  try {
    return await post(`inventory/items/${itemId}/versions`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const editLanguageForItem = async (itemId, data) => {
  try {
    return await put(`inventory/items/${itemId}/versions?change_reason=${data?.change_reason}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

export {
  editLanguageForItem,
  updateExpiryAlert,
  updateAllItemInventory,
  deleteItemInventory,
  deleteItem,
  createNewItem,
  getAllItem,
  uploadFileItem,
  updateItem,
  getAllItemInventory,
  getLanguageForItem,
  addLanguageForItem,
  addItemInventory,
  deleteLanguageVersion,
  getItemById,
};
