import {
  getAllDocTemplate,
  createDocTemplate,
  removeDocTemplate,
  getAllDocTemplateType,
  removeDocTemplateVersion,
  createDocTemplateVersion,
  updateDocTemplateFile,
  getMergefieldType,
  getDocTemplateCopyName,
} from '../Services/documentTemplate';
import {
  setAllDocTemplateAction,
  deleteDocumentTemplateVersion,
  addNewDocTemplate,
  setDocTemplateTypeAction,
  deleteDocumentTemplate,
  addNewDocTemplateVersion,
  setMergeFields
} from '../Store/reducers/documentTemplate';

import { store } from '../Store';
const getdocTemplateType = async () => {
  const result = await getAllDocTemplateType();
  if (result.status === 200) {
    store.dispatch(setDocTemplateTypeAction(result.data));
  }
  return result;
};
const getdocCopyNameAction = async (documentTemplateId) => {
  const result = await getDocTemplateCopyName(documentTemplateId);
  if (result.status === 200) {
    return result;
  }
};

const getAlldocTemplateAction = async () => {
  const result = await getAllDocTemplate();
  if (result.status === 200) {
    store.dispatch(setAllDocTemplateAction(result.data));
  }
  return result;
};
const createDocTemplateAction = async (data, mode) => {
  const result = await createDocTemplate(data, mode);
  if (result.status === 200) {
    if (mode === 'copy-document-template') {
      console.log('result', result);
      store.dispatch(addNewDocTemplate(result.data));
    }
    return result;
  }
};
const createDocTempVersionAction = async (documentTemplateId, versionId, data) => {
  const result = await createDocTemplateVersion(documentTemplateId, versionId, data);
  if (result.status === 200) {
    store.dispatch(addNewDocTemplateVersion(result.data));
  }
  return result;
};
const updateDocTemplateFileAction = async (docId, formData) => {
  console.log('formData', formData);
  const result = await updateDocTemplateFile(docId, formData);
  if (result.status === 200) {
    store.dispatch(addNewDocTemplate(result.data));
    return result;
  }
};

const removeDocTemplateAction = async (id, data) => {
  const result = await removeDocTemplate(id, data);
  if (result.status === 200) {
    store.dispatch(deleteDocumentTemplate(id));
  }
  return result;
};
const removeDocVersionAction = async (docId, versionId) => {
  const result = await removeDocTemplateVersion(docId, versionId);
  if (result.status === 200) {
    store.dispatch(deleteDocumentTemplateVersion({ docId, versionId }));
  }
  return result;
};
const mergfieldsByType = async (typeId) => {
  const result = await getMergefieldType(typeId);
  if (result.status === 200) {
     store.dispatch(setMergeFields(result.data));
  }
  return result;
};

export {
  getAlldocTemplateAction,
  createDocTemplateAction,
  removeDocVersionAction,
  removeDocTemplateAction,
  getdocTemplateType,
  createDocTempVersionAction,
  updateDocTemplateFileAction,
  mergfieldsByType,
  getdocCopyNameAction,
};
