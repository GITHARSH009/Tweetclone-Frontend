import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase.init';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import "./Chat.css";
import "../../Page.css";

const Chat = () => {
    const { chatUserEmail } = useParams(); // Get chat user's email from URL
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatUser, setChatUser] = useState(null); // Store chat user details
    const currentUser = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser && chatUserEmail) {
            const chatId = [currentUser.email, chatUserEmail].sort().join("-");
            console.log("Chat ID:", chatId);

            const messagesRef = collection(db, "messages");
            const q = query(messagesRef, where("chatId", "==", chatId), orderBy("timestamp"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const loadedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMessages(loadedMessages);
                console.log("Fetched Messages:", loadedMessages);
            });

            return () => unsubscribe();
        }
    }, [currentUser, chatUserEmail]);

    useEffect(() => {
        // Fetch chat user's details using the API
        fetch(`http://localhost:8002/loggedInUser?email=${chatUserEmail}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setChatUser(data[0]); // API returns an array, so use the first item
                } else {
                    console.warn("Chat user not found.");
                }
            })
            .catch(error => console.error("Error fetching chat user details:", error));
    }, [chatUserEmail]);

    const sendMessage = async () => {
        if (newMessage.trim() === "") return;

        try {
            const chatId = [currentUser.email, chatUserEmail].sort().join("-");
            await addDoc(collection(db, "messages"), {
                chatId,
                sender: currentUser.email,
                receiver: chatUserEmail,
                text: newMessage,
                timestamp: new Date(),
            });

            setNewMessage(""); // Clear input field after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className='chatContainer'>
            {/* Cover Image */}
            <div className='chatCover'>
                <img 
                    src={chatUser?.coverImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} 
                    alt="Cover" 
                    className="chatCoverImage"
                />
            </div>

            {/* Chat Header */}
            <div className='chatHeader'>
                <button onClick={() => navigate("/Home/messages")}>⬅ Back</button>
                <img 
                    src={chatUser?.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} 
                    alt={chatUser?.Name || "User"} 
                    className="chatProfileImage"
                />
                <div className="chatUserInfo">
                    <h3>{chatUser?.Name || "Unknown User"}</h3>
                </div>
            </div>

            {/* Messages Section */}
            <div className='chatMessages'>
                {messages.map(msg => (
                    <div key={msg.id} className={msg.sender === currentUser.email ? 'messageSent' : 'messageReceived'}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className='chatInput'>
                <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder='Type a message...'
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
