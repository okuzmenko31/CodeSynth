import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/routes";
import "../../../styles/components/pages/main/UserOfferBlock.scss";
import Button from "../../UI/Button";

const UserOfferBlock = () => {
    const navigate = useNavigate();
    return (
        <div className="user-offer-block">
            <p className="pre-big-text capitalize">
                See if we our best fit for each other. We totally are
            </p>

            <Button
                text="Let’s work together"
                callback={() => {
                    navigate(paths.makeOrder);
                }}
            />

            <div className="circle"></div>

            <div className="circle"></div>
        </div>
    );
};

export default UserOfferBlock;
