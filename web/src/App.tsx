import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./router/routes";
import themeController from "./utils/themeController";

const App = () => {
    const theme = useSelector((state: any) => state.themeReducer.theme);
    const dispatch = useDispatch();

    window.addEventListener("mousemove", (e) => {
        setTimeout(() => {
            const x = e.pageX;
            const y = e.pageY;
            const seeker = document.getElementById("cursor-seeker");

            if (seeker) {
                seeker.style.top = `${y - seeker.clientWidth * 0.5}px`;
                seeker.style.left = `${x - seeker.clientHeight * 0.5}px`;
            }
        }, 70);
    });

    useEffect(() => {
        if (theme === "light") {
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }

        themeController.setLocalStorageTheme(theme);
    }, [theme]);

    return (
        <>
            <div id="cursor-seeker"></div>
            <div className="App">
                <Routes />
            </div>
        </>
    );
};

export default App;
