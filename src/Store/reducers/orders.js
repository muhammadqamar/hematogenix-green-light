import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allOrders: null,
  dashboard: null,
  defaultValues: null,
  itemAvailable: null,
  type: null,
  activesite: null,
  alladdress: null,
  acknowledgedetails: null,
  activeShipment: null,
  allBuildPreparation: null,
  allStagingPreparation: null,
  allShipping: null,
  activeOrder: null,
  allShipments: null,
};

export const Orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setDashbaord: (state, action) => {
      state.dashboard = action.payload;
    },
    setAllOrder: (state, action) => {
      state.allOrders = action.payload;
    },
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },

    addNewOrder: (state, action) => {
      if (state.allOrders) {
        state.allOrders = [action.payload, ...state.allOrders];
      } else {
        state.allOrders = [action.payload];
      }
    },
    setDefaultValues: (state, action) => {
      state.defaultValues = action.payload;
    },

    setItemAvailable: (state, action) => {
      state.itemAvailable = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setActiveSite: (state, action) => {
      state.activesite = action.payload;
    },
    setAlladdresses: (state, action) => {
      state.alladdress = action.payload;
    },
    setacknowledgedetails: (state, action) => {
      state.acknowledgedetails = action.payload;
    },
    setAllBuildPreparation: (state, action) => {
      state.allBuildPreparation = action.payload;
    },
    setAllStagingPreparation: (state, action) => {
      state.allStagingPreparation = action.payload;
    },
    setAllShipping: (state, action) => {
      state.allShipping = action.payload;
    },
    setAllAvailableShipment: (state, action) => {
      state.allShipments = action.payload;
    },
    setActiveShipment: (state, action) => {
      state.activeShipment = action.payload;
    },
  },
});

export const {
  setActiveShipment,
  setAllAvailableShipment,
  setActiveOrder,
  setacknowledgedetails,
  addNewOrder,
  setAlladdresses,
  setDashbaord,
  setAllOrder,
  setDefaultValues,
  setItemAvailable,
  setType,
  setActiveSite,
  setAllBuildPreparation,
  setAllStagingPreparation,
  setAllShipping,
} = Orders.actions;

export default Orders.reducer;
