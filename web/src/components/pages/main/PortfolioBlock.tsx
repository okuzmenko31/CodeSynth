import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Project from "../../../components/UI/ProjectTemplate";
import { setPage } from "../../../redux/actions";
import "../../../styles/components/pages/main/PortfolioBlock.scss";
import { initParallaxEffect } from "../../../utils/parallax_effect";
import Button from "../../UI/Button";

const PortfolioBlock = () => {
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState([]);
    const [choosedFilters, setChoosedFilters] = useState<number[]>([]);
    const [projectUrl, setProjectUrl] = useState("/api/v1/projects/all/");
    const page = useSelector((state: any) => state.pageReducer.page);
    const dispatch = useDispatch();

    const parallaxOptions = initParallaxEffect(
        ".side-text",
        0.5,
        "rotate(-90deg)"
    );

    useEffect(() => {
        document
            .querySelector(".main-page")
            ?.addEventListener("scroll", parallaxOptions);
    }, []);

    useEffect(() => {
        if (choosedFilters.length > 0) {
            dispatch(setPage(0));
            setProjectUrl("/api/v1/projects/filter_by_filter_types/");

            axios
                .post(
                    process.env.REACT_APP_BACKEND_DOMAIN +
                        "/api/v1/projects/filter_by_filter_types/?page=0&size=10",
                    {
                        filter_types: choosedFilters,
                    }
                )
                .then((res) => {
                    setProjects(res.data);
                    const showMore = document.getElementById("show_more");

                    if (res.data.length < 1) {
                        if (showMore) {
                            showMore.style.display = "none";
                        }
                    } else {
                        if (showMore) {
                            showMore.style.display = "flex";
                        }
                    }
                });
        } else {
            dispatch(setPage(0));
            setProjectUrl("/api/v1/projects/all/");

            axios
                .get(
                    process.env.REACT_APP_BACKEND_DOMAIN +
                        "/api/v1/projects/all/?page=0&size=10"
                )
                .then((res) => {
                    setProjects(res.data);
                    const showMore = document.getElementById("show_more");

                    if (res.data.length < 1) {
                        if (showMore) {
                            showMore.style.display = "none";
                        }
                    } else {
                        if (showMore) {
                            showMore.style.display = "flex";
                        }
                    }
                });
        }
    }, [choosedFilters]);

    useEffect(() => {
        axios
            .get(
                process.env.REACT_APP_BACKEND_DOMAIN +
                    projectUrl +
                    `?page=${page}&size=10`
            )
            .then((res) => {
                setProjects(res.data);
            });

        axios
            .get(
                `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/filter_types`
            )
            .then((res) => {
                setFilters(res.data);
            });
    }, []);

    const loadMoreProjects = async (e: any) => {
        const newPage = page + 1;
        dispatch(setPage(newPage));

        const showMore = e.target;

        if (choosedFilters.length > 0) {
            await axios
                .post(
                    process.env.REACT_APP_BACKEND_DOMAIN +
                        projectUrl +
                        `?page=${newPage}&size=10`,
                    {
                        filter_types: choosedFilters,
                    }
                )
                .then((res) => {
                    if (res.data.length > 0) {
                        const newArray: any[any] = [...projects, ...res.data];
                        setProjects(newArray);
                        if (res.data.length < 10) {
                            showMore.style.display = "none";
                        }
                    } else {
                        showMore.style.display = "none";
                    }
                });
        } else {
            await axios
                .get(
                    process.env.REACT_APP_BACKEND_DOMAIN +
                        projectUrl +
                        `?page=${newPage}&size=10`
                )
                .then((res) => {
                    if (res.data.length > 0) {
                        const newArray: any[any] = [...projects, ...res.data];
                        setProjects(newArray);
                        if (res.data.length < 10) {
                            showMore.style.display = "none";
                        }
                    } else {
                        showMore.style.display = "none";
                    }
                });
        }
    };

    type ProjectType = {
        id: number;
        name: string;
        tags: string[];
        preview_image: string;
        source_link: string;
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
                        filters.map((filter: any) => (
                            <div
                                id={filter.id}
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
                callback={(e: any) => {
                    loadMoreProjects(e);
                }}
            />
        </div>
    );
};

export default PortfolioBlock;
