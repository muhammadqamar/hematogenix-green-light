/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTemplates: null,
  buildKit: null,
  kitTemplateFilter: {},
};

export const kitBuilder = createSlice({
  name: "kit-builder",
  initialState,
  reducers: {
    getAllTemplate: (state, action) => {
      state.allTemplates = action.payload;
    },
    updateBuildKit: (state, action) => {
      state.buildKit = action.payload;
    },
    addnewTemplate: (state, action) => {
      if (state.allTemplates) {
        state.allTemplates = [action.payload, ...state.allTemplates];
      } else {
        state.allTemplates = action.payload;
      }
    },
    removeBuildKitreducer: (state, action) => {
      state.allTemplates = state.allTemplates.filter((data) => data.id !== action.payload);
    },
    setKitTemplateFilter: (state, action) => {
      state.kitTemplateFilter = action.payload;
    },
  },
});

export const { getAllTemplate, updateBuildKit, removeBuildKitreducer, addnewTemplate, setKitTemplateFilter } = kitBuilder.actions;

export default kitBuilder.reducer;
