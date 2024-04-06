import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "../components/UI/ProjectTemplate";
import { ProjectType } from "../components/pages/main/PortfolioBlock";
import { projectsData } from "../data/projects";
import { setPage } from "../redux/actions";

class ProjectsController {
    private dispatch = useDispatch();

    private staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );
    private page = useSelector((state: any) => state.pageReducer.page);

    constructor(
        private projects: ProjectType[],
        private projectUrl: string,
        private setProjects: any,
        private setProjectUrl: any,
        private projectsNumber: number,
        private chosenFilters: number[]
    ) {}

    private hideLoadButton = (length: number, threshold: number) => {
        const showMore = document.getElementById("show_more");

        if (showMore) {
            if (length > 0 && length < threshold) {
                showMore.style.display = "none";
            } else if (length === 0) {
                showMore.style.display = "none";
            } else {
                showMore.style.display = "flex";
            }
        }
    };

    public getProjectsInitial = async () => {
        if (!this.staticData) {
            const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}${this.projectUrl}?page=${this.page}&size=${this.projectsNumber}`;

            await axios.get(getUrl).then((res) => {
                this.setProjects(res.data);
            });
        } else {
            const sliceFrom = this.page * this.projectsNumber;
            const sliceTo =
                this.page * this.projectsNumber + this.projectsNumber;
            const newProjects = projectsData.slice(sliceFrom, sliceTo);

            this.setProjects(newProjects);
        }
    };

    public getProjectsByChoosedFilters = async () => {
        if (!this.staticData) {
            if (this.chosenFilters.length > 0) {
                this.dispatch(setPage(0));
                this.setProjectUrl("/projects/filter_by_filter_types/");

                const postUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/projects/filter_by_filter_types/?page=0&size=${this.projectsNumber}`;

                await axios
                    .post(postUrl, {
                        filter_types: this.chosenFilters,
                    })
                    .then((res) => {
                        this.setProjects(res.data);

                        this.hideLoadButton(res.data.length, 1);
                    });
            } else {
                this.dispatch(setPage(0));
                this.setProjectUrl("/projects/all/");
                const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/projects/all/?page=0&size=${this.projectsNumber}`;

                await axios.get(getUrl).then((res) => {
                    this.setProjects(res.data);

                    this.hideLoadButton(res.data.length, 1);
                });
            }
        } else {
            this.dispatch(setPage(0));

            if (this.chosenFilters.length > 0) {
                const filteredProjects = projectsData.filter(
                    (item: ProjectType) =>
                        item.tags.some((tag: Tag) =>
                            this.chosenFilters.includes(tag.id)
                        )
                );
                const newProjects = filteredProjects.slice(
                    0,
                    this.projectsNumber
                );

                this.setProjects(newProjects);

                this.hideLoadButton(
                    filteredProjects.length,
                    this.projectsNumber
                );
            } else {
                const newProjects = projectsData.slice(0, this.projectsNumber);

                this.setProjects(newProjects);

                this.hideLoadButton(projectsData.length, this.projectsNumber);
            }
        }
    };

    public loadMoreProjects = async () => {
        const newPage = this.page + 1;
        this.dispatch(setPage(newPage));

        const showMore = document.getElementById("show_more");

        if (!this.staticData) {
            if (this.chosenFilters.length > 0) {
                const postUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}${this.projectUrl}?page=${newPage}&size=${this.projectsNumber}`;

                await axios
                    .post(postUrl, {
                        filter_types: this.chosenFilters,
                    })
                    .then((res) => {
                        if (showMore) {
                            if (res.data.length > 0) {
                                const newArray: any[any] = [
                                    ...this.projects,
                                    ...res.data,
                                ];
                                this.setProjects(newArray);
                                this.hideLoadButton(
                                    res.data.length,
                                    this.projectsNumber
                                );
                            } else {
                                showMore.style.display = "none";
                            }
                        }
                    });
            } else {
                const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}${this.projectUrl}?page=${newPage}&size=${this.projectsNumber}`;

                await axios.get(getUrl).then((res) => {
                    if (showMore) {
                        if (res.data.length > 0) {
                            const newArray: any[any] = [
                                ...this.projects,
                                ...res.data,
                            ];
                            this.setProjects(newArray);
                            this.hideLoadButton(
                                res.data.length,
                                this.projectsNumber
                            );
                        } else {
                            showMore.style.display = "none";
                        }
                    }
                });
            }
        } else {
            const sliceFrom = newPage * this.projectsNumber;
            const sliceTo = newPage * this.projectsNumber + this.projectsNumber;

            if (this.chosenFilters.length > 0) {
                const filteredProjects = projectsData.filter(
                    (item: ProjectType) =>
                        item.tags.some((tag: Tag) =>
                            this.chosenFilters.includes(tag.id)
                        )
                );
                const counter = filteredProjects.slice(
                    sliceFrom,
                    sliceTo
                ).length;

                const newProjects = filteredProjects.slice(0, sliceTo);

                this.setProjects(newProjects);
                this.hideLoadButton(counter, this.projectsNumber);
            } else {
                const newProjects = projectsData.slice(0, sliceTo);

                const counter = projectsData.slice(sliceFrom, sliceTo).length;

                this.setProjects(newProjects);
                this.hideLoadButton(counter, this.projectsNumber);
            }
        }
    };
}

export default ProjectsController;
