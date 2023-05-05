import { post, get, remove } from './http';
import { errorHandling } from './error';

const createKitBuilder = async (data) => {
  try {
    return await post(`/inventory/kits`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const getAllBuilder = async (data) => {
  try {
    return await get(`/inventory/kits/template-builder`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const buildKitItemDetail = async (id, qty) => {
  try {
    return await get(`/inventory/kits/${id}/build/${qty}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const buildNewKit = async (id, data) => {
  try {
    return await post(`/inventory/kits/${id}/build`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const removeBuildKit = async (id, reason) => {
  try {
    return await remove(`/inventory/kits/${id}?changeReason=${reason}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

export { createKitBuilder, getAllBuilder, buildKitItemDetail, buildNewKit, removeBuildKit };
