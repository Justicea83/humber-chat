import {Chat} from "../@types/chat";
import RenderMarkdown from "./RenderMarkdown";

interface AIMessageProps {
    chat: Chat
}

const AIMessage = ({chat}: AIMessageProps) => {
    return (
        <>
            <div className="mb-2 flex w-full flex-row justify-end gap-x-2 text-slate-500">
                <button className="hover:text-blue-600" type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
                        ></path>
                        <path
                            d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
                        ></path>
                    </svg>
                </button>
            </div>

            <div
                className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-900 sm:px-4"
            >
                <img
                    className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                    src="https://dummyimage.com/256x256/354ea1/ffffff&text=AI"
                    alt="pic"
                />

                <RenderMarkdown content={chat.message}/>
            </div>
        </>
    )
}

export default AIMessage