import { useNavigate } from "react-router-dom";
import Particle from "../../../assets/ball_and_torus_half.png";
import Offer from "../../../components/UI/OfferTemplate";
import "../../../styles/components/pages/main/WCOC.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { offersData } from "../../../data/offersData";

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
                    <p className="big-text capitalize bold">
                        We deliver quality
                    </p>
                    <p className="small-text">
                        We prioritize quality of work and client experience.
                        That's why you get a range of powerups when you work
                        with us!
                    </p>

                    <div className="particle">
                        <img src={Particle} alt="Particle" />
                    </div>
                </div>
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
