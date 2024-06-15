import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./pageReducer";
import { staticReducer } from "./staticReducer";

const reducer = combineReducers({
    pageReducer: pageReducer,
    staticReducer: staticReducer,
});

export const store = configureStore({
    reducer: reducer,
});
