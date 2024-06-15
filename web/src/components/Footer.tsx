import { Link, useNavigate } from "react-router-dom";

import CodeSynth from "../assets/CodeSynth.png";
import "../styles/components/Footer.scss";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer id="contacts" className="footer">
            <div className="logo-container">
                <div className="logo">
                    <img
                        onClick={() => navigate("/")}
                        alt="CodeSynth"
                        src={CodeSynth}
                    />
                </div>

                <p className="small-text pre-bold">
                    We cook powerful websites by ourselves
                </p>
            </div>

            <div className="categories">
                <ul className="category">
                    <p className="mid-text capitalize pre-bold">Contacts</p>
                    <li className="small-text">
                        <Link
                            to={"mailto:codesynth.pro@gmail.com"}
                            target="_blank"
                        >
                            codesynth.pro@gmail.com
                        </Link>
                    </li>
                    <li className="small-text">
                        <Link to={"https://t.me/venture_xx"} target="_blank">
                            @venture_xx
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
