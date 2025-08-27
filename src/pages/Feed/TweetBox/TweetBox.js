import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Useloggedinuser from "../../../hooks/useloggedinuser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.init";

const TweetBox = () => {
    const [user] = useAuthState(auth);
    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [loggedInUser] = Useloggedinuser();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [blue, setBlue] = useState(0);
    const [postLimit, setPostLimit] = useState(0);

    const email = user?.email;
    const userProfilePic = loggedInUser[0]?.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

    // Expiry date logic
    const today = new Date();
    const todayDate = today.getDate().toString();
    const currentMonth = today.getMonth();
    const nextMonth = (currentMonth + 1) % 12;
    const expDate = loggedInUser[0]?.Exp;

    // Update user post limit if expired
    useEffect(() => {
        if (expDate === todayDate + currentMonth) {
            const update = {
                count: 60,
                bt: 0,
                Exp: nextMonth,
            };
            fetch(`https://tweetmaster.onrender.com/exp/${email}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(update),
            }).then(res => res.json())
              .then(data => console.log(data));
        }
    }, [email, currentMonth, nextMonth, todayDate,expDate]);

    // Fetch user details
    useEffect(() => {
        if (email) {
            fetch(`https://tweetmaster.onrender.com/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setName(data[0]?.Name || "");
                    setUsername(data[0]?.Username || email.split("@")[0]);
                    setBlue(data[0]?.bt || 0);
                    setPostLimit(data[0]?.count || 0);
                });
        }
    }, [email]);

    // Handle Image Upload
    const handleUploadImage = (e) => {
        setLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.set("image", image);

        axios.post("https://api.imgbb.com/1/upload?key=5e6e901d825a19640b4eb55de239348d", formData)
            .then(res => {
                setImageURL(res.data.data.display_url);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    // Handle Tweet Submission
    const handleTweet = async (e) => {
        e.preventDefault();

        if (postLimit <= 0) {
            alert("You have reached the maximum limit of monthly posts. Upgrade your subscription to continue posting.");
            return;
        }

        if (user) {
            const userPost = {
                Profile: userProfilePic,
                Post: post,
                Photo: imageURL,
                Username: username,
                Name: name,
                Email: email,
                bt: blue,
            };

            // Reset input fields
            setPost("");
            setImageURL("");

            // Send post request
            try {
                const response = await fetch("https://tweetmaster.onrender.com/post", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(userPost),
                });
                const data = await response.json();
                console.log(data);

                // Decrease post count
                const updatedCount = postLimit - 1;
                setPostLimit(updatedCount);
                fetch(`https://tweetmaster.onrender.com/updone/${email}`, {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ count: updatedCount }),
                });

                // Send Kafka Notification
                await fetch("https://tweetmaster.onrender.com/notifications", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ notifyTo: "everyone", message: `${username} has made a post on ChatTown` }), // Send to a specific user
                }).catch(err => console.error("Notification Error:", err));
            } catch (error) {
                console.error("Post Creation Error:", error);
            }
        }
    };

    return (
        <div className="tweetBox">
            <form onSubmit={handleTweet}>
                <div className="tweetBox__input">
                    <Avatar src={userProfilePic} />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        style={{ outline: "none" }}
                        required
                    />
                </div>
                <div className="imageIcon_tweetButton">
                    <label htmlFor="image" className="imageIcon">
                        {loading ? <p>Uploading Image...</p> : <p>{imageURL ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}</p>}
                    </label>
                    <input type="file" id="image" className="imageInput" onChange={handleUploadImage} accept="image/*" />
                    <Button className="tweetBox_tweetButton" type="submit">Tweet</Button>
                </div>
            </form>
        </div>
    );
};

export default TweetBox;
