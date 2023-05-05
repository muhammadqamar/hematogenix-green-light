/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allAssemblies: null,
  allAssemblyTypes: null,
  allTestingLabs: null,
};

export const assembly = createSlice({
  name: 'assembly',
  initialState,
  reducers: {
    setAllAssembliesAction: (state, action) => {
      state.allAssemblies = action.payload;
    },
    addNewAssembly: (state, action) => {
      if(state.allAssemblies?.length) {
        state.allAssemblies = [action.payload, ...state.allAssemblies];
      } else {
        state.allAssemblies = [action.payload]
      }

    },
    deleteAssemblies: (state, action) => {
      state.allAssemblies = state.allAssemblies.filter(
        (data) => data.id !== action.payload
      );
    },
    deleteAssembliesForItem: (state, action) => {
      console.log(action)
      state.allAssemblies = state.allAssemblies.map((data) => {
        if (data.id === action.payload.parent) {
         return {...data,items:data.items?.filter((item) => item.id !== action.payload.id)};
        } else {
          return data;
        }
      });
    },
  },
});

export const {
  setAllAssembliesAction,
  deleteAssemblies,
  addNewAssembly,
  deleteAssembliesForItem,
} = assembly.actions;

export default assembly.reducer;
