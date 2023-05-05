import {
  getAllTypes,
  getAllCategories,
  getAllinventorylangs,
  getAllFormats,
  droptownItemsForAssembly,
  itemCategoryFormat,
} from '../Services/common';
import {
  setAllCategoriesReducer,
  setAllTypesReducer,
  setAllInventoryLangsReducer,
  setAllAllFormatsReducer,
  droptownItemsForAssemblyRedcuer,
  itemCategoryFormatReducer,
} from '../Store/reducers/common';
import { store } from '../Store';

const getTypesAction = async (data) => {
  const result = await getAllTypes();
  if (result?.data) {
    store.dispatch(setAllTypesReducer(result.data));
  }
};

const getAllItemCategoriesAction = async (data) => {
  const result = await getAllCategories(data);
  store.dispatch(setAllCategoriesReducer(result?.data));
};

const getAllInventoryLanguages = async (data) => {
  const result = await getAllinventorylangs(data);
  console.log('res', result);
  store.dispatch(setAllInventoryLangsReducer(result?.data));
};

const getAllFormatsActions = async () => {
  const result = await getAllFormats();
  store.dispatch(setAllAllFormatsReducer(result?.data));
};

const droptownItemsForAssemblyAction = async () => {
  const result = await droptownItemsForAssembly();
  store.dispatch(droptownItemsForAssemblyRedcuer(result?.data));
};

const itemCategoryFormatAction = async () => {
  const result = await itemCategoryFormat();
  store.dispatch(itemCategoryFormatReducer(result?.data));
};

export {
  itemCategoryFormatAction,
  droptownItemsForAssemblyAction,
  getTypesAction,
  getAllItemCategoriesAction,
  getAllInventoryLanguages,
  getAllFormatsActions,
};
