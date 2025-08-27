/* Signup.js */
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
            await signUp(email, password);
            const user = { Username: username, Name: name, Email: email };
            fetch("https://tweetmaster.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }).then((res) => res.json()).then((data) => console.log(data));
            navigate("/login");
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
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
                    <input type="text" placeholder="@username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
