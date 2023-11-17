import React from 'react';
import Project from "../components/UI/ProjectTemplate"
import Service from "../components/UI/ServicesTemplate"
import Langauge from "../components/UI/LanguageTemplate"
import Offer from "../components/UI/OfferTemplate"
import Question from '../components/UI/QuestionTemplate';
import Footer from '../components/Footer';
import "../styles/Main.css"
import { initParallaxEffect } from '../utils/parallax_effect';

import img from "../assets/Source_Health.png"
import python from "../assets/python.png"
import javascript from "../assets/javascript.png"

const Main = () => {

    const parallaxOptions = initParallaxEffect('.side-text', 0.5, 'rotate(-90deg)');

    document.addEventListener('scroll', parallaxOptions);

    const pythonFrameWorks = ['drf', 'django', 'fast api']
    const pythonAdditionalTools = ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'AWS', 'Websockets', 'Docker', 'NGINX', 'Git']

    const javascriptFrameWorks = ['react.js', 'vue.js', 'typescript']
    const javascriptAdditionalTools = ['axios', 'redux']

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

            <div className="projects-container-header">
                <div className='projects-text'>
                    <p className="big-text">EXPERIENCE IN ACTION</p>
                    <p className="small-text">With years of experience, we have had the opportunity to work on a wide range of projects for clients from all over the world, from building custom websites to developing complex web applications in Webflow. Explore our portfolio to see some of our most recent works and learn more about our experience and capabilities.</p>
                </div>

                <div className="projects-container">
                    <span className="side-text rotated-text">PORTFOLIO PROJECTS</span>
                    <Project name="CodeSynth" image={img} tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                    <Project name="CodeAss" image={img} tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                    <Project name="CodeFuck" image={img} tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                    <Project name="CodeSynth" image={img} tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                    <Project name="CodeAss" image={img} tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                    <Project name="CodeFuck" image={img} tags={[{ name: 'lolo' }, { name: 'aahahahaa' }]} />
                </div>
            </div>
            
            <div className="our-services">
                <div className="our-services-text">
                    <p className="big-text">OUR SERVICES</p>
                    <p className="small-text">Services that we can provide to our clients</p>
                </div>

                <div className="our-services-content">
                    <div className="services-title-wrapper">
                        <p className="big-text">SOLUTIONS TO YOUR NEEDS</p>
                        <p className="small-text">We offer a wide range of services designed to help you achieve your goals, from design and user experience to custom development and third-party integrations.</p>
                        <button className="button">GET STARTED</button>
                    </div>

                    <div className="services-items-wrapper">
                        <Service name="service" description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"/>
                        <Service name="service" description="lol test xd"/>
                        <Service name="service" description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"/>
                        <Service name="service" description="lol test xd"/>
                        <Service name="service" description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"/>
                        <Service name="service" description="lol test xd"/>
                        <Service name="service" description="lol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xdlol test xd"/>
                        <Service name="service" description="lol test xd"/>
                    </div>
                </div>
            </div>

            <div className="our-stack-block">
                <div className="our-stack-title">
                    <p className="big-text">OUR STACK</p>
                    <p className="small-text">Programming languages which we use</p>
                </div>

                <div className="our-stack-content">
                    <Langauge name='Python' image={python} frameworks={pythonFrameWorks} additional={pythonAdditionalTools}/>
                    <Langauge name='JavaScript' image={javascript} frameworks={javascriptFrameWorks} additional={javascriptAdditionalTools}/>
                </div>
            </div>

            <div className="we-can-offer-block">
                <div className="we-can-offer-header">
                    <div className="we-can-offer-title">
                        <p className="big-text">WE DELIVER QUALITY</p>
                        <p className="small-text">We prioritize quality of work and client experience. That's why you get a range of powerups when you work with us!</p>
                    </div>

                    <button className="button">START PROJECT</button>
                </div>

                <div className="we-can-offer-content">
                    <Offer name='dsadasdsa' description='dsadasdas' image={python}/>
                    <Offer name='dsada' description='ffffffffff' image={javascript}/>
                    <Offer name='dsadasdsa' description='dsadasdas' image={python}/>
                    <Offer name='dsada' description='ffffffffff' image={javascript}/>
                    <Offer name='dsadasdsa' description='dsadasdas' image={python}/>
                    <Offer name='dsada' description='ffffffffff' image={javascript}/>
                    <Offer name='dsadasdsa' description='dsadasdas' image={python}/>
                    <Offer name='dsada' description='ffffffffff' image={javascript}/>
                    <Offer name='dsada' description='ffffffffff' image={javascript}/>
                </div>
            </div>

            <div className="our-statistic">
                <div className="our-statistic-block red">
                    <p className="biggest-text">50</p>
                    <p className="mid-text">finished projects</p>
                </div>

                <div className="our-statistic-block green">
                    <p className="biggest-text">2</p>
                    <p className="mid-text">Years of experience</p>
                </div>

                <div className="our-statistic-block blue">
                    <p className="biggest-text">40</p>
                    <p className="mid-text">Client worldwide</p>
                </div>
            </div>

            <div className="questions-container">
                <div className="questions-header">
                    <p className="big-text">FAQs</p>
                </div>
                
                <div className="questions-block">
                    <Question answer='dsadas' question='dsadads'/>
                    <Question answer='dsadas' question='dsadads'/>
                    <Question answer='dsadas' question='dsadads'/>
                    <Question answer='dsadas' question='dsadads'/>
                    <Question answer='dsadas' question='dsadads'/>
                </div>
            </div>

            <div className="user-offer-block">
                <div className="user-offer-header">
                    <p className="big-text">TIME TO START UP YOUR PROJECT</p>
                    <p className="small-text">We are ready to realize your dreamed project</p>
                </div>

                <button className="button">Get started</button>
            </div>

            <Footer />
        </div>
    );
}

export default Main;
