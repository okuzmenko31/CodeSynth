import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Project, { Tag } from "../../../components/UI/ProjectTemplate";
import { filterTypes } from "../../../data/filterTypes";
import "../../../styles/components/pages/main/PortfolioBlock.scss";
import { initParallaxEffect } from "../../../utils/parallax_effect";
import ProjectsController from "../../../utils/projectsControllet";
import Button from "../../UI/Button";

export type ProjectType = {
    id: number;
    name: string;
    tags: Tag[];
    preview_image: string;
    source_link: string;
};

export type FilterType = {
    id: number;
    name: string;
};

const PortfolioBlock = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [filters, setFilters] = useState<FilterType[]>([]);
    const [choosedFilters, setChoosedFilters] = useState<number[]>([]);
    const [projectUrl, setProjectUrl] = useState("/api/v1/projects/all/");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = useSelector((state: any) => state.pageReducer.page);
    const staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    const projectsNumber = 10;

    const parallaxOptions = initParallaxEffect(
        ".side-text",
        0.5,
        "rotate(-90deg)"
    );

    const projectsController = new ProjectsController(
        projects,
        projectUrl,
        setProjects,
        setProjectUrl,
        page,
        projectsNumber,
        choosedFilters
    );

    const getFilterTypes = async () => {
        if (!staticData) {
            const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/filter_types`;
            await axios.get(getUrl).then((res) => {
                setFilters(res.data);
            });
        } else {
            setFilters(filterTypes);
        }
    };

    const dropDownToggle = (e: any) => {
        e.stopPropagation();
        const dropdown = document.querySelector(".drop-down");
        const list = document.querySelector(".drop-down-list");

        if (dropdown && list) {
            dropdown.classList.toggle("active");
            list.classList.toggle("active");

            document.onclick = (e: any) => {
                e.stopPropagation();
                list.classList.remove("active");
                dropdown.classList.remove("active");
            };
        }
    };

    const changeChoosedFiltersList = (e: any) => {
        const parentId: number = +e.currentTarget.id;
        const chechbox = e.currentTarget.querySelector("input");
        const index: number = choosedFilters.indexOf(parentId);

        if (index !== -1) {
            const updatedFilters: string[] | number[] = choosedFilters.filter(
                (item) => item != parentId
            );
            setChoosedFilters(updatedFilters);
            chechbox.checked = false;
        } else {
            const updatedFilters: string[] | number[] = [
                ...choosedFilters,
                parentId,
            ];
            setChoosedFilters(updatedFilters);
            chechbox.checked = true;
        }
    };

    useEffect(() => {
        projectsController.getProjectsByChoosedFilters();
    }, [choosedFilters]);

    useEffect(() => {
        projectsController.getProjectsInitial();
        getFilterTypes();

        window.addEventListener("scroll", parallaxOptions);
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

            <div className="project-filters-block">
                <div onClick={dropDownToggle} className="drop-down">
                    Filters
                    <svg
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 11.727H11V9.81792H7V11.727ZM0 0.272461V2.18155H18V0.272461H0ZM3 6.95428H15V5.04519H3V6.95428Z"
                            fill="currentcolor"
                        ></path>
                    </svg>
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="drop-down-list"
                >
                    {filters &&
                        filters.map((filter: FilterType) => (
                            <div
                                id={filter.id.toString()}
                                onClick={changeChoosedFiltersList}
                                className="drop-down-item"
                                key={filter.id}
                            >
                                <input
                                    className="filter-checkbox"
                                    type="checkbox"
                                />
                                {filter.name}
                            </div>
                        ))}
                </div>
            </div>

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
            <Button
                text="SHOW MORE"
                id="show_more"
                callback={() => {
                    projectsController.loadMoreProjects();
                }}
            />
        </div>
    );
};

export default PortfolioBlock;
