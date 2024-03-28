import { SET_PAGE, SET_TOUCH_DEVICE } from "./types";

const initialState = {
    page: 0,
    touchDevice: window.matchMedia("(pointer: coarse)").matches,
};

export const pageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PAGE:
            return { ...state, page: action.payload };
        case SET_TOUCH_DEVICE:
            return { ...state, touchDevice: action.payload };
        default:
            return state;
    }
};
