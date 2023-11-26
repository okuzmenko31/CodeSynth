import React from "react";
import "../../styles/components/UI/Offer.css"


const Service = ({name, description, image}: {name: string, description: string, image: any}) => {
    return (
        <div className="offer-block">
            <div className="offer-icon">
                <img alt={name} src={image}/>
            </div>

            <div className="offer-block-text">
                <p className="big-text">{name}</p>
                <p className="small-text">{description}</p>
            </div>
        </div>
    )
}

export default Service;