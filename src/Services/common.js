import { get } from './http';

const getAllTypes = async (data) => {
  try {
    return await get(`inventory/common/unit-types`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getAllCategories = async (data) => {
  try {
    return await get(`inventory/item-categories`, data);
  } catch (e) {
    console.log(e);
  }
};

const getAllinventorylangs = async () => {
  try {
    return await get(`inventory/translation/languages`);
  } catch (e) {
    console.log(e);
  }
};

const getAllFormats = async () => {
  try {
    return await get(`inventory/common/field-formats`);
  } catch (e) {
    console.log(e);
  }
};

const droptownItemsForAssembly = async (id, data) => {
  try {
    return await get(`assembly-builder/assemblies/items`);
  } catch (err) {
    return err?.response?.data;
  }
};

const itemCategoryFormat = async (id, data) => {
  try {
    return await get(`inventory/common/field-formats`);
  } catch (err) {
    // return err?.response?.data
  }
};

export {
  itemCategoryFormat,
  getAllTypes,
  getAllCategories,
  getAllinventorylangs,
  getAllFormats,
  droptownItemsForAssembly,
};
