import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./reducer";

const reducer = combineReducers({
    themeReducer: themeReducer,
});

export const store = configureStore({
    reducer: reducer,
});
