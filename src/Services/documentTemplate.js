import { post, get, remove, put } from './http';
import { errorHandling } from './error';

const getAllDocTemplateType = async () => {
  try {
    return await get(`order/document-templates/types`);
  } catch (err) {
    return err?.response?.data;
  }
};
const getDocTemplateCopyName = async (documentTemplateId) => {
  try {
    return await get(`order/document-templates/${documentTemplateId}/copy`);
  } catch (err) {
    return err?.response?.data;
  }
};

const getAllDocTemplate = async () => {
  try {
    return await get(`order/document-templates`);
  } catch (err) {
    return err?.response?.data;
  }
};
const getMergefieldType = async (typeId) => {
  try {
    return await get(`order/document-templates/${typeId}/merge-fields`);
  } catch (err) {
    return err?.response?.data;
  }
};

const createDocTemplate = async (data, mode) => {
  const { id, name } = data;
  try {
    if (mode === 'copy-document-template') {
      return await post(`order/document-templates/${id}/copy`, { name: name });
    } else {
      return await post(`order/document-templates`, data);
    }
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const createDocTemplateVersion = async (documentTemplateId, versionId, data) => {
  try {
    return await post(`order/document-templates/${documentTemplateId}/version/${versionId}/file`, data, {
      headers: { accept: '*/*', 'Content-Type': 'multipart/form-data' },
    });
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const updateDocTemplateFile = async (documentTemplateId, data) => {
  try {
    return await post(`order/document-templates/${documentTemplateId}/file`, data, {
      headers: { accept: '*/*', 'Content-Type': 'multipart/form-data' },
    });
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

const removeDocTemplate = async (id, data) => {
  try {
    return await remove(`order/document-templates/${id}?change=${data}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const removeDocTemplateVersion = async (documentTemplateId, versionId) => {
  try {
    return await remove(`order/document-templates/${documentTemplateId}/version/${versionId}`);
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

export {
  getAllDocTemplate,
  createDocTemplate,
  getMergefieldType,
  removeDocTemplateVersion,
  removeDocTemplate,
  getAllDocTemplateType,
  createDocTemplateVersion,
  updateDocTemplateFile,
  getDocTemplateCopyName,
};
