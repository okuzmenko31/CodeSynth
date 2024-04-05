export const dropDownToggle = (e: any) => {
    e.stopPropagation();
    const dropdown = document.querySelector(".drop-down");
    const list = document.querySelector(".drop-down-list");

    if (dropdown && list) {
        dropdown.classList.toggle("active");
        list.classList.toggle("active");

        document.onclick = (e: any) => {
            e.stopPropagation();
            list.classList.remove("active");
            dropdown.classList.remove("active");
        };
    }
};