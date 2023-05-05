/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allSponsers: null,
  sponsorFilter: {},
  sponerStudy:null,
  allSitesForSponser:null
};

export const sponser = createSlice({
  name: 'sponsers',
  initialState,
  reducers: {
    setAllSponsersReducer: (state, action) => {
      state.allSponsers = action.payload;
    },

    addNewItemsReducer: (state, action) => {
      if (state.allSponsers) {
        state.allSponsers = [action.payload, ...state.allSponsers];
      } else {
        state.allSponsers = [action.payload];
      }
    },
    setAllSponseStudiesReducer: (state, action) => {
      state.sponerStudy = action.payload;
    },
    editSponserReducer: (state, action) => {
      state.allSponsers = state.allSponsers.map((sponser) => {
        if (sponser.id === action.payload.id) {
          return action.payload.data;
        } else {
          return sponser;
        }
      });
    },
    setAllSponseSitesReducer: (state, action) => {
      state.allSitesForSponser = action.payload;
    },
    setSponsorsFilter: (state, action) => {
      state.sponsorFilter = action.payload;
    },
  },
});

export const { setAllSponseSitesReducer, setAllSponseStudiesReducer,setAllSponsersReducer, addNewItemsReducer, editSponserReducer, setSponsorsFilter } = sponser.actions;

export default sponser.reducer;
