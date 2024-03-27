import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Routes from "./router/routes";
import themeController from "./utils/themeController";

const App = () => {
    const theme = useSelector((state: any) => state.themeReducer.theme);
    const location = useLocation();
    const [windowWidth, setWindowWidth] = useState<unknown>(null);

    const moveCursor = (e: any) => {
        setTimeout(() => {
            const x = e.clientX;
            const y = e.clientY;
            const seeker = document.getElementById("cursor-seeker");

            if (seeker) {
                seeker.style.top = `${y - seeker.clientHeight * 0.5}px`;
                seeker.style.left = `${x - seeker.clientHeight * 0.5}px`;
            }
        }, 30);
    };
    window.addEventListener("mousemove", moveCursor);

    useEffect(() => {
        if (theme === "light") {
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }

        themeController.setLocalStorageTheme(theme);
    }, [theme]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [location.pathname]);

    return (
        <>
            {(windowWidth as number) > 1199 && <div id="cursor-seeker"></div>}
            <div className="App">
                <Routes />
            </div>
        </>
    );
};

export default App;
