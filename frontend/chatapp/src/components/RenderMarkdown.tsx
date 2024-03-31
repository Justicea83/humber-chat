import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import React, {AnchorHTMLAttributes} from "react";


interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const LinkRenderer: React.FC<LinkProps> = (props) => (
    <a {...props} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
        {props.children}
    </a>
);

const RenderMarkdown: React.FC<{ content: string }> = ({ content }) => {
    // @ts-ignore
    return (
        <div className="overflow-y-auto whitespace-pre-wrap">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    a: LinkRenderer
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default RenderMarkdown;
