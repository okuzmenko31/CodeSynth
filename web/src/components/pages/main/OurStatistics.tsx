import "../../../styles/components/pages/main/OurStatistics.scss";

const OurStatistics = () => {
    return (
        <div className="our-statistic">
            <div className="our-statistic-block red">
                <p className="biggest-text">50</p>
                <p className="mid-text">Finished projects</p>
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
    );
};

export default OurStatistics;
