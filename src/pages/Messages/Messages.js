import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Useloggedinuser from '../../hooks/useloggedinuser';
import "../Message.css";
import "../Page.css";

const Messages = () => {
    const [user] = useAuthState(auth);
    const [loggedInUser] = Useloggedinuser();
    const email = user ? user.email : loggedInUser?.email;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (email) {
            axios.get(`https://tweetmaster.onrender.com/getuser/${email}`)
                .then(response => setUsers(response.data))
                .catch(error => console.error("Error fetching users:", error));
        }
    }, [email]);

    return (
        <div className='messagePage'>
            <h2 className='pageTitle'>Messages</h2>
            <div className='chatList'>
                {users.map((chatUser) => (
                    <div key={chatUser._id} className='chatItem' onClick={() => navigate(`chat/${chatUser.Email}`)}>
                        <img src={chatUser.profileImage} alt={chatUser.Name} className='chatProfile' />
                        <div className='chatInfo'>
                            <h3>{chatUser.Name}</h3>
                            <p>{chatUser.Username || chatUser.Email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
