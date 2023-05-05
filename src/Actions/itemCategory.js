import { setSelectedCategoryReducer } from '../Store/reducers/common';
import {
  setItemCategoriesReducer,
  createItemCategoryCustomFieldReducer,
  removeItemCategoryFieldReducer
} from '../Store/reducers/storageLocation';
import {
  removeItemCategoryReducer,
  addItemCategoryReducer,
} from '../Store/reducers/common';

import {
  getItemCategoryById,
  createItemCategory,
  updateItemCategoryById,
  deleteItemCategoryById,
  getFieldsForNewCategory,
  createItemCategoryCustomField,
  deleteItemCategoryByFieldId,
  updateBulkCustomFields
} from '../Services/itemCategory';
import { store } from '../Store';

const createItemCategoryAction = async (data) => {
  const createdItem = await createItemCategory(data);
  store.dispatch(addItemCategoryReducer(createdItem.data));
  return createdItem;
};

const getItemCategoryByIdAction = async (id, data) => {
  const result = await getItemCategoryById(id, data);
  console.log("category items data",result.data);
  store.dispatch(setItemCategoriesReducer(result.data));

  return result;
};

const updateItemCategoryByIdAction = async (id, data) => {
  const result = await updateItemCategoryById(id, data);
  store.dispatch(setSelectedCategoryReducer(result.data));
  return result;
};

const deleteItemCategoryByIdAction = async (id, reason) => {
  const result = await deleteItemCategoryById(id, reason);
  if (result?.status === 200) {
    store.dispatch(removeItemCategoryReducer(id));
  }
  return result;
};

const deleteItemCategoryFieldIdAction = async (id,fieldId, reason) => {
  const result = await deleteItemCategoryByFieldId(id,fieldId,reason);
  if (result?.status === 200) {
    store.dispatch(removeItemCategoryFieldReducer(fieldId));
  }
  return result;
};

const getFieldsForNewCategoryAction = async () => {
  const result = await getFieldsForNewCategory();
  return result;
};

const createItemCategoryCustomFieldAction = async (id, data) => {
  const result = await createItemCategoryCustomField(id, data);
  if (result?.status === 200) {
    store.dispatch(createItemCategoryCustomFieldReducer(result.data));
  }
  return result;
};

const updateBulkCustomFieldsAction = async (id, data, reason) => {
  const result = await updateBulkCustomFields(id, data, reason);
  if (result?.status === 200) {
  //  store.dispatch(createItemCategoryCustomFieldReducer(result.data));
  }
  return result;
};

export {
  updateBulkCustomFieldsAction,
  createItemCategoryAction,
  updateItemCategoryByIdAction,
  getItemCategoryByIdAction,
  deleteItemCategoryByIdAction,
  getFieldsForNewCategoryAction,
  createItemCategoryCustomFieldAction,
  deleteItemCategoryFieldIdAction
};
