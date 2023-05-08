import { post, get } from './http';
import { errorHandling } from './error';


const getAllOrders = async () => {
  try {
    return await get(`/portal/green-light/submissions`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const getDetailRecordId = async (id, data) => {
  try {
    return await get(`/portal/green-light/submissions/${id}`, data);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const approve = async (id, data) => {
  try {
    return await post(`/portal/green-light/submissions/${id}/approve`, data);
  } catch (err) {
    errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const reject = async (id,data) => {
  try {
    return await post(`/portal/green-light/submissions/${id}/reject`,data);
  } catch (err) {
    errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};




export { getDetailRecordId, getAllOrders, approve, reject };
