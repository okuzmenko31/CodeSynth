import { useNavigate } from "react-router-dom";
import { paths } from "../../router/routes";

type Func = () => void;

type NavbarButtonProps = {
    text: string;
    hash?: string;
    route?: string;
    customAction?: Func;
};

const NavbarButton = ({
    text,
    hash,
    route = paths.main + "#",
    customAction,
}: NavbarButtonProps) => {
    const navigate = useNavigate();

    const scrollTo = (element_id?: string) => {
        if (!customAction && element_id) {
            const element = document.getElementById(element_id);
            if (element) {
                element.scrollIntoView();
            } else {
                navigate(route + element_id);
            }
        } else if (customAction) {
            customAction();
        }
    };

    return (
        <p
            onClick={() => scrollTo(hash)}
            className="codesynth-text no-table"
            data-text={text}
        >
            {text}
        </p>
    );
};

export default NavbarButton;
