import React from 'react';
import Project from "../components/UI/ProjectTemplate"
import "../styles/Main.css"

const Main = () => {

    return (
        <div className="main-page">
            <div className="what-is">
                <div className="what-is-text">
                    <p className="big-text"><span className="codesynth-text" data-text="CODESYNTH">CODESYNTH</span> - THE COOLETS STARTER WEB STUDIO</p>
                    <p className="small-text">Studio of your dreams and wishes</p>
                </div>
                <div className="what-is-buttons">
                    <button className="button-fill">MAKE ORDER</button>
                    <button className="button">PORTFOLIO</button>
                </div>
            </div>

            <div className="projects-container">
                <span className="side-text rotated-text">PORTFOLIO PROJECTS</span>
                <Project name="CodeSynth" tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                <Project name="CodeAss" tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                <Project name="CodeFuck" tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                <Project name="CodeSynth" tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                <Project name="CodeAss" tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                <Project name="CodeFuck" tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
            </div>
        </div>
    );
}

export default Main;
