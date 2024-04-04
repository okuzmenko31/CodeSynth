export const generateMinDate = () => {
    const dateInputs = document.querySelectorAll("input[type=date]");
    dateInputs.forEach((input: any) => {
        input.min = new Date().toISOString().split("T")[0];
    });
};
