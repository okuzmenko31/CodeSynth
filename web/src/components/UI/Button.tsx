import { CSSProperties } from "react";
import { useSelector } from "react-redux";
import buttonHover from "../../sounds/button-hover.mp3";
import buttonLeave from "../../sounds/button-leave.mp3";
import "../../styles/components/UI/Button.scss";
import { playSound } from "../../utils/playSound";

type ButtonProps = {
    text: string;
    callback: () => any;
    id?: string;
    style?: CSSProperties | undefined;
};

const Button = ({ text, callback, id, style }: ButtonProps) => {
    const volume = 0.4;
    const touchDevice = useSelector(
        (state: any) => state.pageReducer.touchDevice
    );

    const startEvent = touchDevice ? "onTouchStart" : "onMouseEnter";
    const endEvent = touchDevice ? "onTouchEnd" : "onMouseLeave";

    return (
        <button
            style={style ? style : undefined}
            id={id ?? ""}
            {...{
                [startEvent]: () => playSound(buttonHover, volume),
                [endEvent]: () => playSound(buttonLeave, volume),
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
