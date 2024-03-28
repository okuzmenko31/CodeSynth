import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/UI/Button";
import "../styles/pages/PageNotFound.scss";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="page-not-found">
                <div className="page-not-found-content">
                    <div className="page-not-found-text">
                        <p>404</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50%"
                            height="100%"
                            viewBox="0 0 357 21"
                            fill="none"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                            role="img"
                        >
                            <path
                                d="M5.89725 15.0691C56.1769 5.84091 227.519 -1.28803 351.576 14.1394"
                                stroke="url(#paint0_linear_2138_768)"
                                strokeWidth="10.0189"
                                strokeLinecap="round"
                            ></path>
                            <defs>
                                <linearGradient
                                    id="paint0_linear_2138_768"
                                    x1="384.005"
                                    y1="34.3747"
                                    x2="-56.0965"
                                    y2="42.5748"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="var(--additional-primary-color)"></stop>
                                    <stop
                                        offset="1"
                                        stopColor="var(--secondary-color)"
                                    ></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <Button
                        text="TAKE ME BACK!"
                        callback={() => {
                            navigate(-1);
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default PageNotFound;
