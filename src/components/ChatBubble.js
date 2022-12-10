function ChatBubble( {message} ) {

    return(
        <div className={localStorage.getItem('email') === message.author ? 'bg-green-300 text-left' : 'bg-red-300 text-right'}>
            {message.message}{message.author}
        </div>
    )
}

export default ChatBubble;