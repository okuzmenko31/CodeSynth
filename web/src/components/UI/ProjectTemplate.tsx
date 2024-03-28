import { Link, useNavigate } from "react-router-dom";
import "../../styles/components/UI/Project.scss";

import { addClassOnScroll } from "../../utils/add_class_on_scroll";

export type Tag = {
    name: string;
    img: string;
    id: number;
};

const Project = ({
    name,
    image,
    tags,
    project_link,
    checkout_link,
}: {
    name: string;
    image: string;
    tags?: Tag[];
    project_link?: string;
    checkout_link?: string;
}) => {
    const handleScrollFunction = addClassOnScroll(
        [".inner-container", "not_scrolled"],
        Math.floor(window.innerHeight / 4)
    );

    const navigate = useNavigate();

    window.addEventListener("scroll", handleScrollFunction);
    document.addEventListener("DOMContentLoaded", handleScrollFunction);

    return (
        <div className="project-container">
            <div className="inner-container">
                <div
                    className="project-block"
                    onClick={() => navigate("checkout_link")}
                >
                    <img
                        alt={name}
                        src={image}
                        className="project-image-preview"
                    />
                </div>

                <div className="project-buttons">
                    {project_link && (
                        <Link
                            to={project_link}
                            target="_blank"
                            className="project-link project__btn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 51 26"
                                className="project-link-button-icon"
                            >
                                <path d="M4.81786 13.148C4.81786 8.93404 8.3425 5.50868 12.6786 5.50868H22.8214V0.826538H12.6786C5.68 0.826538 0 6.34654 0 13.148C0 19.9494 5.68 25.4694 12.6786 25.4694H22.8214V20.7873H12.6786C8.3425 20.7873 4.81786 17.3619 4.81786 13.148ZM15.2143 15.6123H35.5V10.6837H15.2143V15.6123ZM38.0357 0.826538H27.8929V5.50868H38.0357C42.3718 5.50868 45.8964 8.93404 45.8964 13.148C45.8964 17.3619 42.3718 20.7873 38.0357 20.7873H27.8929V25.4694H38.0357C45.0343 25.4694 50.7143 19.9494 50.7143 13.148C50.7143 6.34654 45.0343 0.826538 38.0357 0.826538Z" />
                            </svg>
                        </Link>
                    )}

                    {checkout_link && (
                        <Link
                            to={checkout_link}
                            target="_blank"
                            className="project-checkout project__btn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 34 34"
                                className="project-checkout-button-icon"
                            >
                                <path d="M1.31169 29.1139C0.324651 30.1009 0.324651 31.7013 1.31169 32.6883C2.29874 33.6754 3.89903 33.6754 4.88607 32.6883L1.31169 29.1139ZM33.4286 3.09888C33.4286 1.703 32.297 0.571412 30.9011 0.571411L8.15383 0.571413C6.75794 0.571412 5.62636 1.703 5.62636 3.09888C5.62636 4.49477 6.75794 5.62636 8.15383 5.62636H28.3736V25.8461C28.3736 27.2421 29.5052 28.3736 30.9011 28.3736C32.297 28.3736 33.4286 27.2421 33.4286 25.8461V3.09888ZM4.88607 32.6883L32.6883 4.88607L29.1139 1.31169L1.31169 29.1139L4.88607 32.6883Z" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>

            <div className="project-tags-block">
                {tags &&
                    tags.map((tag: Tag) => (
                        <div key={tag.id} className="project-tag">
                            <img alt={tag.name} src={tag.img} />
                            {tag.name}
                        </div>
                    ))}
            </div>

            <p className="mid-text">{name}</p>
        </div>
    );
};

export default Project;
