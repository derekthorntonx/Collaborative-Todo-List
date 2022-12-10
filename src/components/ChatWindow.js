import Paperclip from '../assets/paperclip.png';
import ChatBubble from './ChatBubble';
import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';


function ChatWindow() {
    //states probably wont work for userIsAuthor, just make it a conditional
    //if authorID + authenticated ID are the same
    const [messageInput, setMessageInput] = useState('');
    const [showChat, setShowChat] = useState(true);
    const toggleChatWindow = () => setShowChat(!showChat);
    const sendChatMessage = async (e) => {
        e.preventDefault();
        if (messageInput === ""){
            alert('Cannot send an empty message.');
            return;
        }
        await addDoc(collection(db, 'chatMessages'), {
            message: messageInput,
            time: Timestamp.now()
           // author: 
        })
        setMessageInput('');
    };

    return (
        <>
        <div className={showChat ? 'invisible' : 'postion: absolute bottom-0 right-0 min-w-[500px] h-[2.5vh] bg-slate-400 cursor-pointer text-center rounded-t-lg hover:bg-slate-500 visible'} onClick={toggleChatWindow}>Expand Chat Window</div>
        <div className={showChat ? 'h-[65vh] max-w-[33vw] min-w-[500px] position: absolute bottom-0 right-0 flex flex-col drop-shadow-2xl visible' : 'h-[65vh] max-w-[33vw] min-w-[500px] position: absolute bottom-0 right-0 flex flex-col drop-shadow-2xl invisible'}>
            <div className='bg-slate-400 cursor-pointer text-center rounded-t-lg hover:bg-slate-500' onClick={toggleChatWindow}>
            Collapse Chat Window
            </div>
            <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 h-[88%] p-2 flex flex-col">
                <ul>
                    <ChatBubble />
                    <ChatBubble />
                    <li>{messageInput}</li>
                    <li>placeholder</li>
                    <li>placeholder</li>
                </ul>
            </div>
            <form onSubmit={sendChatMessage} className="bg-slate-400 flex align-center h-[8%] p-1 gap-2">
                <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className='w-[80%] pl-2' type='text' placeholder="text goes here..."/>
                <img alt='Attach' className='bg-transparent hover:scale-75 cursor-pointer'src={Paperclip} />
                <button type='submit' className="w-[65px] rounded-full bg-cyan-400 cursor-pointer hover:scale-75">Send</button>
            </form>
        </div>
        </>
    )
}

export default ChatWindow;