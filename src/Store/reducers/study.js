/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allStudies: null,
};

export const study = createSlice({
  name: "studies",
  initialState,
  reducers: {
    setAllStudiesReducer: (state, action) => {
      state.allStudies = action.payload;
    },

    addNewStudyReducer: (state, action) => {
      if (state.allStudies) {
        state.allStudies = [action.payload, ...state.allStudies];
      } else {
        state.allStudies = [action.payload];
      }
    },
    editStudyReducer: (state, action) => {
      state.allStudies = state.allStudies.map((study) => {
        if (study.id === action.payload.id) {
          return action.payload.data;
        } else {
          return study;
        }
      });
    },
  },
});

export const { setAllStudiesReducer, addNewStudyReducer, editStudyReducer } = study.actions;

export default study.reducer;
