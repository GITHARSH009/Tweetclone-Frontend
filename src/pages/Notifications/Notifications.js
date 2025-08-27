import React, { useEffect, useState } from "react";
import "../Page.css";
import Useloggedinuser from '../../hooks/useloggedinuser';
import { auth } from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import "./Notification.css";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useAuthState(auth);
    const [loggedInUser] = Useloggedinuser();
    const email = user ? user.email : loggedInUser?.email;

    useEffect(() => {
        if (!email) return; // Prevent API call if email is undefined
        
        setLoading(true);
        fetch(`https://tweetmaster.onrender.com/notifications/${email}`)
            .then(res => res.json())
            .then(data => {
                setNotifications(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching notifications:", err);
                setLoading(false);
            });
    }, [email]);

    // Function to format timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return "Just now";
        
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    };

    return (
        <div className='page notifications-container'>
            <div className="notifications-header">
                <div className="header-content">
                    <h2>Notifications</h2>
                    {notifications.length > 0 && 
                        <span className="notification-count">{notifications.length}</span>
                    }
                </div>
            </div>

            <div className="notifications-list">
                {loading ? (
                    <div className="notification-loading">
                        <div className="loading-spinner"></div>
                        <span>Loading notifications...</span>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="notification-empty">
                        <div className="empty-bell-icon"></div>
                        <p>No notifications yet</p>
                        <span>When you receive notifications, they'll appear here</span>
                    </div>
                ) : (
                    notifications.map((notif, index) => (
                        <div key={index} className={`notification-card ${notif.read ? "" : "unread"}`}>
                            <div className="bell-icon-container">
                                <div className="notification-bell-icon"></div>
                            </div>
                            <div className="notification-content">
                                <p>{notif.message}</p>
                                <div className="notification-meta">
                                    <span className="notification-time">
                                        {formatTime(notif.timestamp)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;