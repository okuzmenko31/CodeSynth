import { useNavigate } from "react-router-dom";
import "../../../styles/components/pages/main/UserOfferBlock.scss";
import Button from "../../UI/Button";

const UserOfferBlock = () => {
    const navigate = useNavigate();
    return (
        <div className="user-offer-block">
            <div className="user-offer-header">
                <p className="big-text">TIME TO START UP YOUR PROJECT</p>
                <p className="small-text">
                    We are ready to realize your dreamed project
                </p>
            </div>

            <Button
                text="GET STARTED"
                callback={() => {
                    navigate("/make_order");
                }}
            />
        </div>
    );
};

export default UserOfferBlock;
