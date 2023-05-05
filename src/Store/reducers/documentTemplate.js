/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alldocTemplateType: null,
  alldocTemplate: null,
  mergeField:null,
  docTemplateFilter: {},
};

export const docTemplate = createSlice({
  name: 'docTemplate',
  initialState,
  reducers: {
    setAllDocTemplateAction: (state, action) => {
      state.alldocTemplate = action.payload;
    },
    addNewDocTemplate: (state, action) => {
      if (state.alldocTemplate?.length) {
        state.alldocTemplate = [action.payload, ...state.alldocTemplate];
      } else {
        state.alldocTemplate = [action.payload];
      }
    },
    deleteDocumentTemplate: (state, action) => {
      state.alldocTemplate = state.alldocTemplate.filter((data) => data.id !== action.payload);
    },
    setDocTemplateTypeAction: (state, action) => {
      state.alldocTemplateType = action.payload;
    },

    setMergeFields : (state, action) => {
      state.mergeField = action.payload;
    },

    deleteDocumentTemplateVersion: (state, action) => {
      state.alldocTemplate = state.alldocTemplate?.map((data) => {
        if (data.id === action.payload.docId) {
          return {
            ...data,
            translations: data?.translations?.filter((f) => f.id !== action.payload.versionId),
          };
        } else {
          return data;
        }
      });
    },

    addNewDocTemplateVersion: (state, action) => {
      state.alldocTemplate = state.alldocTemplate?.map((data) => {
        if (data.id === action.payload.id) {
          return {
            ...data,
            translations: action.payload.translations,
          };
        } else {
          return data;
        }
      });
    },
    setdocTemplateFilter: (state, action) => {
      state.docTemplateFilter = action.payload;
    },
  },
});


export const {
  setMergeFields,
  setAllDocTemplateAction,
  addNewDocTemplate,
  addNewDocTemplateVersion,
  deleteDocumentTemplateVersion,
  deleteDocumentTemplate,
  setDocTemplateTypeAction,
  setdocTemplateFilter,
} = docTemplate.actions;

export default docTemplate.reducer;
