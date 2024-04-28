import { CSSProperties } from "react";
import "../../styles/components/UI/Button.scss";

type ButtonProps = {
    text: string;
    callback: () => unknown;
    id?: string;
    style?: CSSProperties | undefined;
    reference?: any;
};

const Button = ({ text, callback, id, style, reference }: ButtonProps) => {
    return (
        <button
            style={style ? style : undefined}
            id={id ?? ""}
            className="button"
            onClick={callback}
            ref={reference}
        >
            <div className="button-foreground">{text}</div>
            <div className="button-background"></div>
        </button>
    );
};

export default Button;
