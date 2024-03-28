import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Service from "../../../components/UI/ServicesTemplate";
import { ServiceType, servicesData } from "../../../data/servicesData";
import { paths } from "../../../router/routes";
import "../../../styles/components/pages/main/OurServicesContent.scss";
import Button from "../../UI/Button";

const OurServicesContent = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState<ServiceType[]>([]);
    const staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    const getServices = async () => {
        if (!staticData) {
        } else {
            setServices(servicesData);
        }
    };

    useEffect(() => {
        getServices();
    }, []);
    return (
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
                        We offer a wide range of services designed to help you
                        achieve your goals, from design and user experience to
                        custom development and third-party integrations.
                    </p>

                    <Button
                        text="GET STARTED"
                        callback={() => {
                            navigate(paths.makeOrder);
                        }}
                    />
                </div>

                <div className="services-items-wrapper">
                    {services &&
                        services.map((service: ServiceType) => (
                            <Service
                                key={service.id}
                                name={service.name}
                                description={service.description}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default OurServicesContent;
