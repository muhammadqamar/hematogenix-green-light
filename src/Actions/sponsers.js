import {
  createNewSponser,
  getAllSponsers,
  editSponser,
  getAllSponserStudies,
  getAllSponserSites,
} from '../Services/sponser';
import { store } from '../Store';
import {
  setAllSponseSitesReducer,
  setAllSponsersReducer,
  addNewItemsReducer,
  editSponserReducer,
  setAllSponseStudiesReducer,
} from '../Store/reducers/sponser';

const getAllSponserAction = async (data) => {
  const result = await getAllSponsers(data);
  if (result.status === 200) {
    store.dispatch(setAllSponsersReducer(result?.data));
  }
};

const getAllSponserSitesAction = async (id) => {
  const result = await getAllSponserSites(id);
  if (result.status === 200) {
    store.dispatch(setAllSponseSitesReducer(result?.data));
  }
};
const  getAllSponserStudiesAction = async (id) => {
  const result = await getAllSponserStudies(id);
  if (result.status === 200) {
    store.dispatch(setAllSponseStudiesReducer(result?.data));
  }
};

const createNeSponserAction = async (data) => {
  const result = await createNewSponser(data);
  if (result?.data) {
    store.dispatch(addNewItemsReducer(result?.data));
  }
  return result;
};
const updateNewSponserAction = async (sponserId, data) => {
  const result = await editSponser(sponserId, data);
  store.dispatch(editSponserReducer({ id: sponserId, data: result.data }));
  return result;
};
export {
  getAllSponserSitesAction,
  createNeSponserAction,
  getAllSponserAction,
  updateNewSponserAction,
  getAllSponserStudiesAction,
};
