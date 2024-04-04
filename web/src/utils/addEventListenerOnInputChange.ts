export const addEventListenerOnInputChange = (setSelectedFile: any) => {
    const input: any = document.querySelector("input[type=file]");

    if (input) {
        input.addEventListener("change", () => {
            const files = input.files;
            const file = files[0];

            if (file) {
                setSelectedFile(file);
            } else {
                setSelectedFile(undefined);
            }
        });
    }

    return () => {
        if (input) {
            input.removeEventListener("change", () => {});
        }
    };
};
