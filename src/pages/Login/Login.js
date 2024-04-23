import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";
// import { useUserAuth } from "../../Context/UserAuthContext";
import useUserAuth from "../../Context/UserAuthContext";
import twitterimg from "../../assests/images/twitterimg.png"
import TwitterIcon from '@mui/icons-material/Twitter';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const date=new Date();
  const h=date.getHours();
    var text="black";
    var back="white";
    if(h>=19 || h<6){
      text="white";
      back=" rgb(2, 40, 57)";
    }
      else{
        text="black";
        back="white";
      }

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
        <>
            <div className="login-container" style={{"backgroundColor":back,"color":text}}>
                <div className="image-container">
                    <img className=" image" src={twitterimg} alt="twitterImage" />
                </div>

                <div className="form-container">
                    <div className="form-box" >
                        <TwitterIcon style={{ color: "skyblue" }} />
                        <h2 className="heading">Happening now</h2>

                        {error && <p>{error.message}</p>}
                        <form onSubmit={handleSubmit}>

                            <input
                                type="email" className="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn" >Log In</button>
                            </div>
                        </form>
                        <hr />
                        <div>
                            <GoogleButton

                                className="g-btn"
                                type="light"

                                onClick={handleGoogleSignIn}
                            />


                        </div>
                    </div>
                    <div>
                        Don't have an account?
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Sign up
                        </Link>
                    </div>

                </div>


            </div>


        </>
    );
};

export default Login;