class themeController {
    static getLocalStorageTheme() {
        return localStorage.getItem("theme") || "dark";
    }

    static setLocalStorageTheme(value: string) {
        localStorage.setItem("theme", value);
    }
}

export default themeController;
