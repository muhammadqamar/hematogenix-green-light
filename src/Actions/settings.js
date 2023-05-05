import { store } from '../Store';
import {
  setCompanyLoaction,
  removeCompanyLocation,
  setSystemUser,
  removeSystemUser,
  setPortalUser,
  removePortalUser,
  setUserRoles,
  setSites,
  setPermission,
  setaddNewRole,
  setdeleteRole,
  setupdateRole,
} from '../Store/reducers/settings';

// company location action
const getCompanyLocationAction = async () => {
  const result = await getCompanyLocation();
  store.dispatch(setCompanyLoaction(result?.data || []));
};

const createCompanyLocationAction = async (payload) => {
  const result = await createCompanyLocation(payload);
  return result;
};

const updateCompanyLocationAction = async (id, payload) => {
  const result = await updateCompanyLocation(id, payload);
  return result;
};

const deleteCompanyLocationAction = async (id, reason) => {
  const result = await deleteCompanyLocation(id, reason);
  if (result?.status === 200) {
    store.dispatch(removeCompanyLocation(id));
  }
  return result;
};

// system user action
const getSystemUserAction = async () => {
  const result = await getSystemUser();
  store.dispatch(setSystemUser(result?.data || []));
};

const createSystemUserAction = async (payload) => {
  const result = await createSystemUser(payload);
  return result;
};

const getSystemUserDownloadAction = async (payload) => {
  const result = await getSystemUserDownload(payload);
  return result;
};
const createSystemUserUploadAction = async (payload) => {
  const result = await createSystemUserUpload(payload);
  return result;
};

const updateSystemUserAction = async (id, payload) => {
  const result = await updateSystemUser(id, payload);
  return result;
};

const deleteSystemUserAction = async (id, reason) => {
  const result = await deleteSystemUser(id, reason);
  if (result?.status === 200) {
    store.dispatch(removeSystemUser(id));
  }
  return result;
};

// system user action
const getPortalUserAction = async () => {
  const result = await getPortalUser();
  store.dispatch(setPortalUser(result?.data || []));
};

const createPortalUserAction = async (payload) => {
  const result = await createPortalUser(payload);
  return result;
};

const getPortalUserDownloadAction = async (payload) => {
  const result = await getPortalUserDownload(payload);
  return result;
};
const createPortalUserUploadAction = async (payload) => {
  const result = await createPortalUserUpload(payload);
  return result;
};

const getPortalUserByIdAction = async (id) => {
  const result = await getPortalUserById(id);
  return result;
};

const updatePortalUserAction = async (id, payload) => {
  const result = await updatePortalUser(id, payload);
  return result;
};

const deletePortalUserAction = async (id, reason) => {
  const result = await deletePortalUser(id, reason);
  if (result?.status === 200) {
    store.dispatch(removePortalUser(id));
  }
  return result;
};

const fetchUserRoles = async () => {
  const result = await fetchUserRolesList();
  if (result.status === 200) {
    store.dispatch(setUserRoles(result?.data || []));
  }
};

const getSitesAction = async () => {
  const result = await getSiteList();
  store.dispatch(setSites(result?.data || []));
};

const getPerimssionAction = async () => {
  const result = await getPerimssion();
  if (result.status === 200) {
    store.dispatch(setPermission(result?.data || []));
  }
};

const createNewRoleAction = async (data) => {
  const result = await createNewRole(data);
  if (result.status === 200) {
    store.dispatch(setaddNewRole(result?.data));
  }
  return result;
};

const updateRoleAction = async (id, data) => {
  const result = await updateRole(id, data);
  if (result.status === 200) {
    store.dispatch(setupdateRole(result?.data));
  }
  return result;
};
const deleteRoleAction = async (id, reason) => {
  const result = await deleteRole(id, reason);
  if (result.status === 200) {
    store.dispatch(setdeleteRole(id));
  }
  return result;
};

export {
  updateRoleAction,
  deleteRoleAction,
  createNewRoleAction,
  getPerimssionAction,
  getCompanyLocationAction,
  createCompanyLocationAction,
  updateCompanyLocationAction,
  deleteCompanyLocationAction,
  getSystemUserAction,
  createSystemUserAction,
  getSystemUserDownloadAction,
  createSystemUserUploadAction,
  updateSystemUserAction,
  deleteSystemUserAction,
  getPortalUserAction,
  createPortalUserAction,
  getPortalUserDownloadAction,
  createPortalUserUploadAction,
  getPortalUserByIdAction,
  updatePortalUserAction,
  deletePortalUserAction,
  fetchUserRoles,
  getSitesAction,
};
