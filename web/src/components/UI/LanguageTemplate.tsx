import React from "react"
import "../../styles/components/UI/Language.css"

const Language = ({name, frameworks, additional, image}: { name: string, frameworks: string[], additional?: string[], image: any }) => {

    return(
        <div className="language-tech">
            <div className="language-name">
                <p className="big-text">{name}</p>
                <img alt={name} src={image}/>
            </div>

            <ul className="language-frame-works mid-text">
                {
                    frameworks &&
                    frameworks.map((framework: string, index: number) => (
                        <li key={index}>{framework}</li>
                    ))
                }
            </ul>

            {additional &&
                <ul className="language-additional-tools mid-text">
                <p>ADDITIONAL TOOLS:</p>
                    {
                        additional &&
                        additional.map((tool: string, index: number) => (
                            <li key={index}>{tool}</li>
                        ))
                    }
                    <p>AND OTHERS</p>
                </ul>
            }
        </div>
    )
}

export default Language;