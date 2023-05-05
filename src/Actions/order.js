import {
  getDashbaordStats,
  getAllOrders,
  rejectAcknowledge,
  approveAcknowledge,
  createOrder,
  orderAvailableItems,
  getdefaultOrderValues,
  getOrderDetail,
  getAllAddress,
  getAcknowledgedetail,
  getAllBuildPreparation,
  unAssignLineItem,
  AssignPreparationKit,
  getShippingStats,
  AssignPreparationLineItem,
  updateOrder,
  getAllShipmentForOrderId,
  updateShipment,
  createNewShipment,
  getInvenotryItemforBuild,
  getAssembbliesforItem,
  getShipmentDetails,
  deletePackage,
  createPackage,
  updatePackage,
} from '../Services/order';

import {
  setDashbaord,
  setAllOrder,
  setDefaultValues,
  setItemAvailable,
  setAlladdresses,
  addNewOrder,
  setacknowledgedetails,
  setAllBuildPreparation,
  setAllStagingPreparation,
  setAllShipping,
  setActiveOrder,
  setAllAvailableShipment,
  setActiveShipment,
} from '../Store/reducers/orders';
import { setAllItemsReducer } from '../Store/reducers/items';

import { store } from '../Store';

const getAllOrderAction = async () => {
  const result = await getAllOrders();
  if (result.status === 200) {
    store.dispatch(setAllOrder(result.data));
  }
  return result;
};

const getOrderDetailAction = async (id) => {
  const result = await getOrderDetail(id);
  if (result.status === 200) {
    store.dispatch(setActiveOrder(result.data));
  }
  return result;
};

const getAcknowledgedetailAction = async (id) => {
  const result = await getAcknowledgedetail(id);
  if (result.status === 200) {
    store.dispatch(setacknowledgedetails(result.data));
  }
  return result;
};

const getAllAddressAction = async (id) => {
  const result = await getAllAddress(id);
  if (result.status === 200) {
    console.log(result);
    store.dispatch(setAlladdresses(result.data));
  }
  return result;
};
const getAssemblyforItemAction = async (orderId, itemId) => {
  const result = await getAssembbliesforItem(orderId, itemId);
  return result;
};

const getAllDashboardStatsAction = async () => {
  const result = await getDashbaordStats();
  if (result.status === 200) {
    store.dispatch(setDashbaord(result.data));
  }
  return result;
};

const createOrderAction = async (data) => {
  const result = await createOrder(data);
  if (result.status === 200) {
    store.dispatch(addNewOrder(result.data));
  }
  return result;
};
const getReadyInvenotryItemAction = async (itemId, data) => {
  const result = await getInvenotryItemforBuild(itemId, data);
  return result;
};

const getdefaultOrderValuesAction = async (siteId, typeId) => {
  const result = await getdefaultOrderValues(siteId, typeId);
  if (result.status === 200) {
    store.dispatch(setDefaultValues(result.data));
  }
  return result;
};
const getAllbuildPreparationAction = async (state, orderId) => {
  const result = await getAllBuildPreparation(state, orderId);
  if (result.status === 200) {
    if (state === 'building') {
      store.dispatch(setAllBuildPreparation(result.data));
    } else {
      store.dispatch(setAllStagingPreparation(result.data));
    }
  }
  return result;
};

const orderAvailableItemsAction = async (siteId, typeId) => {
  const result = await orderAvailableItems(siteId, typeId);
  if (result.status === 200) {
    store.dispatch(setItemAvailable(result.data));
    store.dispatch(setAllItemsReducer(result?.data));
  }
  return result;
};

const unAssignLineItemAction = async (orderId, itemId, assignType) => {
  const result = await unAssignLineItem(orderId, itemId, assignType);
  // if (result.status === 200) {
  //   store.dispatch(setItemAvailable(result.data));
  //   store.dispatch(setAllItemsReducer(result?.data));
  // }
  return result;
};
const AssignPreparationKitAction = async (orderId, data) => {
  const result = await AssignPreparationKit(orderId, data);
  // if (result.status === 200) {
  //   store.dispatch(setItemAvailable(result.data));
  //   store.dispatch(setAllItemsReducer(result?.data));
  // }
  return result;
};
const AssignPreLineItemAction = async (orderId, itemId) => {
  const result = await AssignPreparationLineItem(orderId, itemId);
  // if (result.status === 200) {
  //   store.dispatch(setItemAvailable(result.data));
  //   store.dispatch(setAllItemsReducer(result?.data));
  // }
  return result;
};

const getAllShippingStatsAction = async (orderId) => {
  const result = await getShippingStats(orderId);
  if (result.status === 200) {
    store.dispatch(setAllShipping(result.data));
  }
  return result;
};

const updateOrderAction = async (id, orderId) => {
  const result = await updateOrder(id, orderId);
  if (result.status === 200) {
    store.dispatch(setActiveOrder(result.data));
  }
  return result;
};

const approveAction = async (id, data) => {
  const result = await approveAcknowledge(id, data);
  if (result.status === 200) {
    store.dispatch(setActiveOrder(result.data));
  }
  return result;
};

const rejectAction = async (id, data) => {
  const result = await rejectAcknowledge(id, data);
  if (result.status === 200) {
    store.dispatch(setActiveOrder(result.data));
  }
  return result;
};
const getAllShipmentForOrderIdAction = async (id, data) => {
  const result = await getAllShipmentForOrderId(id, data);
  if (result.status === 200) {
    store.dispatch(setAllAvailableShipment(result.data));
  }
  return result;
};

const updateShipmentAction = async (id, data) => {
  const result = await updateShipment(id, data);
  // if (result.status === 200) {
  //   store.dispatch(setAllAvailableShipment(result.data));
  // }
  return result;
};

const createNewShipmentAction = async (id, data) => {
  const result = await createNewShipment(id, data);
  // if (result.status === 200) {
  //   store.dispatch(setAllAvailableShipment(result.data));
  // }
  return result;
};

const getShipmentDetailAction = async (id, shippingId) => {
  const result = await getShipmentDetails(id, shippingId);
  if (result.status === 200) {
    store.dispatch(setActiveShipment(result.data));
  }
  return result;
};

const createPackageAction = async (id, shippingId, data) => {
  const result = await createPackage(id, shippingId, data);

  return result;
};

const updatePackageAction = async (id, shippingId,packageId, data) => {
  const result = await updatePackage(id, shippingId,packageId, data);

  return result;
};

const deletePackageAction = async (id, shippingId,packageId) => {
  const result = await deletePackage(id, shippingId,packageId);

  return result;
}


export {
  createPackageAction,
  updatePackageAction,
  deletePackageAction,
  updateShipmentAction,
  getShipmentDetailAction,
  createNewShipmentAction,
  getAllShipmentForOrderIdAction,
  updateOrderAction,
  getAcknowledgedetailAction,
  getAllAddressAction,
  getOrderDetailAction,
  getdefaultOrderValuesAction,
  orderAvailableItemsAction,
  createOrderAction,
  getAllDashboardStatsAction,
  getAllOrderAction,
  getAllbuildPreparationAction,
  approveAction,
  rejectAction,
  unAssignLineItemAction,
  AssignPreparationKitAction,
  getAllShippingStatsAction,
  AssignPreLineItemAction,
  getReadyInvenotryItemAction,
  getAssemblyforItemAction,
};
