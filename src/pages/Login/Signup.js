import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import useUserAuth from "../../Context/UserAuthContext";
import twitterimg from "../../assests/images/twitterimg.png";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import "./Login.css";
import { Switch } from "@mui/material";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const { signUp, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = darkMode ? "#021828" : "#ffffff";
    }, [darkMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // First, create user with Firebase
            const userCredential = await signUp(email, password);
            
            // Get the ID token immediately after successful signup
            const idToken = await userCredential.user.getIdToken();
            
            // Then register user data in your backend using the token
            const user = { Username: username, Name: name, Email: email };
            
            const response = await fetch("https://tweetmaster.onrender.com/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify(user),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('User registered in backend:', data);
                navigate("/login");
            } else {
                throw new Error('Failed to register user in backend');
            }
            
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            const result = await googleSignIn();
            
            // Register Google user in backend
            const user = {
                Username: result.user.displayName?.replace(/\s+/g, '').toLowerCase() || result.user.email?.split('@')[0],
                Name: result.user.displayName || '',
                Email: result.user.email
            };
            
            const response = await fetch("https://tweetmaster.onrender.com/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Google user registered in backend:', data);
            } else {
                console.error('Failed to register Google user in backend');
            }
            
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={`auth-container ${darkMode ? "dark-mode" : "light-mode"}`}>
            <div className="left-container">
                <img className="image" src={twitterimg} alt="Twitter" />
            </div>
            <div className="right-container">
                <MapsUgcIcon className="twitter-icon" style={{ color: "skyblue" }} />
                <h2 className="heading">Join Chat Town Today</h2>
                <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="@username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button type="submit" className="btn">Sign Up</button>
                </form>
                <hr />
                <GoogleButton className="g-btn" type="light" onClick={handleGoogleSignIn} />
                <p>Already have an account?
                    <Link to="/login" className="auth-link">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;