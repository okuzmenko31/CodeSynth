import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouterWrapper = ({ children }: { children: any }) => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash === "") {
            document.documentElement.scrollTo(0, 0);
        } else {
            const elementId = hash.replace("#", "");

            const element: HTMLElement | null =
                document.getElementById(elementId);

            setTimeout(() => {
                if (element) {
                    element.scrollIntoView();
                }
            }, 0);
        }
    }, [pathname, hash]);

    return children;
};

export default RouterWrapper;
