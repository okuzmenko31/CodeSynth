import axios from "axios";
import { useSelector } from "react-redux";
import { filterTypes } from "../data/filterTypes";

class FiltersController {
    private staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    constructor(
        private chosenFilters: number[],
        private setFilters: any,
        private setChosenFilters: any
    ) {}

    public getFilterTypes = async () => {
        if (!this.staticData) {
            const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/filter_types`;
            await axios.get(getUrl).then((res) => {
                this.setFilters(res.data);
            });
        } else {
            this.setFilters(filterTypes);
        }
    };

    public changeChoosedFiltersList = (e: any) => {
        const parentId: number = +e.currentTarget.id;
        const chechbox = e.currentTarget.querySelector("input");
        const index: number = this.chosenFilters.indexOf(parentId);

        if (index !== -1) {
            const updatedFilters: string[] | number[] =
                this.chosenFilters.filter((item) => item != parentId);
            this.setChosenFilters(updatedFilters);
            chechbox.checked = false;
        } else {
            const updatedFilters: string[] | number[] = [
                ...this.chosenFilters,
                parentId,
            ];
            this.setChosenFilters(updatedFilters);
            chechbox.checked = true;
        }
    };
}

export default FiltersController;
