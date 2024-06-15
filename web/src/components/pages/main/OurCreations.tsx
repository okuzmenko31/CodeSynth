import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Creation from "../../../components/UI/CreationsTemplate";
import { CreationType, creationsData } from "../../../data/servicesData";
import "../../../styles/components/pages/main/OurCreations.scss";

const OurCreations = () => {
    const [services, setServices] = useState<CreationType[]>([]);
    const staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    const getServices = async () => {
        if (!staticData) {
        } else {
            setServices(creationsData);
        }
    };

    useEffect(() => {
        getServices();
    }, []);
    return (
        <div id="services" className="our-creations">
            <div className="our-creations-content">
                <div className="creations-title-wrapper">
                    <p className="small-text additional capitalize">
                        we’re in action
                    </p>
                    <p className="big-text capitalize bold">
                        Solutions to your needs
                    </p>
                </div>

                <div className="creations-items-wrapper">
                    {services &&
                        services.map((service: CreationType) => (
                            <Creation
                                key={service.id}
                                icon={service.icon}
                                name={service.name}
                                description={service.description}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default OurCreations;
