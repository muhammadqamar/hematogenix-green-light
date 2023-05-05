/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  isSubmitted: true,
  companyLocations: null,
  systemUsers: null,
  portalUsers: null,
  portalUsersFilter: {},
  systemUsersFilter: {},
  userRole: null,
  sites: [],
  permission: null,
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCompanyLoaction: (state, action) => {
      state.isLoading = false;
      state.companyLocations = action.payload;
    },
    removeCompanyLocation: (state, action) => {
      state.isSubmitted = false;
      state.companyLocations = state.companyLocations.filter(
        (y) => y.id !== action.payload
      );
    },
    setSystemUser: (state, action) => {
      state.isLoading = false;
      state.systemUsers = action.payload;
    },
    setportalUsersFilter: (state, action) => {
      state.portalUsersFilter = action.payload;
    },
    setSystemUsersFilter: (state, action) => {
      state.systemUsersFilter = action.payload;
    },

    removeSystemUser: (state, action) => {
      state.isSubmitted = false;
      state.systemUsers = state.systemUsers.filter(
        (y) => y.id !== action.payload
      );
    },
    setPortalUser: (state, action) => {
      state.isLoading = false;
      state.portalUsers = action.payload;
    },
    removePortalUser: (state, action) => {
      state.isSubmitted = false;
      state.portalUsers = state.portalUsers.filter(
        (y) => y.id !== action.payload
      );
    },
    setUserRoles: (state, action) => {
      state.isLoading = false;
      state.userRole = action.payload;
    },
    setSites: (state, action) => {
      state.isLoading = false;
      state.sites = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },

    setaddNewRole: (state, action) => {
      if (state.userRole) {
        state.userRole = [...state.userRole, action.payload];
      } else {
        state.userRole = action.payload;
      }
    },
    setdeleteRole: (state, action) => {
      state.userRole = state.userRole.filter(
        (data) => data.id !== action.payload
      );
    },
    setupdateRole: (state, action) => {
      state.userRole = state.userRole?.map((data) => {
        if (data.id === action.payload?.id) {
          return action.payload;
        } else {
          return data;
        }
      });
    },
  },
});

export const {
  setaddNewRole,
  setdeleteRole,
  setupdateRole,
  setPermission,
  setCompanyLoaction,
  removeCompanyLocation,
  setSystemUser,
  removeSystemUser,
  setPortalUser,
  removePortalUser,
  setUserRoles,
  setSites,
  setportalUsersFilter,
  setSystemUsersFilter
} = settings.actions;

export default settings.reducer;
