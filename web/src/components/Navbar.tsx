import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CodeSynth from "../assets/CodeSynth.png"
import "../styles/components/Navbar.css"


const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const elementId = location.hash.replace("#", "")
        const element: any = document.getElementById(elementId)

        if (element) {
            element.scrollIntoView()
        }
    }, [location.pathname])

    const scrollTo = (element_id: string) => {
        const element: any = document.getElementById(element_id)

        if (!element) {
            navigate("/#" + element_id);
        } else {
            element.scrollIntoView()
        }
    }

    let prevScrollpos = window.scrollY || window.pageYOffset;

    window.addEventListener('scroll', function() {
        const currentScrollPos = window.scrollY || window.pageYOffset;
        const navbar = document.getElementById("navbar")
    
        if (prevScrollpos > currentScrollPos) {
            if (navbar) {
                navbar.style.top = "0"
            }
        } else {
            if (navbar && !navbar.classList.contains('active')) {
                navbar.style.top = "-25%"
            }
        }
    
        prevScrollpos = currentScrollPos;
    })

    const toggleNavbar = () => {
        const mobileButton = document.querySelector(".navbar-mobile-button")
        const navbar = document.getElementById("navbar")
        if (mobileButton && navbar) {
            mobileButton.classList.toggle('active')
            navbar.classList.toggle('active')
        }
    }

    return (
        <>
        <div onClick={toggleNavbar} className="navbar-mobile-button">
            <svg height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"></path></svg>
        </div>
        <nav id="navbar" className="navbar">
            <div className="navbar-first-part">
                <div className="logo">
                    <img alt="CodeSynth" src={CodeSynth}/>
                    <Link to="/" className="codesynth-text no-table mid-text" data-text="CODESYNTH">CodeSynth</Link>
                </div>

                <div className="navbar-buttons small-text">
                    <p onClick={() =>scrollTo("portfolio")} className="codesynth-text no-table" data-text="Portfolio">Portfolio</p>
                    <p onClick={() =>scrollTo("services")} className="codesynth-text no-table" data-text="Services">Services</p>
                    <p onClick={() =>scrollTo("why-us")} className="codesynth-text no-table" data-text="Why us">Why us</p>
                    <p onClick={() =>scrollTo("faqs")} className="codesynth-text no-table" data-text="FAQs">FAQs</p>
                </div>
            </div>

            <div className="navbar-buttons-last small-text">
                <Link to="/make_order" className="codesynth-text no-table" data-text="Submit your application">Submit your application</Link>
                <p onClick={() =>scrollTo("contacts")} className="codesynth-text no-table" data-text="Our contacts">Our contacts</p>
            </div>
        </nav>
        </>
    )
}

export default Navbar;