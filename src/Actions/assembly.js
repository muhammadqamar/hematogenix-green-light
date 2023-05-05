import { getAssemblyTypes, getTestingLabs, createAssembly, getAllAssemblies, removeAllAssembly, removeAssemblyItem,  } from '../Services/assembly';
import { setAllAssembliesAction, deleteAssemblies, addNewAssembly,deleteAssembliesForItem } from '../Store/reducers/assembly';
import {
  setAllAssemblyTypes,
  setAllTestingLabs,
} from '../Store/reducers/common';
import { store } from '../Store';

const getAllAssembliesAction = async () => {
  const result = await getAllAssemblies();
  if (result.status === 200) {
    store.dispatch(setAllAssembliesAction(result.data));
  }
  return result;
};

const getAssembliesTypeAction = async () => {
  const result = await getAssemblyTypes();
  if (result.status === 200) {
    store.dispatch(setAllAssemblyTypes(result.data));
  }
  return result;
};

const getTestingLabsAction = async () => {
  const result = await getTestingLabs();
  if (result.status === 200) {
    store.dispatch(setAllTestingLabs(result.data));
  }
  return result;
};

const createAssemblyAction = async (data) => {
  const result = await createAssembly(data);
  if (result.status === 200) {
    store.dispatch(addNewAssembly(result.data));
  }
  return result;
};

const removeAssemblyAction = async (id, data) => {
  const result = await removeAllAssembly(id, data);
  if (result.status === 200) {
    store.dispatch(deleteAssemblies(id));
  }
  return result;
};

const removeAssemblyItemAction = async (id, data, parent) => {
  const result = await removeAssemblyItem(id, data);
  if (result.status === 200) {
    store.dispatch(deleteAssembliesForItem({parent, id}));
  }
  return result;
};

export {
  getAssembliesTypeAction,
  getTestingLabsAction,
  getAllAssembliesAction,
  createAssemblyAction,
  removeAssemblyAction,
  removeAssemblyItemAction
};
