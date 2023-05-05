import {
  getAssemblyInboundCondition,
  getAllCountryList,
  getAllCuriorsList,
  getAllProtocols,
  protocolDetailId,
  updateProtocolLogisticBuilder,
  addBulkKitTemplate,
  addKitTemplateAssembly,
  addRegionProtocolLogisticBuilder,
  getAllRegionsLogistic,
  protocolRegionId,
  addKitTemplateAssemblyCopy,
  getKitTemplateAssemblyCopy,
  deleteKitAssembly,
  deleteKit,
  assignShippingRuleLogistic,
  getAllLogisticLeveltree,
  assignKitLogistic,
  assignGeneralAssemblies,
  rejectForQC,
  approveForQC,
  submitForQC,
  getAllActiveUsers,
  getKitForEachLevel,
  updateRegionLogisticBuilder,
  unAssignKitLogistic,
} from '../Services/logistic';

import {
  getAllCountryForRegion,
  getAllCountryForRegionDetail,
  updateCountryLogistic,
  createNewCountryLogistic,
  getShippingDeport,
  getGreenLightTypes,
} from '../Services/logisticCountry';
import { getAllSitesForCountry, getAllSitesForCountryDetail, createNewSiteLogistic, updateSiteLogistic } from '../Services/logisticSite';

import { getAssemblyInboundConditionReducer, setAllCountriesReducer, setAllCuriorsReducer } from '../Store/reducers/common';
import {
  setAllProtocols,
  setSelectedProtocolDetail,
  setAllRegionProtocols,
  setSelectedCountryDetail,
  setAllCountryProtocol,
  setAllSiteProtocol,
  getAlllowerLeveltreeReducer,
  setSelectedSiteDetail,
  setShiipingDeports,
  setGreenLights,
  updateSiteList,
  setSelectedRegionDetail,
  activeUsers,
  kitAtlevel,
  setSelectedProtocolKitDetail,
  removeKitfromList,
  removeKitfromKitAssemblyList,
  addnewAssemblytoKit,
  addNewRegionProtocols,
} from '../Store/reducers/logistic';
import { store } from '../Store';

const getAllCuriorsListAction = async (data) => {
  const result = await getAllCuriorsList();
  if (result?.data) {
    store.dispatch(setAllCuriorsReducer(result.data));
  }
};

const getAssemblyInboundConditionAction = async () => {
  const result = await getAssemblyInboundCondition();
  store.dispatch(getAssemblyInboundConditionReducer(result?.data));
};

const getAllLogisticLevelNode = async (id) => {
  const result = await getAllLogisticLeveltree(id);
  store.dispatch(getAlllowerLeveltreeReducer(result?.data));
};

const getAllRegionsProtocolsAction = async (id) => {
  const result = await getAllRegionsLogistic(id);
  store.dispatch(setAllRegionProtocols(result?.data));
};
const getCountriesLogisticBuilder = async () => {
  const result = await getAllCountryList();
  store.dispatch(setAllCountriesReducer(result?.data));
};

const getAllProtocolsAction = async () => {
  const result = await getAllProtocols();
  store.dispatch(setAllProtocols(result?.data));
};

const protocolDetailIdAction = async (id) => {
  const result = await protocolDetailId(id);
  store.dispatch(setSelectedProtocolDetail(result?.data));
};

const regionDetailIdAction = async (id) => {
  const result = await protocolRegionId(id);
  store.dispatch(setSelectedRegionDetail(result?.data));
};
const updateProtocolLogisticBuilderAction = async (id, data) => {
  const result = await updateProtocolLogisticBuilder(id, data);
  if (result.status === 200) {
    store.dispatch(setSelectedProtocolDetail(result?.data));
  }
  return result;
};
const updateRegionProtocolLogistic = async (id, data) => {
  const result = await updateRegionLogisticBuilder(id, data);
  if (result.status === 200) {
    store.dispatch(setSelectedRegionDetail(result?.data));
  }
  return result;
};

const assignShippingRuleAction = async (protocolName, id, data) => {
  const result = await assignShippingRuleLogistic(protocolName, id, data);
  // store.dispatch(setSelectedProtocolDetail(result?.data));
  return result;
};
const assignKitsAction = async (data) => {
  const result = await assignKitLogistic(data);
  // store.dispatch(setSelectedProtocolDetail(result?.data));
  return result;
};
const unAssignKitsAction = async (data) => {
  const result = await unAssignKitLogistic(data);
  // store.dispatch(setSelectedProtocolDetail(result?.data));
  return result;
};

const assignGeneralAssemblyAction = async (protocolName, id, data) => {
  const result = await assignGeneralAssemblies(protocolName, id, data);
  // store.dispatch(setSelectedProtocolDetail(result?.data));
  return result;
};

const addBulkKitTemplateAction = async (data) => {
  const result = await addBulkKitTemplate(data);
  store.dispatch(setSelectedProtocolKitDetail(result?.data));
  return result;
};
const addNewRegionProtocolLogistic = async (id, data) => {
  const result = await addRegionProtocolLogisticBuilder(id, data);
  store.dispatch(addNewRegionProtocols(result?.data));
  return result;
};

const addKitTemplateAssemblyAction = async (data, kitId) => {
  const result = await addKitTemplateAssembly(data);
  if (result.status === 200) {
    store.dispatch(addnewAssemblytoKit({ id: data.id, kitId: kitId, data: result.data }));
  }
  return result;
};

