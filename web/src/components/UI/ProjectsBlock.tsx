import "../../styles/components/UI/Offer.scss";
import { ProjectType } from "../pages/main/PortfolioBlock";
import Project from "./ProjectTemplate";

type ProjectsBlockProps = {
    projects: ProjectType[];
    loadFunction: () => any;
};

const ProjectsBlock = ({ projects, loadFunction }: ProjectsBlockProps) => {
    return (
        <>
            <div className="projects-container">
                <span className="side-text rotated-text">
                    PORTFOLIO PROJECTS
                </span>
                {projects &&
                    projects.map((el: ProjectType) => (
                        <Project
                            key={el.id}
                            name={el.name}
                            image={el.preview_image}
                            tags={el.tags}
                            project_link={el.source_link}
                            checkout_link={`project/${el.id}`}
                        />
                    ))}
            </div>
            <div onClick={loadFunction} className="drop-down" id="show_more">
                Show More
                <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.00195 1.00042C9.00218 0.448134 8.55466 0.000231273 8.00237 1.04713e-07C7.45009 -0.000231063 7.00218 0.447297 7.00195 0.999581L9.00195 1.00042ZM7.28869 15.7068C7.67905 16.0975 8.31222 16.0978 8.7029 15.7074L15.0695 9.34611C15.4602 8.95575 15.4605 8.32258 15.0701 7.93189C14.6798 7.5412 14.0466 7.54094 13.6559 7.9313L7.99669 13.5858L2.3422 7.92657C1.95184 7.53588 1.31867 7.53561 0.927986 7.92597C0.537298 8.31633 0.537033 8.9495 0.927394 9.34019L7.28869 15.7068ZM7.00195 0.999581L6.99609 14.9996L8.99609 15.0004L9.00195 1.00042L7.00195 0.999581Z"
                        fill="currentcolor"
                    ></path>
                </svg>
            </div>
        </>
    );
};

export default ProjectsBlock;
