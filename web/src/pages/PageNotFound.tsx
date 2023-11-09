import React from 'react';
import { useNavigate } from "react-router-dom"
import "../styles/PageNotFound.css"

const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="page-not-found">
            <div className="page-not-found-content">
                <div className="page-not-found-text">
                    <p>404</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="100%" viewBox="0 0 357 21" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                        <path d="M5.89725 15.0691C56.1769 5.84091 227.519 -1.28803 351.576 14.1394" stroke="url(#paint0_linear_2138_768)" stroke-width="10.0189" stroke-linecap="round"></path>
                        <defs>
                        <linearGradient id="paint0_linear_2138_768" x1="384.005" y1="34.3747" x2="-56.0965" y2="42.5748" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#8F00FF"></stop>
                        <stop offset="1" stop-color="#FF00D6"></stop>
                        </linearGradient>
                        </defs>
                    </svg>
                </div>
                <button className="button" onClick={() => navigate(-1)}>Take me back!</button>
            </div>
        </div>
    );
}

export default PageNotFound;
