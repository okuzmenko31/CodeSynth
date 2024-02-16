import "../../styles/components/UI/Language.scss";

type TechnologyType = {
    name: string;
    image: string;
};

const Language = ({
    name,
    technologies,
}: {
    name: string;
    technologies: TechnologyType[];
}) => {
    return (
        <div className="technology-tech">
            <div className="technology-name">
                <p>{name}</p>
            </div>

            <div className="technologies">
                {technologies &&
                    technologies.map(
                        (technology: TechnologyType, index: number) => (
                            <div className="technology-tech-small" key={index}>
                                <img src={technology.image} />
                                {technology.name}
                            </div>
                        )
                    )}
            </div>
        </div>
    );
};

export default Language;
