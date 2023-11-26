export const initParallaxEffect = (target: string, speed: number, additional?: string): EventListener => {
    return function () {
        let scrollPosition = window.scrollY;
        let parallaxContent = document.querySelector(target) as HTMLElement;
        if (parallaxContent) {
            parallaxContent.style.transform = `translate(0, -${scrollPosition * speed}px) ${additional}`;
        }
    };
};

