import "../../../styles/components/pages/main/OurStatistics.scss";

const OurStatistics = () => {
    return (
        <div className="our-statistic">
            <div className="our-statistic-text">
                <p className="small-text capitalize additional">
                    our experience
                </p>
                <p className="big-text capitalize bold">
                    it’s about your satisfying
                </p>
            </div>

            <div className="our-statistic-blocks">
                <div className="our-statistic-block">
                    <div className="our-statistic-block-number purple biggest-text bold">
                        <p>50</p>
                        <span>+</span>
                    </div>
                    <p className="mid-text upper-case">Finished projects</p>
                </div>

                <div className="our-statistic-block">
                    <div className="our-statistic-block-number orange biggest-text bold">
                        <p>3</p>
                        <span>+</span>
                    </div>
                    <p className="mid-text upper-case">Years of experience</p>
                </div>

                <div className="our-statistic-block">
                    <div className="our-statistic-block-number blue biggest-text bold">
                        <p>40</p>
                        <span>+</span>
                    </div>
                    <p className="mid-text upper-case">Client worldwide</p>
                </div>
            </div>
        </div>
    );
};

export default OurStatistics;
