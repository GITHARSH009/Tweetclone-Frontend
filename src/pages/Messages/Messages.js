import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Useloggedinuser from '../../hooks/useloggedinuser';
import "../Message.css";
import "../Page.css";
// https://tweetmaster.onrender.com/getOnlineUsers

const Messages = () => {
    const [user] = useAuthState(auth);
    const [loggedInUser] = Useloggedinuser();
    const email = user ? user.email : loggedInUser?.email;
    const [users, setUsers] = useState([]);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (email) {
            axios.get(`https://tweetmaster.onrender.com/getuser/${email}`)
                .then(response => setUsers(response.data))
                .catch(error => console.error("Error fetching users:", error));
        }
    }, [email]);

    useEffect(()=>{
        fetch('https://tweetmaster.onrender.com/getOnlineUsers')
        .then(response=>response.json())
        .then(data=>setOnlineUsers(data.onlineUsers))
        .catch(error=>console.error("Error in fetching the Online Users:",error));
    },[]);

    return (
        <div className='messagePage'>
            <h2 className='pageTitle'>Messages</h2>
            <div className='chatList'>
                {users.map((chatUser) => {
                    const isOnline = onlineUsers?onlineUsers.includes(chatUser.Email):false; // ✅ Check if online
                    console.log("here are online users",onlineUsers);
                    return (
                        <div key={chatUser._id} className='chatItem' onClick={() => navigate(`chat/${chatUser.Email}`)}>
                            <div style={{ position: 'relative' }}>
                                <img src={chatUser.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt={chatUser.Name} className='chatProfile' />
                                {isOnline && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '6px',
                                        right: '1rem',
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: '#10b981',
                                        border: '2px solid white',
                                        borderRadius: '50%',
                                        zIndex:'1'
                                    }}></span>
                                )}
                            </div>
                            <div className='chatInfo'>
                                <h3>{chatUser.Name}</h3>
                                <p>{chatUser.Username || chatUser.Email} {isOnline && (
                                    <span style={{ color: '#10b981', fontSize: '12px'}}>● Online</span>
                                )}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Messages;
