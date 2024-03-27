import { SET_PAGE } from "./types";

const initialState = {
    page: 0,
};

export const pageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PAGE:
            return { ...state, page: action.payload };
        default:
            return state;
    }
};
