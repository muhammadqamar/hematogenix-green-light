import {
    createStorageLocation, getStorageLocationTree, getStorageLocationById, updateStorageLocationById,
    deleteStorageLocationById, moveStorageLocation
} from "../Services/storageLocation"
import { store } from '../Store'
import { setLocationTreeReducer, addlocationReducer } from '../Store/reducers/storageLocation'

const getStorageLocationTreeAction = async () => {
    const result = await getStorageLocationTree();
    store.dispatch(setLocationTreeReducer(result?.data))
}

const createStorageLocationAction = async (data) => {
    const createdItem = await createStorageLocation(data)
    return createdItem;
}


const getStorageLocationByIdAction = async (id, data) => {
    const result = await getStorageLocationById(id, data)
    // store.dispatch(addlocationReducer(result?.data))
    return result
}

const updateStorageLocationByIdAction = async (id, data) => {
    const result = await updateStorageLocationById(id, data)
    // store.dispatch(addlocationReducer(result?.data))
    return result
}


const deleteStorageLocationByIdAction = async (id, queryData) => {
    const result = await deleteStorageLocationById(id + `?changeReason=${queryData}`)
    // store.dispatch(addlocationReducer(result?.data))
    return result
}


const moveStorageLocationAction = async (source, destination) => {
    const result = await moveStorageLocation(source, destination)
    // store.dispatch(addlocationReducer(result?.data))
    return result
}


export {
    getStorageLocationTreeAction, createStorageLocationAction, getStorageLocationByIdAction,
    updateStorageLocationByIdAction, deleteStorageLocationByIdAction, moveStorageLocationAction
}