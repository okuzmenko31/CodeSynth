import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DisplayMarkdownComponent from "../components/UI/DisplayMarkdownComponent";

import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import ModalWindow from "../components/UI/ModalWindow";
import { Tag } from "../components/UI/ProjectTemplate";
import { detailedProjectsData } from "../data/detailedProjectsData";
import "../styles/pages/DetailedProjectInformation.scss";

export type DetailedProjectInfoType = {
    id: number;
    name: string;
    tags: Tag[];
    preview_image: string;
    source_link: string;
    text: string;
};

const DetailedProjectInformation = () => {
    const params = useParams();
    const staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    const [project, setProject] = useState<DetailedProjectInfoType | undefined>(
        undefined
    );
    const [markdownText, setMarkdownText] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const fillProjectData = (project: DetailedProjectInfoType) => {
        setMarkdownText(project.text);
        setProject(project);
        setIsLoaded(true);
    };

    const getDetailedProjectPage = async () => {
        if (!staticData) {
            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_DOMAIN}/projects/${params.project}/`
                )
                .then((res) => {
                    fillProjectData(res.data);
                })
                .catch(() => setIsModalOpened(true));
        } else {
            const project = detailedProjectsData.find(
                (item) => item.id === parseInt(params.project as string)
            );

            if (!project) {
                setIsLoaded(true);
                setIsModalOpened(true);
            } else {
                fillProjectData(project as DetailedProjectInfoType);
            }
        }
    };

    useEffect(() => {
        getDetailedProjectPage();
    }, []);

    return (
        <>
            <Navbar />

            <div className="detailed-project-page">
                <div className="detailed-project-page-inner">
                    {isLoaded ? (
                        <>
                            {project ? (
                                <>
                                    <div className="detailed-project-page-header">
                                        <p className="big-text">
                                            {project.name}
                                        </p>

                                        <div className="detailed-project-page-header-right">
                                            <div className="detailed-project-page-header-right-button">
                                                <div
                                                    onClick={() =>
                                                        window.open(
                                                            project.source_link,
                                                            "_blank"
                                                        )
                                                    }
                                                    className="drop-down"
                                                >
                                                    Checkout live version
                                                    <svg
                                                        width="auto"
                                                        viewBox="0 0 13 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M0.285059 11.3728C-0.10109 11.7677 -0.0940357 12.4008 0.300815 12.787C0.695667 13.1731 1.32879 13.1661 1.71494 12.7712L0.285059 11.3728ZM11.9203 1.91698C11.9141 1.36473 11.4614 0.92203 10.9092 0.928183L1.90976 1.02846C1.35751 1.03461 0.914807 1.48729 0.92096 2.03954C0.927113 2.59179 1.37979 3.03449 1.93204 3.02833L9.93154 2.9392L10.0207 10.9387C10.0268 11.491 10.4795 11.9337 11.0318 11.9275C11.584 11.9213 12.0267 11.4687 12.0206 10.9164L11.9203 1.91698ZM1.71494 12.7712L11.6353 2.62731L10.2054 1.22894L0.285059 11.3728L1.71494 12.7712Z"
                                                            fill="currentcolor"
                                                            strokeWidth="1px"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="detailed-project-page-header-right-tags">
                                                {project.tags &&
                                                    project.tags.map(
                                                        (tag: Tag) => (
                                                            <div
                                                                key={tag.id}
                                                                className="project-tag"
                                                            >
                                                                <img
                                                                    alt={
                                                                        tag.name
                                                                    }
                                                                    src={
                                                                        tag.img
                                                                    }
                                                                />
                                                                {tag.name}
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    <DisplayMarkdownComponent
                                        markdownText={markdownText}
                                    />
                                </>
                            ) : (
                                <>
                                    {isModalOpened && (
                                        <ModalWindow
                                            text="Can't load detailed project page."
                                            closeModal={() =>
                                                setIsModalOpened(false)
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default DetailedProjectInformation;
