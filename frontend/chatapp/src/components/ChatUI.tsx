import MessageInput from "./MessageInput";
import AIMessage from "./AIMessage";
import HumanMessage from "./HumanMessage";
import {useState} from "react";
import {Chat} from "../@types/chat";
import {v4 as uuidv4} from 'uuid';

const ChatUI = () => {
    const [messages, setMessages] = useState<Chat[]>([
        {
            id: uuidv4(),
            from: 'human',
            message: `
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.
            `
        },
        {
            id: uuidv4(),
            from: 'bot',
            message: `
            Certainly! Quantum computing is a new type of computing that relies on
                        the principles of quantum physics. Traditional computers, like the one
                        you might be using right now, use bits to store and process
                        information. These bits can represent either a 0 or a 1. In contrast,
                        quantum computers use quantum bits, or qubits.
                        Unlike bits, qubits can represent not only a 0 or a 1 but also a
                        superposition of both states simultaneously. This means that a qubit
                        can be in multiple states at once, which allows quantum computers to
                        perform certain calculations much faster and more efficiently
            `
        },
    ])
    const [loading, setLoading] = useState<boolean>(false)

    const handlePrompt = (prompt: string) => {
        console.log('[prompt]', prompt)
        const chats: Chat[] = [...messages]
        const userChat: Chat = {
            id: uuidv4(),
            from: 'human',
            message: prompt
        }
        chats.push(userChat)

        setMessages(chats)

        // TODO connect event source and display message
    }

    return (
        <div className="flex h-[97vh] w-full flex-col">
            {/* Prompt Messages */}
            <div
                className="flex-1 overflow-y-auto rounded-xl p-4 text-sm leading-6 text-slate-900  dark:text-slate-300 sm:text-base sm:leading-7"
            >
                {
                    messages.map(message => {
                        if (message.from === 'bot') {
                            return <AIMessage key={message.id} chat={message}/>
                        } else {
                            return <HumanMessage key={message.id} chat={message}/>
                        }
                    })
                }
            </div>

            <MessageInput onPrompt={handlePrompt} loading={loading}/>
        </div>
    )
}

export default ChatUI