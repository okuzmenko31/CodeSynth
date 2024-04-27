import { SET_STATIC_DATA } from "./types";

const isStaticData = process.env.REACT_APP_STATIC_DATA;

const initialState = {
    staticData: isStaticData === "true" ? true : false,
};

export const staticReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_STATIC_DATA:
            return { ...state, staticData: action.payload };
        default:
            return state;
    }
};
