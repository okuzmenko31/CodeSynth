import { SET_THEME } from "./types";

export const setTheme = (value: unknown) => ({
    type: SET_THEME,
    payload: value,
});
