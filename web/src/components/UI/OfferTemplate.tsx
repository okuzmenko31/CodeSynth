import "../../styles/components/UI/Offer.scss";

const Service = ({
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
            <div className="offer-icon">
                <img alt={name} src={image} />
            </div>

            <div className="offer-block-text">
                <p className="mid-text">{name}</p>
                <p className="small-text">{description}</p>
            </div>
        </div>
    );
};

export default Service;
