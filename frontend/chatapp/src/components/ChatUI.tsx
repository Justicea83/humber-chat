import MessageInput from "./MessageInput";

const ChatUI = () => {
    return (
        <div className="flex h-[97vh] w-full flex-col">
            {/* Prompt Messages */}
            <div
                className="flex-1 overflow-y-auto rounded-xl p-4 text-sm leading-6 text-slate-900  dark:text-slate-300 sm:text-base sm:leading-7"
            >
                <div className="flex flex-row px-2 py-4 sm:px-4">
                    <img
                        className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                        src="https://dummyimage.com/256x256/363536/ffffff&text=U"
                    />

                    <div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>

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
                        src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
                    />

                    <div className="rounded-xl">
                        <p>
                            Certainly! Quantum computing is a new type of computing that relies on
                            the principles of quantum physics. Traditional computers, like the one
                            you might be using right now, use bits to store and process
                            information. These bits can represent either a 0 or a 1. In contrast,
                            quantum computers use quantum bits, or qubits.
                            Unlike bits, qubits can represent not only a 0 or a 1 but also a
                            superposition of both states simultaneously. This means that a qubit
                            can be in multiple states at once, which allows quantum computers to
                            perform certain calculations much faster and more efficiently
                        </p>
                    </div>
                </div>

            </div>

            <MessageInput />
        </div>
    )
}

export default ChatUI