import { post, get, put, remove } from './http';
import { errorHandling } from './error';

const createNewStudy = async (data) => {
  try {
    return await post(`study/studies`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};
const getAllStudies = async (data) => {
  try {
    return await get(`study/studies/active-inactive`, data);
  } catch (e) {
    console.log(e);
  }
};
const editSudy = async (id, data) => {
  try {
    return await put(`study/studies/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

export { createNewStudy, getAllStudies, editSudy };
