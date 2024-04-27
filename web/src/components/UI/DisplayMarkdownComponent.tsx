import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "../../styles/components/UI/DisplayMarkdownComponent.scss";

type DisplayMarkdownComponentProps = {
    markdownText: string;
};

const DisplayMarkdownComponent = ({
    markdownText,
}: DisplayMarkdownComponentProps) => {
    return (
        <div className="markdown-body">
            <ReactMarkdown
                children={markdownText}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="syntax-highlighter"
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            />
        </div>
    );
};

export default DisplayMarkdownComponent;
