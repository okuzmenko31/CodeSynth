import { CSSProperties } from "react";
import buttonHover from "../../sounds/button-hover.mp3";
import buttonLeave from "../../sounds/button-leave.mp3";
import "../../styles/components/UI/Button.scss";

type ButtonProps = {
    text: string;
    callback: () => any;
    id?: string;
    style?: CSSProperties | undefined;
};

const Button = ({ text, callback, id, style }: ButtonProps) => {
    const volume = 0.4;
    return (
        <button
            style={style ? style : undefined}
            id={id ? id : ""}
            onMouseLeave={() => {
                const audio = document.createElement("audio");
                audio.src = buttonHover;
                audio.volume = volume;
                audio.play();
                audio.remove();
            }}
            onMouseEnter={() => {
                const audio = document.createElement("audio");
                audio.src = buttonLeave;
                audio.volume = volume;
                audio.play();
                audio.remove();
            }}
            className="button"
            onClick={callback}
        >
            <div className="button-foreground">{text}</div>
            <div className="button-background"></div>
        </button>
    );
};

export default Button;
