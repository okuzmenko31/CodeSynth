import MDEditor from "@uiw/react-md-editor";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/components/UI/DisplayMarkdownComponent.scss";

type DisplayMarkdownComponentProps = {
    markdownText: string;
};

const DisplayMarkdownComponent = ({
    markdownText,
}: DisplayMarkdownComponentProps) => {
    const { project } = useParams();
    const [markdownInitialized, setMarkdownInitialized] = useState(false);

    useEffect(() => {
        if (markdownInitialized) {
            const updateAnchors = () => {
                const anchors =
                    document.querySelectorAll<HTMLAnchorElement>(".anchor");
                anchors.forEach((anchor) => {
                    anchor.href = `project/${project}#${
                        anchor.href.split("#")[1]
                    }`;
                });
            };
            updateAnchors();
        }
    }, [markdownInitialized, project]);

    useEffect(() => {
        setMarkdownInitialized(true);
    }, []);

    const customComponents = {
        blockquote: (blockquoteItem: any) => {
            const filteredNodeChildren = blockquoteItem.node.children.filter(
                (item: any) => item.value !== "\n"
            );

            return (
                <blockquote>
                    <span className="blockquote-info">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </span>
                    {filteredNodeChildren.map(
                        (nodeChild: any, nodeChildIndex: number) => {
                            const Element = nodeChild.tagName;

                            return (
                                <Element key={nodeChildIndex}>
                                    {nodeChild.children.map(
                                        (
                                            childChild: any,
                                            childChildIndex: number
                                        ) => (
                                            <span key={childChildIndex}>
                                                {childChild.value}
                                            </span>
                                        )
                                    )}
                                </Element>
                            );
                        }
                    )}
                </blockquote>
            );
        },
    };

    return (
        <MDEditor.Markdown
            components={customComponents}
            className="markdown-body"
            source={markdownText}
        />
    );
};
export default DisplayMarkdownComponent;
