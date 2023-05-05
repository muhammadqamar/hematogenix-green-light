import { post, get, getBlob, put, remove } from "./http";
import { errorHandling } from "./error";

// company location
const getCompanyLocation = async () => {
  try {
    return await get(`inventory/company-locations`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const createCompanyLocation = async (payload) => {
  try {
    return await post(`inventory/company-locations`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const updateCompanyLocation = async (id, payload) => {
  try {
    return await put(`inventory/company-locations/${id}`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const deleteCompanyLocation = async (locationId, reason) => {
  try {
    return await remove(
      `inventory/company-locations/${locationId}?changeReason=${reason}`
    );
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

// system user
const getSystemUser = async () => {
  try {
    return await get(`user/users`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const createSystemUser = async (payload) => {
  try {
    return await post(`user/users`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getSystemUserDownload = async () => {
  try {
    return await getBlob(`user/users/download`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const createSystemUserUpload = async (payload) => {
  try {
    return await post(`user/users/upload`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const updateSystemUser = async (id, payload) => {
  try {
    return await put(`user/users/${id}`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const deleteSystemUser = async (locationId, reason) => {
  try {
    return await remove(`user/users/${locationId}?changeReason=${reason}`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

// portal user
const getPortalUser = async () => {
  try {
    return await get(`user/portal-users`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const createPortalUser = async (payload) => {
  try {
    return await post(`user/portal-users`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getPortalUserDownload = async () => {
  try {
    return await getBlob(`user/portal-users/download`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const createPortalUserUpload = async (payload) => {
  try {
    return await post(`user/portal-users/upload`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getPortalUserById = async (id) => {
  try {
    return await get(`user/portal-users/${id}`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const updatePortalUser = async (id, payload) => {
  try {
    return await put(`user/portal-users/${id}`, payload);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const deletePortalUser = async (locationId, reason) => {
  try {
    return await remove(`user/portal-users/${locationId}?changeReason=${reason}`);
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const fetchUserRolesList = async () => {
  try {
    return await get("user/roles");
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

const getSiteList = async () => {
  try {
    return await get("site/sites");
  } catch (err) {
    errorHandling(err?.response?.data);
  }
};

//Role

const getPerimssion = async () => {
  try {
    return await get("user/permission-areas");
  } catch (err) {
    //errorHandling(err?.response?.data);
    return err
  }
};


const createNewRole = async (data) => {
  try {
    return await post("user/roles",data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err
  }
};

const updateRole = async (id,data) => {
  try {
    return await put(`user/roles/${id}`,data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err
  }
};

const deleteRole = async (id,change) => {
  try {
    return await remove(`user/roles/${id}?changeReason=${change}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err
  }
}


export {
  deleteRole,
  updateRole,
  getPerimssion,
  createNewRole,
  getCompanyLocation,
  createCompanyLocation,
  updateCompanyLocation,
  deleteCompanyLocation,
  getSystemUser,
  createSystemUser,
  getSystemUserDownload,
  createSystemUserUpload,
  updateSystemUser,
  deleteSystemUser,
  getPortalUser,
  createPortalUser,
  getPortalUserDownload,
  createPortalUserUpload,
  getPortalUserById,
  updatePortalUser,
  deletePortalUser,
  fetchUserRolesList,
  getSiteList,
};
