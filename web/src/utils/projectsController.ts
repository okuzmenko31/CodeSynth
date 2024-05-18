import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "../components/UI/ProjectTemplate";
import { ProjectType } from "../components/pages/main/PortfolioBlock";
import { projectsData } from "../data/projects";
import { setPage } from "../redux/actions";

type ProjectsControllerOptions = {
    projects: ProjectType[];
    projectUrl: string;
    setProjects: any;
    setProjectUrl: any;
    projectsNumber: number;
    chosenFilters: number[];
    buttonRef?: any;
};

class ProjectsController {
    private dispatch = useDispatch();

    private staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );
    private page = useSelector((state: any) => state.pageReducer.page);

    constructor(private options: ProjectsControllerOptions) {}

    private hideLoadButton = (length: number, threshold: number) => {
        setTimeout(() => {
            const showMore =
                this.options.buttonRef.current ||
                document.getElementById("show_more");

            if (showMore) {
                if (length < threshold || length === 0) {
                    showMore.style.display = "none";
                } else {
                    showMore.style.display = "flex";
                }
            }
        }, 0);
    };

    public getCurrentProjects = async () => {
        if (!this.staticData) {
            if (this.options.chosenFilters.length > 0) {
                this.dispatch(setPage(0));
                this.options.setProjectUrl("/projects/filter_by_filter_types/");

                const postUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/projects/filter_by_filter_types/?page=0&size=${this.options.projectsNumber}`;

                await axios
                    .post(postUrl, {
                        filter_types: this.options.chosenFilters,
                    })
                    .then((res) => {
                        this.options.setProjects(res.data);

                        this.hideLoadButton(res.data.length, 1);
                    });
            } else {
                this.dispatch(setPage(0));
                this.options.setProjectUrl("/projects/all/");
                const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/projects/all/?page=0&size=${this.options.projectsNumber}`;

                await axios.get(getUrl).then((res) => {
                    this.options.setProjects(res.data);

                    this.hideLoadButton(res.data.length, 1);
                });
            }
        } else {
            this.dispatch(setPage(0));

            if (this.options.chosenFilters.length > 0) {
                const filteredProjects = projectsData.filter(
                    (item: ProjectType) =>
                        item.tags.some((tag: Tag) =>
                            this.options.chosenFilters.includes(tag.id)
                        )
                );
                const newProjects = filteredProjects.slice(
                    0,
                    this.options.projectsNumber
                );

                this.options.setProjects(newProjects);

                this.hideLoadButton(
                    filteredProjects.length,
                    this.options.projectsNumber
                );
            } else {
                const newProjects = projectsData.slice(
                    0,
                    this.options.projectsNumber
                );

                this.options.setProjects(newProjects);

                this.hideLoadButton(
                    projectsData.length,
                    this.options.projectsNumber
                );
            }
        }
    };

    public loadMoreProjects = async () => {
        const newPage = this.page + 1;
        this.dispatch(setPage(newPage));

        const showMore =
            this.options.buttonRef.current ||
            document.getElementById("show_more");

        if (!this.staticData) {
            if (this.options.chosenFilters.length > 0) {
                const postUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}${this.options.projectUrl}?page=${newPage}&size=${this.options.projectsNumber}`;

                await axios
                    .post(postUrl, {
                        filter_types: this.options.chosenFilters,
                    })
                    .then((res) => {
                        if (showMore) {
                            if (res.data.length > 0) {
                                const newArray: any[any] = [
                                    ...this.options.projects,
                                    ...res.data,
                                ];
                                this.options.setProjects(newArray);
                                this.hideLoadButton(
                                    res.data.length,
                                    this.options.projectsNumber
                                );
                            } else {
                                showMore.style.display = "none";
                            }
                        }
                    });
            } else {
                const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}${this.options.projectUrl}?page=${newPage}&size=${this.options.projectsNumber}`;

                await axios.get(getUrl).then((res) => {
                    if (showMore) {
                        if (res.data.length > 0) {
                            const newArray: any[any] = [
                                ...this.options.projects,
                                ...res.data,
                            ];
                            this.options.setProjects(newArray);
                            this.hideLoadButton(
                                res.data.length,
                                this.options.projectsNumber
                            );
                        } else {
                            showMore.style.display = "none";
                        }
                    }
                });
            }
        } else {
            const sliceFrom = newPage * this.options.projectsNumber;
            const sliceTo =
                newPage * this.options.projectsNumber +
                this.options.projectsNumber;

            if (this.options.chosenFilters.length > 0) {
                const filteredProjects = projectsData.filter(
                    (item: ProjectType) =>
                        item.tags.some((tag: Tag) =>
                            this.options.chosenFilters.includes(tag.id)
                        )
                );
                const counter = filteredProjects.slice(
                    sliceFrom,
                    sliceTo
                ).length;

                const newProjects = filteredProjects.slice(0, sliceTo);

                this.options.setProjects(newProjects);
                this.hideLoadButton(counter, this.options.projectsNumber);
            } else {
                const newProjects = projectsData.slice(0, sliceTo);

                const counter = projectsData.slice(sliceFrom, sliceTo).length;

                this.options.setProjects(newProjects);
                this.hideLoadButton(counter, this.options.projectsNumber);
            }
        }
    };
}

export default ProjectsController;
