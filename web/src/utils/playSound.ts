export const playSound = (src: string, volume: number = 0.5) => {
    try {
        const audio = new Audio();

        audio.src = src;
        audio.volume = volume;

        audio.play();
        audio.remove();
    } catch (err) {
        console.error(err);
    }
};
