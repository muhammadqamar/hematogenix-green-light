import { post, get, put, remove } from './http';
import { errorHandling } from './error';

const getDashbaordStats = async (id) => {
  try {
    return await get(`/order/dashboard`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const getShippingStats = async (orderId) => {
  try {
    return await get(`/shipping/orders/${orderId}/shipments`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const getAllOrders = async (id) => {
  try {
    return await get(`/order/orders`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};
const getInvenotryItemforBuild = async (itemId, data) => {
  try {
    return await get(`inventory/items/${itemId}/inventories/ready?minQuantity=${data}`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};
const getAssembbliesforItem = async (orderId, orderItemFulfillmentId) => {
  try {
    return await get(`order/orders/${orderId}/staging-items/${orderItemFulfillmentId}/assemblies`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const getAllBuildPreparation = async (state, orderId) => {
  try {
    return await get(`order/orders/${orderId}/preparation/${state}`);
  } catch (err) {
    //errorHandling(err?.response?.data)
    return err?.response?.data;
  }
};

const approveAcknowledge = async (id, data) => {
  try {
    return await post(`/order/orders/${id}/request/acknowledgement/approve`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const rejectAcknowledge = async (id, data) => {
  try {
    return await post(`/order/orders/${id}/request/acknowledgement/reject`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const getAcknowledgedetail = async (id) => {
  try {
    return await get(`/order/orders/${id}/request/acknowledgement`);
  } catch (err) {
    // errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const createOrder = async (data) => {
  try {
    return await post(`/order/orders/request`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const updateOrder = async (id, data) => {
  try {
    return await put(`/order/orders/${id}/request`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const unAssignLineItem = async (orderId, orderItemId, assignType) => {
  try {
    return await post(`order/orders/${orderId}/items/${orderItemId}/${assignType}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const AssignPreparationKit = async (orderId, data) => {
  try {
    return await post(`order/orders/${orderId}/assign`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const AssignPreparationLineItem = async (orderId, orderItemId) => {
  try {
    return await post(`order/orders/${orderId}/items/${orderItemId}/assign-custom-line-item`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const getdefaultOrderValues = async (siteId, typeId) => {
  try {
    return await get(`/order/orders/request?siteId=${siteId}&orderTypeId=${typeId}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const orderAvailableItems = async (siteId, typeId) => {
  try {
    return await get(`/order/available-items?siteId=${siteId}&orderTypeId=${typeId}`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getOrderDetail = async (id) => {
  try {
    return await get(`/order/orders/${id}/request`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getAllAddress = async (id) => {
  try {
    return await get(`/order/addresses`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getAllShipmentForOrderId = async (id) => {
  try {
    return await get(`/shipping/orders/${id}/shipments`);
  } catch (err) {
    return err?.response?.data;
  }
};

const createNewShipment = async (id, data) => {
  try {
    return await post(`/shipping/orders/${id}/shipments`, data);
  } catch (err) {
    return err?.response?.data;
  }
};

const updateShipment = async (id, shipmentId, data) => {
  try {
    return await put(`/shipping/orders/${id}/shipments/${shipmentId}`, data);
  } catch (err) {
    return err?.response?.data;
  }
};

const getShipmentDetails = async (id, shipmentId) => {
  try {
    return await get(`/shipping/orders/${id}/shipments/${shipmentId}`);
  } catch (err) {
    return err?.response?.data;
  }
};

const createPackage = async (id, shipmentId, data) => {
  try {
    return await post(`/shipping/orders/${id}/shipments/${shipmentId}/package`,data);
  } catch (err) {
    return err?.response?.data;
  }
};

const updatePackage = async (id, shipmentId, packageId, data) => {
  try {
    return await put(`/shipping/orders/${id}/shipments/${shipmentId}/package/${packageId}`,data);
  } catch (err) {
    return err?.response?.data;
  }
};

const deletePackage = async (id, shipmentId, packageId) => {
  try {
    return await remove(`/shipping/orders/${id}/shipments/${shipmentId}/package/${packageId}`);
  } catch (err) {
    return err?.response?.data;
  }
};




export {
  deletePackage,
  createPackage,
  updatePackage,
  updateShipment,
  createNewShipment,
  getAllShipmentForOrderId,
  updateOrder,
  getAcknowledgedetail,
  getAllAddress,
  orderAvailableItems,
  getdefaultOrderValues,
  createOrder,
  getDashbaordStats,
  getAllOrders,
  rejectAcknowledge,
  approveAcknowledge,
  getOrderDetail,
  getAllBuildPreparation,
  unAssignLineItem,
  AssignPreparationKit,
  getShippingStats,
  AssignPreparationLineItem,
  getInvenotryItemforBuild,
  getAssembbliesforItem,
  getShipmentDetails,
};
