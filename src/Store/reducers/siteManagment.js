/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSites: null,
};

export const siteManagement = createSlice({
  name: "sites",
  initialState,
  reducers: {
    setallSitesReducer: (state, action) => {
      state.allSites = action.payload;
    },

    addNewSiteReducer: (state, action) => {
      if (state.allSites) {
        state.allSites = [action.payload, ...state.allSites];
      } else {
        state.allSites = [action.payload];
      }
    },
    editSiteReducer: (state, action) => {
      state.allSites = state.allSites.map((study) => {
        if (study.id === action.payload.id) {
          return action.payload.data;
        } else {
          return study;
        }
      });
    },
  },
});

export const { setallSitesReducer, addNewSiteReducer, editSiteReducer } = siteManagement.actions;

export default siteManagement.reducer;
