import { post, get, put, remove } from './http';
import { errorHandling } from './error';
const getStorageLocationTree = async () => {
  try {
    return await get(`inventory/storage-locations/tree`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getStorageLocationById = async (id) => {
  try {
    return await get(`inventory/storage-locations/${id}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err;
  }
};

const createStorageLocation = async (data) => {
  try {
    if (data.isParentLocation) {
      return await post(`inventory/company-locations`, data);
    } else {
      return await post(`inventory/storage-locations`, data);
    }
  } catch (err) {
    errorHandling(err?.response?.data);
    return err;
  }
};

const updateStorageLocationById = async (id, data) => {
  try {
    return await put(`inventory/storage-locations/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err;
  }
};

const deleteStorageLocationById = async (id) => {
  try {
    return await remove(`inventory/storage-locations/${id}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err;
  }
};

const moveStorageLocation = async (sourceLocationId, targetLocationId) => {
  try {
    return await post(
      `inventory/storage-locations/${sourceLocationId}/move/${targetLocationId}`
    );
  } catch (err) {
    errorHandling(err?.response?.data);
    return err;
  }
};

export {
  createStorageLocation,
  getStorageLocationTree,
  getStorageLocationById,
  updateStorageLocationById,
  deleteStorageLocationById,
  moveStorageLocation,
};
