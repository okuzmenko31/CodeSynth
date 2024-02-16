import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./reducer";
import { pageReducer } from "./pageReducer";

const reducer = combineReducers({
    themeReducer: themeReducer,
    pageReducer: pageReducer
});

export const store = configureStore({
    reducer: reducer,
});
