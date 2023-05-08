import { store } from "../Store";
import { showErrorReducer } from "../Store/reducers/uiSettings";

export const errorHandling = (error) => {
  try {
    if (error.details) {
      store.dispatch(
        showErrorReducer(
          error.details[error?.details?.length - 1]?.errors[0] || error.details[0]?.errors[0]
        )
      );
    } else {
      store.dispatch(showErrorReducer(error?.message || "Something Went Wrong"));
    }
  } catch (e) {
    store.dispatch("Something Went Wrong");
  }
};
