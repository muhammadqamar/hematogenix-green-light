import { createNewStudy, getAllStudies, editSudy } from "../Services/study";
import { store } from "../Store";
import {
  setAllStudiesReducer,
  addNewStudyReducer,
  editStudyReducer,
} from "../Store/reducers/study";

const getAllStudyAction = async (data) => {
  const result = await getAllStudies(data);
  store.dispatch(setAllStudiesReducer(result?.data));
};
const createNewStudyAction = async (data) => {
  const result = await createNewStudy(data);
  if (result?.data) {
    store.dispatch(addNewStudyReducer(result?.data));
  }
  return result;
};
const updateStudyAction = async (sid, data) => {
  const result = await editSudy(sid, data);
  store.dispatch(editStudyReducer({ id: sid, data: result.data }));
  return result;
};
export { createNewStudyAction, getAllStudyAction, updateStudyAction };
