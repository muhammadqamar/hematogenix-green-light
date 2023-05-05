/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationTree: null,
  activeStructure: null,
  itemCategories: null,
};

export const storageLocation = createSlice({
  name: 'storageLocations',
  initialState,
  reducers: {
    setLocationTreeReducer: (state, action) => {
      state.locationTree = action.payload;
    },
    addlocationReducer: (state, action) => {
      if (state.locationTree) {
        state.locationTree = [action.payload, ...state.locationTree];
      } else {
        state.locationTree = [action.payload];
      }
    },
    setActiveStrutureReduer: (state, action) => {
      state.activeStructure = [action.payload];
    },
    setItemCategoriesReducer: (state, action) => {
      state.itemCategories = action.payload;
    },
    createItemCategoryCustomFieldReducer: (state, action) => {
      // state.itemCategories = {...state.itemCategories,fields:[...state.itemCategories?.fields,action.payload]}
      state.itemCategories = action.payload;
    },

    removeItemCategoryFieldReducer: (state, action) => {
      state.itemCategories = {
        ...state.itemCategories,
        fields: state.itemCategories?.fields?.filter(
          (data) => data.id !== action.payload
        ),
      };
    },

    updateFieldInItemCategoryInEdit: (state, action) => {
      console.log(action.payload);
      state.itemCategories = {
        ...state.itemCategories,
        fields: state.itemCategories?.fields?.map((data) => {
          if (data.id === action.payload?.data?.id) {
            if (action.payload?.type === 'is-required') {
              return { ...data, isRequired: action.payload?.value };
            } else {
              return { ...data, name: action.payload?.value };
            }
          } else {
            return data;
          }
        }),
      };
    },
  },
});

export const {
  removeItemCategoryFieldReducer,
  createItemCategoryCustomFieldReducer,
  setLocationTreeReducer,
  addlocationReducer,
  setActiveStrutureReduer,
  setItemCategoriesReducer,
  updateFieldInItemCategoryInEdit,
} = storageLocation.actions;

export default storageLocation.reducer;
