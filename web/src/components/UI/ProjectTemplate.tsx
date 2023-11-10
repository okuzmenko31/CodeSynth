import React from "react"
import "../../styles/Project.css"

import { addClassOnScroll } from "../../utils/add_class_on_scroll";

const Project = ({name, image, tags}: { name: string, image: any, tags?: any[] }) => {

    const handleScrollFunction = addClassOnScroll(['.project-block-wrapper', 'not_scrolled'], Math.floor(window.innerHeight / 4));

    window.addEventListener('scroll', handleScrollFunction);
    document.addEventListener('DOMContentLoaded', handleScrollFunction);

    return(
        <div className="project-container">
            <div className="project-block-wrapper">
                <div className="project-block">
                    <img alt={name} src={image} className="project-image-preview"/>
                </div>
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