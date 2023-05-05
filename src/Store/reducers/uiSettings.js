/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openform: false,
  formName: "",
  editForm: null,
  showError: null,
  showSuccess: null,
  formLoader: false,
}

export const uiSettings = createSlice({
  name: 'ui-settings',
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.openform = action.payload.state,
      state.formName = action.payload.type
      if (action.payload.state === false) {
        state.showError = null
      } else {
        state.showError = null
        state.showSuccess = null
      }

    },
    editFormReducer: (state, action) => {
      state.editForm = action.payload
    },
    setFormCloseReducer: (state) => {
      state.editForm = null
      state.openform = null
      state.formName - ""
    },
    showErrorReducer: (state, action) => {
      state.showError = action.payload
    },
    setFormName: (state, action) => {
      state.formName = action.payload
    },
    showSuccessReducer: (state, action) => {
      state.showSuccess = action.payload
    },
    setFormLoaderReducer: (state, action) => {
      state.formLoader = action.payload
    }
  },
})

export const { setForm,setFormName, editFormReducer, showErrorReducer, setFormCloseReducer, showSuccessReducer, setFormLoaderReducer } = uiSettings.actions

export default uiSettings.reducer