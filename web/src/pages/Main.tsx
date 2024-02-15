import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Langauge from "../components/UI/LanguageTemplate";
import Offer from "../components/UI/OfferTemplate";
import Project from "../components/UI/ProjectTemplate";
import Question from "../components/UI/QuestionTemplate";
import Service from "../components/UI/ServicesTemplate";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "../styles/pages/Main.scss";
import { initParallaxEffect } from "../utils/parallax_effect";

import javascript from "../assets/javascript.png";
import python from "../assets/python.png";
import Button from "../components/UI/Button";

const Main = () => {
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState([]);
    const [choosedFilters, setChoosedFilters] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const [projectUrl, setProjectUrl] = useState("/api/v1/projects/all/");
    const navigate = useNavigate();

    useEffect(() => {
        if (choosedFilters.length > 0) {
            setPage(0);
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
            setPage(0);
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

    const loadMoreProjects = async (e: any) => {
        const newPage = page + 1;
        setPage(newPage);

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

    const parallaxOptions = initParallaxEffect(
        ".side-text",
        0.5,
        "rotate(-90deg)"
    );

    const pythonFrameWorks = ["drf", "django", "fast api"];
    const pythonAdditionalTools = [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "RabbitMQ",
        "AWS",
        "Websockets",
        "Docker",
        "NGINX",
        "Git",
    ];

    const javascriptFrameWorks = ["react.js", "vue.js", "typescript"];
    const javascriptAdditionalTools = ["axios", "redux"];

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

        document
            .querySelector(".main-page")
            ?.addEventListener("scroll", parallaxOptions);
    }, []);

    return (
        <>
            <Navbar />
            <div className="main-page">
                <div className="what-is">
                    <div className="what-is-text">
                        <p className="big-text">
                            <span
                                className="codesynth-text"
                                data-text="CODESYNTH"
                            >
                                CODESYNTH
                            </span>{" "}
                            - THE COOLETS STARTER WEB STUDIO
                        </p>
                        <p className="small-text">
                            Studio of your dreams and wishes
                        </p>
                    </div>

                    <div className="what-is-buttons">
                        <Button
                            text="MAKE ORDER"
                            callback={() => navigate("/make_order")}
                        />
                        <Button
                            text="PORTFOLIO"
                            callback={() => {
                                window.location.pathname = "/";
                                window.location.hash = "#portfolio";
                            }}
                        />
                    </div>
                </div>

                <div id="portfolio" className="projects-container-header">
                    <div className="projects-text">
                        <p className="big-text">EXPERIENCE IN ACTION</p>
                        <p className="small-text">
                            With years of experience, we have had the
                            opportunity to work on a wide range of projects for
                            clients from all over the world, from building
                            custom websites to developing complex web
                            applications in Webflow. Explore our portfolio to
                            see some of our most recent works and learn more
                            about our experience and capabilities.
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

                <div id="services" className="our-services">
                    <div className="our-services-text">
                        <p className="big-text">OUR SERVICES</p>
                        <p className="small-text">
                            Services that we can provide to our clients
                        </p>
                    </div>

                    <div className="our-services-content">
                        <div className="services-title-wrapper">
                            <p className="big-text">SOLUTIONS TO YOUR NEEDS</p>
                            <p className="small-text">
                                We offer a wide range of services designed to
                                help you achieve your goals, from design and
                                user experience to custom development and
                                third-party integrations.
                            </p>

                            <Button
                                text="GET STARTED"
                                callback={() => {
                                    navigate("/make_order");
                                }}
                            />
                        </div>

                        <div className="services-items-wrapper">
                            <Service
                                name="service"
                                description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"
                            />
                            <Service name="service" description="lol test xd" />
                            <Service
                                name="service"
                                description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"
                            />
                            <Service name="service" description="lol test xd" />
                            <Service
                                name="service"
                                description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"
                            />
                            <Service name="service" description="lol test xd" />
                            <Service
                                name="service"
                                description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"
                            />
                            <Service name="service" description="lol test xd" />
                        </div>
                    </div>
                </div>

                <div className="our-stack-block">
                    <div className="our-stack-title">
                        <p className="big-text">OUR STACK</p>
                        <p className="small-text">
                            Programming languages which we use
                        </p>
                    </div>

                    <div className="our-stack-content">
                        <Langauge
                            name="Python"
                            image={python}
                            frameworks={pythonFrameWorks}
                            additional={pythonAdditionalTools}
                        />
                        <Langauge
                            name="JavaScript"
                            image={javascript}
                            frameworks={javascriptFrameWorks}
                            additional={javascriptAdditionalTools}
                        />
                    </div>
                </div>

                <div id="why-us" className="we-can-offer-block">
                    <div className="we-can-offer-header">
                        <div className="we-can-offer-title">
                            <p className="big-text">WE DELIVER QUALITY</p>
                            <p className="small-text">
                                We prioritize quality of work and client
                                experience. That's why you get a range of
                                powerups when you work with us!
                            </p>
                        </div>

                        <Button
                            text="START PROJECT"
                            callback={() => {
                                navigate("/make_order");
                            }}
                        />
                    </div>

                    <div className="we-can-offer-content">
                        <Offer
                            name="dsadasdsa"
                            description="dsadasdas"
                            image={python}
                        />
                        <Offer
                            name="dsada"
                            description="ffffffffff"
                            image={javascript}
                        />
                        <Offer
                            name="dsadasdsa"
                            description="dsadasdas"
                            image={python}
                        />
                        <Offer
                            name="dsada"
                            description="ffffffffff"
                            image={javascript}
                        />
                        <Offer
                            name="dsadasdsa"
                            description="dsadasdas"
                            image={python}
                        />
                        <Offer
                            name="dsada"
                            description="ffffffffff"
                            image={javascript}
                        />
                        <Offer
                            name="dsadasdsa"
                            description="dsadasdas"
                            image={python}
                        />
                        <Offer
                            name="dsada"
                            description="ffffffffff"
                            image={javascript}
                        />
                        <Offer
                            name="dsada"
                            description="ffffffffff"
                            image={javascript}
                        />
                    </div>
                </div>

                <div className="our-statistic">
                    <div className="our-statistic-block red">
                        <p className="biggest-text">50</p>
                        <p className="mid-text">finished projects</p>
                    </div>

                    <div className="our-statistic-block green">
                        <p className="biggest-text">2</p>
                        <p className="mid-text">Years of experience</p>
                    </div>

                    <div className="our-statistic-block blue">
                        <p className="biggest-text">40</p>
                        <p className="mid-text">Client worldwide</p>
                    </div>
                </div>

                <div id="faqs" className="questions-container">
                    <div className="questions-header">
                        <p className="big-text">FAQs</p>
                    </div>

                    <div className="questions-block">
                        <Question answer="dsadas" question="dsadads" />
                        <Question answer="dsadas" question="dsadads" />
                        <Question answer="dsadas" question="dsadads" />
                        <Question answer="dsadas" question="dsadads" />
                        <Question answer="dsadas" question="dsadads" />
                    </div>
                </div>

                <div className="user-offer-block">
                    <div className="user-offer-header">
                        <p className="big-text">
                            TIME TO START UP YOUR PROJECT
                        </p>
                        <p className="small-text">
                            We are ready to realize your dreamed project
                        </p>
                    </div>

                    <Button
                        text="GET STARTED"
                        callback={() => {
                            navigate("/make_order");
                        }}
                    />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Main;
