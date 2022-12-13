function ChatBubble( {message} ) {

    return(
        <div className={localStorage.getItem('email') === message.author ? 'bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 text-left mb-2 p-2 rounded-lg' : 'bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 text-right mb-2 p-2 rounded-lg'}>
            <h3>{message.message}</h3><h6 className={localStorage.getItem('email') === message.author ? 'text-right' : 'text-left'}>{localStorage.getItem('name')}</h6>
        </div>
    )
}

export default ChatBubble;