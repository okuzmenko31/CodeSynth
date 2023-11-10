import React, { useCallback } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const ParticlesBackground = ({ fpsLimit, speed }: { fpsLimit: number, speed: number }) => {
    const particlesInit = useCallback(async (engine: any) => {
        console.log(engine);
        await loadFull(engine);
    }, []);
    
    const particlesLoaded = useCallback(async (container: any) => {
        await console.log(container);
    }, []);
    
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
            background: {
                color: {
                    value: "#181818",
                },
            },
            fpsLimit: fpsLimit,
            interactivity: {
                events: {
                resize: true,
                },
            },
            particles: {
                color: {
                value: "#ffffff",
                },
                links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
                },
                move: {
                direction: "none",
                enable: true,
                outModes: {
                default: "bounce",
                },
                random: false,
                speed: speed,
                straight: false,
            },
            number: {
                density: {
                enable: true,
                area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
            },
            detectRetina: true,
            }}
        />
    );
}
    
export default ParticlesBackground;