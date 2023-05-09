import { configureStore } from "@reduxjs/toolkit";
import uisettings from "./reducers/uiSettings";
import builder from "./reducers/kitBuilder";
import common from "./reducers/common";

import orders from "./reducers/orders.js";
export const store = configureStore({
  reducer: {
    orders,
    uisettings,
    builder,
    common,
  },
});
