import React from "react"
import "../../styles/Language.css"

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
                    frameworks.map((framework: string) => (
                        <li>{framework}</li>
                    ))
                }
            </ul>

            <ul className="language-additional-tools mid-text">
            {additional && additional.length > 0 && <p>ADDITIONAL TOOLS:</p>}
                {
                    additional &&
                    additional.map((tool: string) => (
                        <li>{tool}</li>
                    ))
                }
                {additional && additional.length > 0 && <p>AND OTHERS</p>}
            </ul>
        </div>
    )
}

export default Language;