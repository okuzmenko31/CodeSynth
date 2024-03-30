import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import CodeSynth from "../assets/CodeSynth.png";
import { setTheme } from "../redux/actions";
import { paths } from "../router/routes";
import switchOff from "../sounds/switch-off.mp3";
import switchOn from "../sounds/switch-on.mp3";
import "../styles/components/Navbar.scss";
import { playSound } from "../utils/playSound";
import NavbarButton from "./UI/NavbarButton";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useSelector((state: any) => state.themeReducer.theme);
    const dispatch = useDispatch();
    const touchDevice = useSelector(
        (state: any) => state.pageReducer.touchDevice
    );

    const addEventListenerOnScroll = () => {
        if (!touchDevice) {
            let prevScrollpos = window.scrollY || window.pageYOffset;

            window.addEventListener("scroll", () => {
                const currentScrollPos = window.scrollY || window.pageYOffset;
                const navbar = document.getElementById("navbar");

                if (prevScrollpos > currentScrollPos) {
                    if (navbar) {
                        navbar.style.top = "0";
                    }
                } else {
                    if (navbar && !navbar.classList.contains("active")) {
                        navbar.style.top = "-25%";
                    }
                }

                prevScrollpos = currentScrollPos;
            });
        }
    };

    useEffect(() => {
        const elementId = location.hash.replace("#", "");
        const element: HTMLElement | null = document.getElementById(elementId);

        if (element) {
            element.scrollIntoView();
        }
    }, [location.pathname]);

    useEffect(() => {
        addEventListenerOnScroll();
    }, [touchDevice, location.pathname]);

    const toggleNavbar = () => {
        const mobileButton = document.querySelector(".navbar-mobile-button");
        const navbar = document.getElementById("navbar");
        if (mobileButton && navbar) {
            mobileButton.classList.toggle("active");
            navbar.classList.toggle("active");
        }
    };

    return (
        <>
            {window.innerWidth < 1200 && (
                <div className="navbar-mobile">
                    <div className="logo">
                        <img alt="CodeSynth" src={CodeSynth} />
                        <Link
                            to="/"
                            className="codesynth-text no-table mid-text"
                            data-text="CODESYNTH"
                        >
                            CodeSynth
                        </Link>
                    </div>

                    <div
                        onClick={toggleNavbar}
                        className="navbar-mobile-button"
                    >
                        <svg
                            height="32px"
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 32 32"
                            width="32px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"></path>
                        </svg>
                    </div>
                </div>
            )}
            <nav id="navbar" className="navbar">
                <div className="navbar-first-part">
                    {window.innerWidth >= 1200 && (
                        <div className="logo">
                            <img alt="CodeSynth" src={CodeSynth} />
                            <Link
                                to="/"
                                className="codesynth-text no-table mid-text"
                                data-text="CODESYNTH"
                            >
                                CodeSynth
                            </Link>
                        </div>
                    )}
                    <div className="navbar-buttons small-text">
                        <NavbarButton text="Portfolio" hash="portfolio" />
                        <NavbarButton text="Services" hash="services" />
                        <NavbarButton text="Why us" hash="why-us" />
                        <NavbarButton text="FAQs" hash="faqs" />
                    </div>
                </div>

                <div className="navbar-buttons-last small-text">
                    <NavbarButton
                        text="Submit your application"
                        customAction={() => {
                            navigate(paths.makeOrder);
                            window.scrollTo(0, 0);
                        }}
                    />
                    <NavbarButton text="Our contacts" hash="contacts" />
                </div>

                <div className="navbar-buttons-additional">
                    <button
                        className="change-theme-button"
                        onClick={() => {
                            const newTheme =
                                theme === "light" ? "dark" : "light";
                            dispatch(setTheme(newTheme));

                            playSound(
                                newTheme === "light" ? switchOn : switchOff
                            );
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d={
                                    theme === "light"
                                        ? "M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
                                        : "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"
                                }
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
