import {Chat} from "../@types/chat";

interface HumanMessageProps {
    chat: Chat
}

const HumanMessage = ({chat}: HumanMessageProps) => {
    return (
        <div className="flex flex-row px-2 py-4 sm:px-4">
            <img
                className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                src="https://dummyimage.com/256x256/363536/ffffff&text=Y"
            />

            <div>
                <p>{chat.message}</p>
            </div>
        </div>
    )
}

export default HumanMessage