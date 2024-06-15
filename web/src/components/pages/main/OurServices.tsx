import "../../../styles/components/pages/main/OurServices.scss";
import Button from "../../UI/Button";

const OurServices = () => {
    const services = [
        {
            name: "UI/UX design",
            location: "web",
        },
        {
            name: "UI/UX design",
            location: "web",
        },
        {
            name: "UI/UX design",
            location: "web",
        },
        {
            name: "UI/UX design",
            location: "web",
        },
    ];
    return (
        <div className="our-services">
            <p className="big-text capitalize bold">our services</p>

            <div className="our-services-blocks">
                {services.map((service, index) => (
                    <>
                        <div key={index} className="our-services-block">
                            <div className="our-services-block-info">
                                <span className="mid-text transparent thin">
                                    {index + 1 < 10
                                        ? `0${index + 1}`
                                        : index + 1}
                                </span>
                                <span className="pre-big-text bold">
                                    {service.name}
                                </span>
                            </div>

                            <Button
                                callback={() => console.log("clicked")}
                                style={{
                                    borderRadius: "50%",
                                    maxWidth: "50px",
                                    maxHeight: "50px",
                                }}
                            >
                                <svg
                                    width="19"
                                    height="13"
                                    viewBox="0 0 19 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.1425 11.7866L17.4292 6.49995M17.4292 6.49995L12.1425 1.21329M17.4292 6.49995L1.5692 6.49995"
                                        stroke="var(--white)"
                                        stroke-width="1.9825"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </Button>
                        </div>

                        {index !== services.length - 1 ? (
                            <span className="line"></span>
                        ) : null}
                    </>
                ))}
            </div>
        </div>
    );
};

export default OurServices;
