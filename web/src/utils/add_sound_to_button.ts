import buttonHover from "../sounds/button-hover.mp3";
import buttonLeave from "../sounds/button-leave.mp3";

export const addSoundsToButtons = () => {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        const volume = 0.4;
        button.addEventListener("mouseenter", () => {
            const audio = document.createElement("audio");
            audio.src = buttonHover;
            audio.volume = volume;
            audio.play();
            audio.remove();
        });

        button.addEventListener("mouseleave", () => {
            const audio = document.createElement("audio");
            audio.src = buttonLeave;
            audio.volume = volume;
            audio.play();
            audio.remove();
        });
    });
};
