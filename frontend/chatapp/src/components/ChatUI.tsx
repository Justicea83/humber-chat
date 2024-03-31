import MessageInput from "./MessageInput";
import AIMessage from "./AIMessage";
import HumanMessage from "./HumanMessage";
import {useEffect, useState} from "react";
import {Chat} from "../@types/chat";
import {v4 as uuidv4} from 'uuid';
import {getPromptStreamEndpoint} from "../utils/helpers";
import ScrollToBottom from 'react-scroll-to-bottom';


const ChatUI = () => {
    const [messages, setMessages] = useState<Chat[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (messages && messages.length > 0) {
            localStorage.setItem('messages', JSON.stringify(messages))
        }
    }, [messages])

    useEffect(() => {
        const chats = localStorage.getItem('messages')
        if (chats) {
            //setMessages(JSON.parse(chats) as Chat[])
        }
    }, [])

    const handlePrompt = (prompt: string) => {
        setLoading(true)
        const botMessageId = uuidv4()
        const incomingChats: Chat[] = [
            {
                id: uuidv4(),
                from: 'human',
                message: prompt
            },
            {
                id: botMessageId,
                from: 'bot',
                message: ''
            }
        ]
        const chats: Chat[] = [...messages, ...incomingChats]

        setMessages(chats)

        streamMessageFromBot(chats, prompt, botMessageId)
    }

    const streamMessageFromBot = (chats: Chat[], prompt: string, messageId: string) => {
        const url = getPromptStreamEndpoint(prompt)
        const chatIndex = chats.findIndex(message => message.id === messageId)

        if (chatIndex === -1) {
            return
        }

        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data) as { text: string };

            if (data.text == '<stream-complete>') {
                eventSource.close()
                setLoading(false)
                return
            }

            const chat = chats[chatIndex]
            chat.message = chat.message += data.text
            chats[chatIndex] = chat
            setMessages([...chats])
        };

        eventSource.onerror = function () {
            eventSource.close();
            setLoading(false)
        };
    }

    return (
        <div className="flex h-[97vh] w-full flex-col">
            {/* Prompt Messages */}
            {
                messages && messages.length > 0 ? (
                    <ScrollToBottom className="flex-1 h-[90vh]">
                        <div
                            className="overflow-y-auto rounded-xl p-4 text-sm leading-6 text-slate-900  dark:text-slate-300 sm:text-base sm:leading-7"
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
                    </ScrollToBottom>
                ) : (
                    <div
                        className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <h2 className="text-slate-900 dark:text-slate-300 font-bold text-2xl">
                                HumberChat
                            </h2>
                            <h2 className="text-slate-900 dark:text-slate-300 mt-2 text-xl">
                                How can I help you today?
                            </h2>
                        </div>
                    </div>

                )
            }


            <MessageInput onPrompt={handlePrompt} loading={loading}/>
        </div>
    )
}

export default ChatUI