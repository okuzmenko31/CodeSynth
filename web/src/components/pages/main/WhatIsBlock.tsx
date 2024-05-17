import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/routes";
import "../../../styles/components/pages/main/WhatIsBlock.scss";
import Button from "../../UI/Button";

const WhatIsBlock = () => {
    const navigate = useNavigate();
    return (
        <div className="what-is">
            <div className="what-is-text">
                <p className="big-text">
                    <span className="codesynth-text" data-text="CODESYNTH">
                        CODESYNTH
                    </span>{" "}
                    - THE COOLEST STARTER WEB STUDIO
                </p>
                <p className="small-text">Studio of your dreams and wishes</p>
            </div>

            <div className="what-is-buttons">
                <Button
                    text="MAKE ORDER"
                    callback={() => navigate(paths.makeOrder)}
                />
                <Button
                    text="PORTFOLIO"
                    callback={() => {
                        window.location.hash = "";
                        window.location.hash = "#portfolio";
                    }}
                />
            </div>
        </div>
    );
};

export default WhatIsBlock;
