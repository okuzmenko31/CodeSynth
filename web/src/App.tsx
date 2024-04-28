import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTouchDevice } from "./redux/actions";
import Routes from "./router/routes";
import themeController from "./utils/themeController";

const App = () => {
    const theme = useSelector((state: any) => state.themeReducer.theme);
    const touchDevice = useSelector(
        (state: any) => state.pageReducer.touchDevice
    );
    const dispatch = useDispatch();

    const moveCursor = (e: MouseEvent) => {
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

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }

        themeController.setLocalStorageTheme(theme);
    }, [theme]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            dispatch(
                setTouchDevice(window.matchMedia("(pointer: coarse)").matches)
            );
        });

        window.addEventListener("mousemove", moveCursor);
    }, []);

    return (
        <>
            {!touchDevice && <div id="cursor-seeker"></div>}
            <div className="App">
                <Routes />
            </div>
        </>
    );
};

export default App;
