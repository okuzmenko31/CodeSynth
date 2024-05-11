import { useEffect, useState } from "react";
import { Tag } from "../../../components/UI/ProjectTemplate";
import "../../../styles/components/pages/main/PortfolioBlock.scss";
import { dropDownToggle } from "../../../utils/dropDownToggle";
import FiltersController from "../../../utils/filtersController";
import { initParallaxEffect } from "../../../utils/parallax_effect";
import ProjectsController from "../../../utils/projectsControllet";
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

    const projectsNumber = 10;

    const projectsController = new ProjectsController(
        projects,
        projectUrl,
        setProjects,
        setProjectUrl,
        projectsNumber,
        chosenFilters
    );

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

        window.addEventListener(
            "scroll",
            initParallaxEffect(".side-text", 0.5, "rotate(-90deg)")
        );
    }, []);

    return (
        <div id="portfolio" className="projects-container-header">
            <div className="projects-text">
                <p className="big-text">EXPERIENCE IN ACTION</p>
                <p className="small-text">
                    With years of experience, we have had the opportunity to
                    work on a wide range of projects for clients from all over
                    the world, from building custom websites to developing
                    complex web applications in Webflow. Explore our portfolio
                    to see some of our most recent works and learn more about
                    our experience and capabilities.
                </p>
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
            ) : projects.length > 0 ? (
                <ProjectsBlock
                    projects={projects}
                    loadFunction={projectsController.loadMoreProjects}
                />
            ) : (
                <p>
                    No projects available at the moment. Please check back
                    later.
                </p>
            )}
        </div>
    );
};

export default PortfolioBlock;
