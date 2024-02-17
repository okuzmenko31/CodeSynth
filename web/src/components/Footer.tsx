import { Link } from "react-router-dom";

import CodeSynth from "../assets/CodeSynth.png";
import "../styles/components/Footer.scss";

const Footer = () => {
    return (
        <footer id="contacts" className="footer">
            <div className="logo-container">
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

                <p className="small-text">
                    We cook powerful websites by ourselves
                </p>
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
    );
};

export default Footer;
