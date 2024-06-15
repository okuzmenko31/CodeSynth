import "../../styles/components/UI/Offer.scss";

const Offer = ({
    name,
    description,
    image,
}: {
    name: string;
    description: string;
    image: string;
}) => {
    return (
        <div className="offer-block">
            <img className="offer-icon" alt={name} src={image} />

            <div className="offer-block-title">
                <p className="small-text upper-case">{name}</p>
            </div>

            <p className="small-text thin">{description}</p>
        </div>
    );
};

export default Offer;
