import { createKitBuilder, getAllBuilder, buildKitItemDetail, buildNewKit, removeBuildKit } from '../Services/kitBuilder';
import { getAllTemplate, updateBuildKit, addnewTemplate, removeBuildKitreducer } from '../Store/reducers/kitBuilder';

import { store } from '../Store';

const createKitBuilderAction = async (data) => {
  const result = await createKitBuilder(data);
  if (result.status === 200) {
    store.dispatch(addnewTemplate(result.data?.item));
  }
  return result;
};

const getKitBuilderAction = async () => {
  const result = await getAllBuilder();
  if (result.status === 200) {
    store.dispatch(getAllTemplate(result.data));
    return result;
  }
};

const buildKitItemDetailAction = async (id, quantity) => {
  const result = await buildKitItemDetail(id, quantity);
  if (result.status === 200) {
    store.dispatch(updateBuildKit(result.data));
  }
  return result;
};

const buildNewKitAction = async (id, data) => {
  const result = await buildNewKit(id, data);
  if (result.status === 200) {
    //   store.dispatch(updateBuildKit(result.data))
  }
  return result;
};

const removeBuildKitAction = async (id, reason) => {
  const result = await removeBuildKit(id, reason);
  if (result.status === 200) {
    store.dispatch(removeBuildKitreducer(id));
  }
  return result;
};

export { removeBuildKitAction, createKitBuilderAction, getKitBuilderAction, buildKitItemDetailAction, buildNewKitAction };
