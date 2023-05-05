import { post, get, put, remove } from './http';
import { errorHandling } from './error';

const createNewSponser = async (data) => {
  try {
    return await post(`study/sponsors`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};
const getAllSponserStudies = async (id) => {
  try {
    return await get(`study/sponsors/${id}/studies`);
  } catch (e) {
    console.log(e);
  }
};
const getAllSponserSites = async (id) => {
  try {
    return await get(`/logistic-builder/studies/${id}/sites`);
  } catch (e) {
    console.log(e);
  }
};



const getAllSponsers = async (data) => {
  try {
    return await get(`study/sponsors/active-inactive`, data);
  } catch (e) {
    console.log(e);
  }
};
const editSponser = async (id, data) => {
  try {
    return await put(`study/sponsors/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

export { createNewSponser, getAllSponsers, editSponser, getAllSponserStudies, getAllSponserSites };
