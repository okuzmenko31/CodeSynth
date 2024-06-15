import { useNavigate } from "react-router-dom";
import Particle1 from "../../../assets/particle1.png";
import Particle2 from "../../../assets/particle2.png";
import { paths } from "../../../router/routes";
import "../../../styles/components/pages/main/WhatIsBlock.scss";
import Button from "../../UI/Button";

const WhatIsBlock = () => {
    const navigate = useNavigate();
    return (
        <div className="what-is">
            <div className="what-is-text">
                <p className="big-text capitalize bold">
                    We are not just another web agency - We are future
                </p>
            </div>

            <div className="what-is-actions">
                <div className="what-is-input">
                    <input
                        type="text"
                        placeholder="Describe website which you want"
                    />
                    <Button
                        text="Contact us"
                        callback={() => navigate(paths.makeOrder)}
                    />
                </div>

                <p
                    className="link"
                    onClick={() => {
                        window.location.hash = "";
                        window.location.hash = "#portfolio";
                    }}
                >
                    See our portfolio
                </p>
            </div>

            <div className="particle">
                <img src={Particle1} alt="" />
            </div>

            <div className="particle">
                <img src={Particle2} alt="" />
            </div>
        </div>
    );
};

export default WhatIsBlock;
