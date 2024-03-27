import themeController from "../utils/themeController";
import { SET_THEME } from "./types";

const initialState = {
    theme: themeController.getLocalStorageTheme() || "dark",
};

export const themeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_THEME:
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};