const addKitTemplateAssemblyCopyAction = async (data, kitId) => {
  const result = await addKitTemplateAssemblyCopy(data);
  if (result.status === 200) {
    store.dispatch(addnewAssemblytoKit({ id: data.id, kitId: kitId, data: result.data }));
  }
  return result;
};

const getKitTemplateAssemblyCopyAction = async (data) => {
  const result = await getKitTemplateAssemblyCopy(data);
  return result;
};

const deleteKitAction = async (id, reason) => {
  const result = await deleteKit(id, reason);
  if (result.status === 200) {
    store.dispatch(removeKitfromList(id));
  }
  return result;
};

const deleteKitAssemblyAction = async (id, kitId) => {
  const result = await deleteKitAssembly(id);
  if (result.status === 200) {
    store.dispatch(removeKitfromKitAssemblyList({ id: id, kitId: kitId }));
  }
  return result;
};

// country
const getAllCountryForRegionAction = async (id) => {
  const result = await getAllCountryForRegion(id);
  store.dispatch(setAllCountryProtocol(result?.data));
  return result;
};

const getAllCountryForRegionDetailAction = async (id) => {
  const result = await getAllCountryForRegionDetail(id);
  store.dispatch(setSelectedCountryDetail(result?.data));
  return result;
};

//site

const getAllSitesForCountryAction = async (id) => {
  const result = await getAllSitesForCountry(id);
  store.dispatch(setAllSiteProtocol(result?.data));
  return result;
};

const getAllSitesForCountryDetailAction = async (id) => {
  const result = await getAllSitesForCountryDetail(id);
  store.dispatch(setSelectedSiteDetail(result?.data));
  return result;
};

const createSideLogisticAction = async (counrtyId, siteId, data) => {
  const result = await createNewSiteLogistic(counrtyId, siteId, data);
  if (result.status === 200) {
    store.dispatch(updateSiteList(result?.data));
  }
  return result;
};

const updateSiteLogisticAction = async (siteId, data) => {
  const result = await updateSiteLogistic(siteId, data);
  if (result.status === 200) {
    store.dispatch(setSelectedSiteDetail(result?.data));
  }
  return result;
};

const getGreenLightTypesAction = async (siteId, data) => {
  const result = await getGreenLightTypes(siteId, data);
  store.dispatch(setGreenLights(result?.data));
  return result;
};

const getShippingDeportAction = async (siteId, data) => {
  const result = await getShippingDeport(siteId, data);
  store.dispatch(setShiipingDeports(result?.data));
  return result;
};

const createNewCountryLogisticAction = async (regionId, id, data) => {
  const result = await createNewCountryLogistic(regionId, id, data);
  //store.dispatch(setSelectedSiteDetail(result?.data));
  return result;
};

const updateCountryLogisticAction = async (id, data) => {
  const result = await updateCountryLogistic(id, data);
  if (result.status === 200) {
    store.dispatch(setSelectedCountryDetail(result?.data));
  }
  return result;
};

const submutForQCAction = async (id, data) => {
  const result = await submitForQC(id, data);
  if (result.status === 200) {
    // store.dispatch(setSelectedProtocolDetail(result?.data));
  }
  return result;
};

const approveForQCAction = async (id, data) => {
  const result = await approveForQC(id, data);
  if (result.status === 200) {
    // store.dispatch(setSelectedProtocolDetail(result?.data));
  }
  return result;
};

const rejectForQCAction = async (id, data) => {
  const result = await rejectForQC(id, data);
  if (result.status === 200) {
    // store.dispatch(setSelectedProtocolDetail(result?.data));
  }
  return result;
};

const getAllActiveUsersAction = async () => {
  const result = await getAllActiveUsers();
  store.dispatch(activeUsers(result?.data));
  return result;
};

const getKitForEachLevelAction = async (id, lodId) => {
  const result = await getKitForEachLevel(id, lodId);
  store.dispatch(kitAtlevel(result?.data));
  return result;
};

export {
  approveForQCAction,
  rejectForQCAction,
  submutForQCAction,
  getShippingDeportAction,
  createNewCountryLogisticAction,
  updateCountryLogisticAction,
  getGreenLightTypesAction,
  getCountriesLogisticBuilder,
  getAssemblyInboundConditionAction,
  getAllCuriorsListAction,
  assignKitsAction,
  getAllProtocolsAction,
  protocolDetailIdAction,
  updateProtocolLogisticBuilderAction,
  addBulkKitTemplateAction,
  updateRegionProtocolLogistic,
  addKitTemplateAssemblyAction,
  addNewRegionProtocolLogistic,
  getAllRegionsProtocolsAction,
  regionDetailIdAction,
  addKitTemplateAssemblyCopyAction,
  getKitTemplateAssemblyCopyAction,
  deleteKitAction,
  assignShippingRuleAction,
  deleteKitAssemblyAction,
  getAllCountryForRegionAction,
  getAllCountryForRegionDetailAction,
  getAllSitesForCountryDetailAction,
  getAllSitesForCountryAction,
  getAllLogisticLevelNode,
  createSideLogisticAction,
  updateSiteLogisticAction,
  assignGeneralAssemblyAction,
  getAllActiveUsersAction,
  getKitForEachLevelAction,
  unAssignKitsAction,
};
