/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTypes: null,
  allCategories: null,
  selectedCategory: null,
  allFormats: null,
  allAssemblyTypes: null,
  allTestingLabs: null,
  allShipping: null,
  dropdownItemList: { assemblyItem: null },
  itemCategoryFormat: null,
  activeDropdownValue: null,
  allCountries: null,
  allCuriors: null,
  switch: {
    threshold: null,
    name:null,
  },
  tenant: null,
};

export const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAllTypesReducer: (state, action) => {
      state.allTypes = action.payload;
    },
    setAllCountriesReducer: (state, action) => {
      state.allCountries = action.payload;
    },
    setAllCuriorsReducer: (state, action) => {
      state.allCuriors = action.payload;
    },

    setDomainTenant: (state, action) => {
      state.tenant = action.payload;
    },
    setAllCategoriesReducer: (state, action) => {
      state.allCategories = action.payload;
    },
    setThresholdReducer: (state, action) => {
      state.switch = { ...state.switch, threshold: action.payload };
    },
    setAllInventoryLangsReducer: (state, action) => {
      state.allInventorylanguages = action.payload;
    },
    setSelectedCategoryReducer: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setAllAllFormatsReducer: (state, action) => {
      state.allFormats = action.payload;
    },
    setAllAssemblyTypes: (state, action) => {
      state.allAssemblyTypes = action.payload;
    },
    setAllTestingLabs: (state, action) => {
      state.allTestingLabs = action.payload;
    },
    getAssemblyInboundConditionReducer: (state, action) => {
      state.allShipping = action.payload;
    },
    droptownItemsForAssemblyRedcuer: (state, action) => {
      state.dropdownItemList.assemblyItem = action.payload;
    },
    itemCategoryFormatReducer: (state, action) => {
      state.itemCategoryFormat = action.payload;
    },

    addItemCategoryReducer: (state, action) => {
      if (state.allCategories) {
        state.allCategories = [action.payload, ...state.allCategories];
      } else {
        state.allCategories = action.payload;
      }
    },
    removeItemCategoryReducer: (state, action) => {
      state.allCategories = state.allCategories.filter((data) => data.id !== action.payload);
    },
    setDropdownValue: (state, action) => {
      state.activeDropdownValue = action.payload;
    },
  },
});

export const {
  setDropdownValue,
  addItemCategoryReducer,
  removeItemCategoryReducer,
  itemCategoryFormatReducer,
  setAllTypesReducer,
  setAllCategoriesReducer,
  setThresholdReducer,
  setAllInventoryLangsReducer,
  setSelectedCategoryReducer,
  setAllAllFormatsReducer,
  setAllAssemblyTypes,
  setAllTestingLabs,
  getAssemblyInboundConditionReducer,
  droptownItemsForAssemblyRedcuer,
  setAllCountriesReducer,
  setAllCuriorsReducer,
  setDomainTenant,
} = common.actions;

export default common.reducer;
