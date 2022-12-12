function ChatBubble( {message} ) {

    return(
        <div className={localStorage.getItem('email') === message.author ? 'bg-green-300 text-left' : 'bg-red-300 text-right'}>
            <h4>{message.message}</h4><h6>{localStorage.getItem('name')}</h6>
        </div>
    )
}

export default ChatBubble;