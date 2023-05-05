import { post, get, put, remove } from './http';
import { errorHandling } from './error';

const getItemCategoryById = async (id) => {
  try {
    return await get(`inventory/item-categories/${id}`);
  } catch (e) {
    console.log(e);
    return e;
  }
};

const createItemCategory = async (data) => {
  try {
    return await post(`inventory/item-categories`, data);
  } catch (e) {
    errorHandling(e?.response?.data);
  }
};

const createItemCategoryCustomField = async (id, data) => {
  try {
    return await post(`inventory/item-categories/${id}/fields`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const updateItemCategoryById = async (id, data) => {
  try {
    return await put(`inventory/item-categories/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const deleteItemCategoryById = async (id, reason) => {
  try {
    return await remove(`inventory/item-categories/${id}?changeReason=${reason}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const deleteItemCategoryByFieldId = async (id, fieldId, reason) => {
  try {
    return await remove(`inventory/item-categories/${id}/fields/${fieldId}?changeReason=${reason}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const getFieldsForNewCategory = async () => {
  try {
    return await get(`inventory/item-categories/new`);
  } catch (e) {
    console.log(e);
  }
};

const updateBulkCustomFields = async (id, data, reason) => {
  try {
    return await put(`inventory/item-categories/${id}/fields?changeReason=${reason}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

export {
  updateBulkCustomFields,
  getItemCategoryById,
  createItemCategory,
  updateItemCategoryById,
  deleteItemCategoryById,
  getFieldsForNewCategory,
  createItemCategoryCustomField,
  deleteItemCategoryByFieldId,
};
