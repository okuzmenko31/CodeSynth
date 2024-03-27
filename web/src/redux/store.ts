import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./pageReducer";
import { staticReducer } from "./staticReducer";
import { themeReducer } from "./themeReducer";

const reducer = combineReducers({
    themeReducer: themeReducer,
    pageReducer: pageReducer,
    staticReducer: staticReducer,
});

export const store = configureStore({
    reducer: reducer,
});
