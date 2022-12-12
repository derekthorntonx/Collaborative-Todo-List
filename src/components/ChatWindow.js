import ChatBubble from './ChatBubble';
import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, Timestamp, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ChatPop from '../assets/pop.ogg';


function ChatWindow() {
    const [messageInput, setMessageInput] = useState('');
    const [showChat, setShowChat] = useState(true);
    const [messages, setMessages] = useState([]);
    const toggleChatWindow = () => setShowChat(!showChat);
    const sendChatMessage = async (e) => {
        e.preventDefault();
        if (auth.currentUser.emailVerified===false){
            alert('You must sign-in to send messages.')
            return;
        }
        if (messageInput === ""){
            alert('Cannot send an empty message.');
            return;
        }
        new Audio(ChatPop).play();
        await addDoc(collection(db, 'chatMessages'), {
            message: messageInput,
            time: Timestamp.now(),
            author: localStorage.getItem('email')
        })
        setMessageInput('');
    };

    useEffect(() => {
        const q = query(collection(db, 'chatMessages'), orderBy('time'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messagesArray = [];
            querySnapshot.forEach((message) => {
                messagesArray.push({...message.data(), id: message.id})
            })
            setMessages(messagesArray);
        });
        return () => unsubscribe();
    }, [])

    return (
        <>
        <div className={showChat ? 'invisible' : 'postion: fixed bottom-0 right-0 min-w-[500px] h-[2.5vh] bg-slate-400 cursor-pointer text-center rounded-t-lg hover:bg-slate-500 visible z-10'} onClick={toggleChatWindow}>Expand Chat Window</div>
        <div className={showChat ? 'h-[65vh] max-w-[33vw] min-w-[500px] position: fixed bottom-0 right-0 flex flex-col drop-shadow-2xl visible z-10' : 'h-[65vh] max-w-[33vw] min-w-[500px] position: absolute bottom-0 right-0 flex flex-col drop-shadow-2xl invisible'}>
            <div className='bg-slate-400 cursor-pointer text-center rounded-t-lg hover:bg-slate-500' onClick={toggleChatWindow}>
            Collapse Chat Window
            </div>
            <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 h-[88%] p-2 flex flex-col overflow-scroll">
                <ul>
                    {messages.map((message, index) => (
                        <ChatBubble key={index} message={message}/>
                    ))}
                </ul>
            </div>
            <form onSubmit={sendChatMessage} className="bg-slate-400 flex align-center h-[8%] p-1 gap-2">
                <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className='w-[80%] pl-2' type='text' placeholder="text goes here..."/>
                <button type='submit' className="w-[65px] rounded-full bg-cyan-400 cursor-pointer hover:scale-75">Send</button>
            </form>
        </div>
        </>
    )
}

export default ChatWindow;