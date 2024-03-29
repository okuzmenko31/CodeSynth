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
                    <p className="mid-text">CONTACTS</p>
                    <li className="small-text">
                        <Link
                            to={"mailto:olegkuzmenko2005@gmail.com"}
                            target="_blank"
                        >
                            olegkuzmenko2005@gmail.com
                        </Link>
                    </li>
                    <li className="small-text">
                        <Link to={"https://t.me/venrute_xx"} target="_blank">
                            @venrute_xx
                        </Link>
                    </li>
                    <li className="small-text">
                        <Link to={"https://t.me/las_venturos"} target="_blank">
                            @las_venturos
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
