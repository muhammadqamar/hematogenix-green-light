import { post, get, remove, put } from './http';
import {errorHandling} from './error'

const getAllAssemblies = async () => {
  try {
    return await get(`assembly-builder/assemblies`)
  } catch (err) {
    return err?.response?.data
  }
}

const removeAllAssembly = async (id, data) => {
    try {
      return await remove(`assembly-builder/assemblies/${id}?change=${data}`)
    } catch (err) {
      errorHandling(err?.response?.data)
      return err?.response?.data
    }
  }
  const removeAssemblyItem = async (id, data) => {
    try {
      return await remove(`assembly-builder/assemblies/items/${id}?change=${data}`)
    } catch (err) {
      errorHandling(err?.response?.data)
      return err?.response?.data
    }
  }

  const createAssembly = async (data) => {
    try {
      return await post(`assembly-builder/assemblies`,data)
    } catch (err) {
      errorHandling(err?.response?.data)
      return err?.response?.data
    }
  }

  const updateAssembly = async (id,data) => {
    try {
      return await put(`assembly-builder/assemblies/${id}`,data)
    } catch (err) {
      errorHandling(err?.response?.data)
      return err?.response?.data
    }
  }

  const getAssemblyTypes = async (id,data) => {
    try {
      return await get(`assembly-builder/assembly/assembly-types`)
    } catch (err) {
      // errorHandling(err?.response?.data?.message || 'Something Went Wrong')
      return err?.response?.data
    }
  }

  const getTestingLabs = async (id,data) => {
    try {
      return await get(`assembly-builder/assembly/testing-labs`)
    } catch (err) {
      // errorHandling(err?.response?.data?.message || 'Something Went Wrong')
      return err?.response?.data
    }
  }



export {
    getAllAssemblies,
    removeAllAssembly,
    createAssembly,
    updateAssembly,
    getAssemblyTypes,
    getTestingLabs,
    removeAssemblyItem,

};