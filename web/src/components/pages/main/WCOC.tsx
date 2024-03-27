import { useNavigate } from "react-router-dom";
import Offer from "../../../components/UI/OfferTemplate";
import "../../../styles/components/pages/main/WCOC.scss";
import Button from "../../UI/Button";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { offersData } from "../../../data/offersData";
import { paths } from "../../../router/routes";

export type OfferType = {
    id: number;
    name: string;
    description: string;
    image: string;
};

const WCOC = () => {
    const navigate = useNavigate();
    const [offers, setOffers] = useState<OfferType[]>([]);
    const staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    const getOffers = async () => {
        if (!staticData) {
        } else {
            setOffers(offersData);
        }
    };

    useEffect(() => {
        getOffers();
    }, []);

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
                        navigate(paths.makeOrder);
                    }}
                />
            </div>

            <div className="we-can-offer-content">
                {offers &&
                    offers.map((offer: OfferType) => (
                        <Offer
                            key={offer.id}
                            name={offer.name}
                            description={offer.description}
                            image={offer.image}
                        />
                    ))}
            </div>
        </div>
    );
};

export default WCOC;
