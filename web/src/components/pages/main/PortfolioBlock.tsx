import { useEffect, useRef, useState } from "react";
import { Tag } from "../../../components/UI/ProjectTemplate";
import "../../../styles/components/pages/main/PortfolioBlock.scss";
import { dropDownToggle } from "../../../utils/dropDownToggle";
import FiltersController from "../../../utils/filtersController";
import ProjectsController from "../../../utils/projectsController";
import FiltersBlock from "../../UI/FiltersBlock";
import Loader from "../../UI/Loader";
import ProjectsBlock from "../../UI/ProjectsBlock";

export type ProjectType = {
    id: number;
    name: string;
    tags: Tag[];
    preview_image: string;
    source_link?: string;
    colors?: string[];
};

export type FilterType = {
    id: number;
    name: string;
};

const PortfolioBlock = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [filters, setFilters] = useState<FilterType[]>([]);
    const [chosenFilters, setChosenFilters] = useState<number[]>([]);
    const [projectUrl, setProjectUrl] = useState("/projects/all/");
    const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);
    const [isFilterTypesLoaded, setIsFilterTypesLoaded] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const projectsNumber = 10;

    const options = {
        projects,
        projectUrl,
        setProjects,
        setProjectUrl,
        projectsNumber,
        chosenFilters,
        buttonRef,
    };

    const projectsController = new ProjectsController(options);

    const filtersController = new FiltersController(
        chosenFilters,
        setFilters,
        setChosenFilters
    );

    useEffect(() => {
        setIsProjectsLoaded(false);

        projectsController
            .getCurrentProjects()
            .then(() => setIsProjectsLoaded(true));
    }, [chosenFilters]);

    useEffect(() => {
        setIsFilterTypesLoaded(false);

        filtersController
            .getFilterTypes()
            .then(() => setIsFilterTypesLoaded(true));
    }, []);

    return (
        <div id="portfolio" className="projects-container-header">
            <div className="projects-text">
                <p className="small-text capitalize additional">our work</p>
                <p className="big-text bold capitalize">what we create</p>
            </div>

            {isFilterTypesLoaded && filters.length > 0 && (
                <FiltersBlock
                    filters={filters}
                    dropDownToggle={dropDownToggle}
                    changeChosenFiltersList={
                        filtersController.changeChosenFiltersList
                    }
                />
            )}

            {!isProjectsLoaded ? (
                <Loader />
            ) : (
                <ProjectsBlock
                    projects={projects}
                    loadFunction={projectsController.loadMoreProjects}
                    buttonRef={buttonRef}
                />
            )}
        </div>
    );
};

export default PortfolioBlock;
