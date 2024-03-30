

const MessageInput = () => {
    return (
        <form className="mt-2">
                <label htmlFor="chat-input" className="sr-only">How can we help?</label>
                <div className="relative">
                    <textarea
                        id="chat-input"
                        className="block w-full resize-none rounded-xl border-[.5px] border-slate-50 bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:border-[0] focus:ring-2 focus:ring-blue-200 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-200 sm:text-base"
                        placeholder="How can we help?"
                        rows={1}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
                    >
                        Send <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
    )
}

export default MessageInput