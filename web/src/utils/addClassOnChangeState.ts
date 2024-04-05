export const addClassOnChangeState = (e: any) => {
    if (e.target.type === "checkbox") {
        if (e.target.checked) {
            e.target.parentNode.classList.add("active");
        } else {
            e.target.parentNode.classList.remove("active");
        }
    } else {
        if (e.target.checked) {
            document
                .querySelectorAll('input[name="' + e.target.name + '"]')
                .forEach((el: any) => {
                    el.parentNode.classList.remove("active");
                });
            e.target.parentNode.classList.add("active");
        }
    }
};
