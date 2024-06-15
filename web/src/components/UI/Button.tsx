import { CSSProperties, Children } from "react";
import "../../styles/components/UI/Button.scss";

type ButtonProps = {
    text?: string;
    children?: any;
    callback: () => unknown;
    id?: string;
    style?: CSSProperties | undefined;
    reference?: any;
};

const Button = ({
    text,
    children,
    callback,
    id,
    style,
    reference,
}: ButtonProps) => {
    return (
        <button
            style={style ? style : undefined}
            id={id || ""}
            className="button"
            onClick={callback}
            ref={reference}
        >
            {Children.map(children, (child) => child) || text}
        </button>
    );
};

export default Button;
