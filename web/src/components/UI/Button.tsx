import { CSSProperties } from "react";
import "../../styles/components/UI/Button.scss";

type ButtonProps = {
    text: string;
    callback: () => any;
    id?: string;
    style?: CSSProperties | undefined;
};

const Button = ({ text, callback, id, style }: ButtonProps) => {
    return (
        <button
            style={style ? style : undefined}
            id={id ?? ""}
            className="button"
            onClick={callback}
        >
            <div className="button-foreground">{text}</div>
            <div className="button-background"></div>
        </button>
    );
};

export default Button;
