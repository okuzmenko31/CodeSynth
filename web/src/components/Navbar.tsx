import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import CodeSynth from "../assets/CodeSynth.png";
import { paths } from "../router/routes";
import "../styles/components/Navbar.scss";
import Button from "./UI/Button";
import NavbarButton from "./UI/NavbarButton";

const Navbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const touchDevice = useSelector(
        (state: any) => state.pageReducer.touchDevice
    );

    const navbarMobileButtonRef = useRef<HTMLDivElement | null>(null);
    const navbarRef = useRef<HTMLElement | null>(null);

    const addEventListenerOnScroll = () => {
        if (!touchDevice) {
            let prevScrollPos = window.scrollY || window.pageYOffset;

            window.addEventListener("scroll", () => {
                const currentScrollPos = window.scrollY || window.pageYOffset;
                const navbar = navbarRef.current;

                if (
                    prevScrollPos > currentScrollPos ||
                    currentScrollPos === 0
                ) {
                    if (navbar) {
                        navbar.style.top = "0";
                    }
                } else {
                    if (navbar && !navbar.classList.contains("active")) {
                        navbar.style.top = "-25%";
                    }
                }

                prevScrollPos = currentScrollPos;
            });
        }
    };

    useEffect(() => {
        addEventListenerOnScroll();
    }, [touchDevice, pathname]);

    const toggleNavbar = () => {
        const mobileButton = navbarMobileButtonRef.current;
        const navbar = navbarRef.current;
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
                        <img
                            onClick={() => navigate("/")}
                            alt="CodeSynth"
                            src={CodeSynth}
                        />
                    </div>

                    <div
                        onClick={toggleNavbar}
                        className="navbar-mobile-button"
                        ref={navbarMobileButtonRef}
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
            <nav id="navbar" className="navbar" ref={navbarRef}>
                {window.innerWidth >= 1200 && (
                    <div className="logo">
                        <img
                            onClick={() => navigate("/")}
                            alt="CodeSynth"
                            src={CodeSynth}
                        />
                    </div>
                )}

                <div className="navbar-buttons">
                    <NavbarButton text="Portfolio" hash="portfolio" />
                    <NavbarButton text="Services" hash="services" />
                    <NavbarButton text="Why us" hash="why-us" />
                    <NavbarButton text="FAQs" hash="faqs" />
                </div>

                <div className="navbar-buttons-additional">
                    <Button
                        text="Contact us"
                        callback={() => navigate(paths.makeOrder)}
                    />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
