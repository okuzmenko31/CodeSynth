import "../../styles/components/UI/Creation.scss";

const Creation = ({
    icon,
    name,
    description,
}: {
    icon: any;
    name: string;
    description: string;
}) => {
    return (
        <div className="creation-block">
            {icon}
            <div className="creation-block-info">
                <p className="pre-big-text bold">{name}</p>
                <p className="small-text">{description}</p>
            </div>
        </div>
    );
};

export default Creation;
