import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const RenderMarkdown = ({content}: { content: string }) => {
    const LinkRenderer = ({node, ...props}) => (
        <a {...props} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
            {props.children}
        </a>
    );

    return (
        <div className="overflow-y-auto whitespace-pre-wrap">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    a: LinkRenderer,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default RenderMarkdown;
