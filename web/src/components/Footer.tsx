import React from "react";
import CodeSynth from "../assets/CodeSynth.png"
import "../styles/Footer.css"


const Footer = () => {
    return (
        <footer className="footer">
            <div className="logo">
                <img alt="CodeSynth" src={CodeSynth}/>
                <a href={process.env.REACT_APP_FRONTEND_DOMAIN} className="codesynth-text no-table mid-text" data-text="CODESYNTH">CodeSynth</a>
            </div>

            <div className="categories">
                <ul className="category">
                    <p className="mid-text">LOS ANGELEAS</p>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                </ul>

                <ul className="category">
                    <p className="mid-text">LOS ANGELEAS</p>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                </ul>

                <ul className="category">
                    <p className="mid-text">LOS ANGELEAS</p>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                </ul>

                <ul className="category">
                    <p className="mid-text">LOS ANGELEAS</p>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                </ul>

                <ul className="category">
                    <p className="mid-text">LOS ANGELEAS</p>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                    <li className="small-text">Fsadasas</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;