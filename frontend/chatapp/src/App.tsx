import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from '@chatscope/chat-ui-kit-react'
import {useState} from "react";

function App() {

    const [chatMessages, setChatMessages] = useState([
        {
            message: "Hello, I am ChatGPT!",
            sender: "ChatGPT",
        },
    ]);

    const handleUserMessage = () => {

    }

    return (
        <>
            <div style={{position: "relative", height: "90vh", width: "700px"}}>
                {/* All components are wrapped in the MainContainer */}
                <MainContainer>
                    {/* All chat logic will be contained in the ChatContainer */}
                    <ChatContainer>
                        {/* Shows all our messages */}
                        <MessageList>
                            {/* Map through chat messages and render each message */}
                            {chatMessages.map((message, i) => {
                                return (
                                    <Message
                                        key={i}
                                        model={message}
                                        style={message.sender === "ChatGPT" ? {textAlign: "left"} : {}}
                                    />
                                );
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type Message here" onSend={handleUserMessage}/>
                    </ChatContainer>
                </MainContainer>
            </div>
        </>
    )
}

export default App
