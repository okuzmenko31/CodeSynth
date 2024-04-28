import "../../styles/components/UI/Offer.scss";
import { FilterType } from "../pages/main/PortfolioBlock";

type FiltersBlockProps = {
    filters: FilterType[];
    dropDownToggle: (e: any) => any;
    changeChosenFiltersList: (e: any) => any;
};

const FiltersBlock = ({
    filters,
    dropDownToggle,
    changeChosenFiltersList,
}: FiltersBlockProps) => {
    return (
        <>
            {filters.length > 0 && (
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
                        {filters.map((filter: FilterType) => (
                            <div
                                id={filter.id.toString()}
                                onClick={changeChosenFiltersList}
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
            )}
        </>
    );
};

export default FiltersBlock;
