import { get, put, post, remove } from './http';
import { errorHandling } from './error';

const getAssemblyInboundCondition = async () => {
  try {
    return await get(`logistic-builder/shipping-conditions`);
  } catch (err) {
    return err?.response?.data;
  }
};
const getAllCuriorsList = async () => {
  try {
    return await get(`logistic-builder/couriers`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getAllCountryList = async () => {
  try {
    return await get(`logistic-builder/countries`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getAllLogisticLeveltree = async (logisticBuilderId) => {
  try {
    return await get(`logistic-builder/protocols/${logisticBuilderId}/all-levels-tree`);
  } catch (err) {
    return err?.response?.data;
  }
};
const getAllProtocols = async () => {
  try {
    return await get(`logistic-builder/protocols`);
  } catch (err) {
    return err?.response?.data;
  }
};
const getAllRegionsLogistic = async (logisticBuilderId) => {
  try {
    return await get(`logistic-builder/protocols/${logisticBuilderId}/regions`);
  } catch (err) {
    return err?.response?.data;
  }
};

const protocolDetailId = async (id) => {
  try {
    return await get(`logistic-builder/protocols/${id}`);
  } catch (err) {
    // errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const protocolRegionId = async (id) => {
  try {
    return await get(`logistic-builder/regions/${id}`);
  } catch (err) {
    // errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const updateProtocolLogisticBuilder = async (id, data) => {
  try {
    return await put(`logistic-builder/protocols/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const updateRegionLogisticBuilder = async (id, data) => {
  try {
    return await put(`logistic-builder/regions/${id}`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const assignShippingRuleLogistic = async (protocolName, logicticId, data) => {
  try {
    return await post(`logistic-builder/${protocolName}/${logicticId}/assign-shipping-rules`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const assignGeneralAssemblies = async (protocolName, id, data) => {
  try {
    return await post(`logistic-builder/${protocolName}/${id}/assign-general-assemblies`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const assignKitLogistic = async (data) => {
  try {
    return await post(`logistic-builder/assign-kits`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const unAssignKitLogistic = async (data) => {
  try {
    return await post(`logistic-builder/unassign-kits`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const addBulkKitTemplate = async (data) => {
  try {
    return await post(`logistic-builder/kit-templates/bulk-add`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const addRegionProtocolLogisticBuilder = async (logisticBuilderId, data) => {
  try {
    return await post(`logistic-builder/protocols/${logisticBuilderId}/regions`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const addKitTemplateAssembly = async (data) => {
  try {
    return await post(`logistic-builder/kit-template-assemblies/bulk-add`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const addKitTemplateAssemblyCopy = async (data) => {
  try {
    return await post(`logistic-builder/kit-template-assemblies/copy`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const getKitTemplateAssemblyCopy = async (id) => {
  try {
    return await get(`logistic-builder/kit-template-assemblies/${id}/copy`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const deleteKit = async (id, reason) => {
  try {
    return await remove(`logistic-builder/kit-templates/${id}?changeReason=dfd`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const deleteKitAssembly = async (id) => {
  try {
    return await remove(`logistic-builder/kit-template-assemblies/${id}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const submitForQC = async (id, data) => {
  try {
    return await post(`logistic-builder/protocols/${id}/qc-approval`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const approveForQC = async (id, data) => {
  try {
    return await post(`logistic-builder/protocols/${id}/qc-approval/approve`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const rejectForQC = async (id, data) => {
  try {
    return await post(`logistic-builder/protocols/${id}/qc-approval/reject`, data);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const getAllActiveUsers = async () => {
  try {
    return await get(`user/users`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getKitForEachLevel = async (id, lodId) => {
  try {
    return await get(`logistic-builder/${id}/${lodId}/kits`);
  } catch (err) {
    return err?.response?.data;
  }
};

export {
  getAllActiveUsers,
  getAssemblyInboundCondition,
  getAllCuriorsList,
  getAllCountryList,
  getAllProtocols,
  protocolDetailId,
  updateProtocolLogisticBuilder,
  addBulkKitTemplate,
  addKitTemplateAssembly,
  deleteKit,
  deleteKitAssembly,
  addRegionProtocolLogisticBuilder,
  getAllRegionsLogistic,
  protocolRegionId,
  getAllLogisticLeveltree,
  assignShippingRuleLogistic,
  addKitTemplateAssemblyCopy,
  getKitTemplateAssemblyCopy,
  assignKitLogistic,
  assignGeneralAssemblies,
  rejectForQC,
  approveForQC,
  submitForQC,
  getKitForEachLevel,
  updateRegionLogisticBuilder,
  unAssignKitLogistic,
};
