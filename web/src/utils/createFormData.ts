export const createFormData = (data: any): FormData => {
    const formData = new FormData();

    for (const key in data) {
        const element = data[key as keyof typeof data];

        if (element !== undefined && element !== null) {
            formData.append(
                key,
                Array.isArray(element) || typeof element === "number"
                    ? JSON.stringify(element)
                    : element
            );
        }
    }

    return formData;
};
