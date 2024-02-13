export const addClassOnScroll = (selectors: string[], offset: number = 0) => {
    const isScrolledIntoView = (elem: Element): boolean => {
        const rect = elem.getBoundingClientRect();
        return (
            rect.top + offset < window.innerHeight && rect.bottom - offset >= 0
        );
    };

    const handleScroll = () => {
        document.querySelectorAll(selectors[0]).forEach((element) => {
            element.classList.toggle(
                selectors[1],
                !isScrolledIntoView(element)
            );
        });
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("DOMContentLoaded", handleScroll);

    return handleScroll;
};
