import { createNewSite, getAllSites, editSudy, getAllUnconfiguredSites } from '../Services/siteManagment';
import { store } from '../Store';
import { setallSitesReducer, addNewSiteReducer, editSiteReducer } from '../Store/reducers/siteManagment';

const getAllSiteAction = async (data) => {
  const result = await getAllSites(data);
  store.dispatch(setallSitesReducer(result?.data));
};
const getAllUnconfiguredSiteAction = async (id) => {
  const result = await getAllUnconfiguredSites(id);
  store.dispatch(setallSitesReducer(result?.data));
};
const createNewSiteAction = async (data) => {
  const result = await createNewSite(data);
  if (result?.data) {
    store.dispatch(addNewSiteReducer(result?.data));
  }
  return result;
};
const updateSiteAction = async (sid, data) => {
  const result = await editSudy(sid, data);
  store.dispatch(editSiteReducer({ id: sid, data: result.data }));
  return result;
};
export { createNewSiteAction, getAllSiteAction, updateSiteAction, getAllUnconfiguredSiteAction };
