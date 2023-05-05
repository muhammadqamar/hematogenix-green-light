import { configureStore } from "@reduxjs/toolkit";
import uisettings from "./reducers/uiSettings";
import allItems from "./reducers/items";
import common from "./reducers/common";
import storageLocation from "./reducers/storageLocation";
import builder from "./reducers/kitBuilder";
import assembly from "./reducers/assembly";
import sponsers from "./reducers/sponser";
import studies from "./reducers/study";
import sites from "./reducers/siteManagment";
import docTemplate from "./reducers/documentTemplate";
import logistic from "./reducers/logistic";
import settings from "./reducers/settings";
import orders from "./reducers/orders.js";
export const store = configureStore({
  reducer: {
    orders,
    uisettings,
    allItems,
    common,
    storageLocation,
    builder,
    assembly,
    sponsers,
    studies,
    sites,
    docTemplate,
    logistic,
    settings
  },
});
