import { getDetailRecordId, getAllOrders, approve, reject } from '../Services/all';

import { setAllOrder, setActiveOrder } from '../Store/reducers/orders';

import { store } from '../Store';

const getAllOrderAction = async () => {
  const result = await getAllOrders();
  if (result.status === 200) {
    store.dispatch(setAllOrder(result.data));
  }
  return result;
};

const getDetailRecordIdAction = async (id) => {
  const result = await getDetailRecordId(id);
  if (result.status === 200) {
    store.dispatch(setActiveOrder(result.data));
  }
  return result;
};


const approveAction = async (id, data) => {
  const result = await approve(id,data);

  return result;
};
const rejectAction = async (id, data) => {
  const result = await reject(id,data);

  return result;
};


export { getAllOrderAction, getDetailRecordIdAction, approveAction, rejectAction };
