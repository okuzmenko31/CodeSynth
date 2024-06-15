import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "../styles/pages/Main.scss";

import FAQS from "../components/pages/main/FAQS";
import OurCompany from "../components/pages/main/OurCompany";
import OurCreations from "../components/pages/main/OurCreations";
import OurServices from "../components/pages/main/OurServices";
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

                <OurCompany />

                <OurStatistics />

                <OurServices />

                <PortfolioBlock />

                <OurCreations />

                <WCOC />

                <FAQS />

                <UserOfferBlock />

                <Footer />
            </div>
        </>
    );
};

export default Main;
