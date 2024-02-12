import "../../styles/components/UI/Service.scss";

const Service = ({
    name,
    description,
}: {
    name: string;
    description: string;
}) => {
    return (
        <div className="service-block">
            <p className="big-text">{name}</p>
            <p className="small-text">{description}</p>
        </div>
    );
};

export default Service;
