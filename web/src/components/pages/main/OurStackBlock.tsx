import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stackData } from "../../../data/stack";
import "../../../styles/components/pages/main/OurStackBlock.scss";
import Language from "../../UI/LanguageTemplate";

export type StackTechnologies = {
    name: string;
    image: string;
};

export type Stack = {
    name: string;
    technologies: StackTechnologies[];
};

const OurStackBlock = () => {
    const [stack, setStack] = useState<Stack[]>([]);

    const staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    const getStack = async () => {
        if (!staticData) {
        } else {
            setStack(stackData);
        }
    };

    useEffect(() => {
        getStack();
    }, []);

    return (
        <div className="our-stack-block">
            <div className="our-stack-title">
                <p className="big-text">OUR STACK</p>
                <p className="small-text">Programming languages which we use</p>
            </div>

            <div className="our-stack-content">
                {stack &&
                    stack.map((tech, index) => (
                        <Language
                            key={index}
                            name={tech.name}
                            technologies={tech.technologies}
                        />
                    ))}
            </div>
        </div>
    );
};

export default OurStackBlock;
