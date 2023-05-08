import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allOrders: null,
  allFilter: null,
  allPending: null,
  allapprove: null,
  allReject: null,
  activeOrder: null,
};

export const Orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setAllOrder: (state, action) => {
      state.allOrders = action.payload;
    },
    setAllFilter: (state, action) => {
      state.allFilter = action.payload;
    },
    setAllapprove: (state, action) => {
      state.allapprove = action.payload;
    },
    setAllReject: (state, action) => {
      state.allReject = action.payload;
    },
    setAllPending: (state, action) => {
      state.allPending = action.payload;
    },
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
  },
});

export const {
  setAllOrder,
  setAllFilter,
  setAllapprove,
  setAllReject,
  setAllPending,
  setActiveOrder,
} = Orders.actions;

export default Orders.reducer;
