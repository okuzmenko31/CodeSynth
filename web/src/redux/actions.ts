import { SET_PAGE, SET_THEME } from "./types";

export const setTheme = (value: unknown) => ({
    type: SET_THEME,
    payload: value,
});

export const setPage = (value: unknown) => ({
    type: SET_PAGE,
    payload: value,
});
