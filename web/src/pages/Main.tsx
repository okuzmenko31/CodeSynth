import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "../styles/pages/Main.scss";

import FAQS from "../components/pages/main/FAQS";
import OurServicesContent from "../components/pages/main/OurServicesContent";
import OurStackBlock from "../components/pages/main/OurStackBlock";
import OurStatistics from "../components/pages/main/OurStatistics";
import PortfolioBlock from "../components/pages/main/PortfolioBlock";
import UserOfferBlock from "../components/pages/main/UserOfferBlock";
import WCOC from "../components/pages/main/WCOC";
import WhatIsBlock from "../components/pages/main/WhatIsBlock";

const Main = () => {
    return (
        <>
            <Navbar />
            <div className="main-page">
                <WhatIsBlock />

                <PortfolioBlock />

                <OurServicesContent />

                <OurStackBlock />

                <WCOC />

                <OurStatistics />

                <FAQS />

                <UserOfferBlock />

                <Footer />
            </div>
        </>
    );
};

export default Main;
