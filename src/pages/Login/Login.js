/* Login.js */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import useUserAuth from "../../Context/UserAuthContext";
import twitterimg from "../../assests/images/twitterimg.png";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import "./Login.css";
import { Switch } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = darkMode ? "#021828" : "#ffffff";
    }, [darkMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/");
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
                <h2 className="heading">Welcome to Chat Town</h2>
                <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn">Log In</button>
                </form>
                <hr />
                <GoogleButton className="g-btn" type="light" onClick={handleGoogleSignIn} />
                <p>Don't have an account?
                    <Link to="/signup" className="auth-link">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;