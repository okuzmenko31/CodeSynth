import { useNavigate } from "react-router-dom";
import Offer from "../../../components/UI/OfferTemplate";
import "../../../styles/components/pages/main/WCOC.scss";
import Button from "../../UI/Button";

import javascript from "../../../assets/javascript.png";
import python from "../../../assets/python.png";

const WCOC = () => {
    const navigate = useNavigate();

    return (
        <div id="why-us" className="we-can-offer-block">
            <div className="we-can-offer-header">
                <div className="we-can-offer-title">
                    <p className="big-text">WE DELIVER QUALITY</p>
                    <p className="small-text">
                        We prioritize quality of work and client experience.
                        That's why you get a range of powerups when you work
                        with us!
                    </p>
                </div>

                <Button
                    text="START PROJECT"
                    callback={() => {
                        navigate("/make_order");
                    }}
                />
            </div>

            <div className="we-can-offer-content">
                <Offer
                    name="dsadasdsa"
                    description="dsadasdas"
                    image={python}
                />
                <Offer
                    name="dsada"
                    description="ffffffffff"
                    image={javascript}
                />
                <Offer
                    name="dsadasdsa"
                    description="dsadasdas"
                    image={python}
                />
                <Offer
                    name="dsada"
                    description="ffffffffff"
                    image={javascript}
                />
                <Offer
                    name="dsadasdsa"
                    description="dsadasdas"
                    image={python}
                />
                <Offer
                    name="dsada"
                    description="ffffffffff"
                    image={javascript}
                />
                <Offer
                    name="dsadasdsa"
                    description="dsadasdas"
                    image={python}
                />
                <Offer
                    name="dsada"
                    description="ffffffffff"
                    image={javascript}
                />
                <Offer
                    name="dsada"
                    description="ffffffffff"
                    image={javascript}
                />
            </div>
        </div>
    );
};

export default WCOC;
