import { post, get, put } from './http';
import { errorHandling } from './error';

const getAllCountryForRegion = async (id) => {
  try {
    return await get(`/logistic-builder/regions/${id}/countries`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const getAllCountryForRegionDetail = async (id) => {
  try {
    return await get(`/logistic-builder/countries/${id}`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const getShippingDeport = async () => {
  try {
    return await get(`/logistic-builder/countries/available-shippingDepots`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getGreenLightTypes = async () => {
  try {
    return await get(`/logistic-builder/countries/greenlight-required-types`);
  } catch (err) {
    return err?.response?.data;
  }
};

const createNewCountryLogistic = async (regionId, id, data) => {
  try {
    return await post(
      `/logistic-builder/region/${regionId}/country/${id}`,
      data
    );
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const updateCountryLogistic = async (id, data) => {
  try {
    return await put(`/logistic-builder/countries/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

export {
  getAllCountryForRegion,
  getAllCountryForRegionDetail,
  updateCountryLogistic,
  createNewCountryLogistic,
  getShippingDeport,
  getGreenLightTypes
};
