import {
    SET_PAGE,
    SET_STATIC_DATA,
    SET_THEME,
    SET_TOUCH_DEVICE,
} from "./types";

export const setTheme = (value: string) => ({
    type: SET_THEME,
    payload: value,
});

export const setPage = (value: number) => ({
    type: SET_PAGE,
    payload: value,
});

export const setTouchDevice = (value: boolean) => ({
    type: SET_TOUCH_DEVICE,
    payload: value,
});

export const setStaticData = (value: boolean) => ({
    type: SET_STATIC_DATA,
    payload: value,
});
