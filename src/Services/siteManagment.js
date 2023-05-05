import { post, get, put, remove } from './http';
import { errorHandling } from './error';

const createNewSite = async (data) => {
  try {
    return await post(`site/sites`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getAllUnconfiguredSites = async (studyId) => {
  try {
    return await get(`logistic-builder/studies/${studyId}/not-configured-sites`);
  } catch (e) {
    console.log(e);
  }
};
const getAllSites = async (data) => {
  try {
    return await get(`site/sites/active-inactive`, data);
  } catch (e) {
    console.log(e);
  }
};
const editSudy = async (id, data) => {
  try {
    return await put(`site/sites/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

export { createNewSite, getAllSites, editSudy, getAllUnconfiguredSites };
