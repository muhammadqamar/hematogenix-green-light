import { post, get, put } from './http';
import { errorHandling } from './error';

const getAllSitesForCountry = async (id) => {
  try {
    return await get(`/logistic-builder/countries/${id}/sites`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const getAllSitesForCountryDetail = async (id) => {
    try {
      return await get(`/logistic-builder/sites/${id}`);
    } catch (err) {
      //errorHandling(err?.response?.data)
      return err?.response?.data;
    }
  };

  const createNewSiteLogistic = async (countryId,siteId,data) => {
    try {
      return await post(`/logistic-builder/countries/${countryId}/sites/${siteId}`,data);
    } catch (err) {
      errorHandling(err?.response?.data)
      return err?.response?.data;
    }
  };

  const updateSiteLogistic = async (id,data) => {
    try {
      return await put(`/logistic-builder/sites/${id}`,data);
    } catch (err) {
      errorHandling(err?.response?.data)
      return err?.response?.data;
    }
  };

export { getAllSitesForCountry, getAllSitesForCountryDetail, createNewSiteLogistic, updateSiteLogistic };
