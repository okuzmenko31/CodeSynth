import React from "react"
import "../../styles/Project.css"

const Project = ({name, tags}: { name: string, tags?: any[] }) => {
    return(
        <div className="project-container">
            <div className="project-block">
                dsdadsadas
            </div>

            <div className="project-tags-block">
                {
                    tags &&
                    tags.map((tag: any, index: number) => (
                        <div key={index} className="project-tag">{tag.name}</div>
                    ))
                }
            </div>
            
            <p className="mid-text">{name}</p>
        </div>
    )
}

export default Project