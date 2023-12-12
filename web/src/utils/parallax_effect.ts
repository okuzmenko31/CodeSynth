export const initParallaxEffect = (target: string, speed: number, additional?: string): EventListener => {
    return function () {
        let scrollPosition = window.scrollY;
        let parallaxContent = document.querySelectorAll(target) as any;
        parallaxContent.forEach((content: HTMLElement) => {
            if (content) {
                content.style.transform = `translate(0, -${scrollPosition * speed}px) ${additional}`;
            }
        })
    };
};

