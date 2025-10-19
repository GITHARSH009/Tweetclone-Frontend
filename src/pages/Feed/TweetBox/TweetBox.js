import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Useloggedinuser from "../../../hooks/useloggedinuser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.init";
import useUserAuth from "../../../Context/UserAuthContext";

const TweetBox = () => {
    const [user] = useAuthState(auth);
    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [loggedInUser] = Useloggedinuser();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [blue, setBlue] = useState(0);
    // REMOVED: const [postLimit, setPostLimit] = useState(0);
    const [remainingPosts, setRemainingPosts] = useState(null); // ✅ NEW: Track from backend
    const { makeAuthenticatedRequest } = useUserAuth();
    const {token} = useUserAuth();

    const email = user?.email;
    const userProfilePic = loggedInUser[0]?.profileImage || 
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

    // Fetch user details
    useEffect(() => {
        if (email) {
            makeAuthenticatedRequest(`https://tweetmaster.onrender.com/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setName(data[0]?.Name || "");
                    setUsername(data[0]?.Username || email.split("@")[0]);
                    setBlue(data[0]?.bt || 0);
                    setRemainingPosts(data[0]?.count || 0); // ✅ Set initial count
                })
                .catch(err => console.error("Failed to fetch user:", err));
        }
    }, [email, makeAuthenticatedRequest]);

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
                console.error("Image upload failed:", error);
                alert("Failed to upload image. Please try again.");
                setLoading(false);
            });
    };

    // Handle Tweet Submission
    const handleTweet = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please log in to post");
            return;
        }

        // Check remaining posts on frontend (optional - backend will also check)
        if (remainingPosts !== null && remainingPosts <= 0) {
            alert("You have reached the maximum limit of monthly posts. Upgrade your subscription to continue posting.");
            return;
        }

        const userPost = {
            Profile: userProfilePic,
            Post: post,
            Photo: imageURL,
            Username: username,
            Name: name,
            Email: email,
            bt: blue,
        };

        // Reset input fields immediately for better UX
        setPost("");
        setImageURL("");

        try {
            // Single API call - backend handles everything
            const currentToken=token || localStorage.getItem('firebaseToken');
            const response = await fetch(
                "https://tweetmaster.onrender.com/post", 
                {
                    method: "POST",
                    headers: { 
                    "Content-type": "application/json",
                    "authorization": `Bearer ${currentToken}`
                     },
                    body: JSON.stringify(userPost),
                }
            );
            
            const data = await response.json();
            
            if (data.success) {
                // ✅ Update remaining posts from backend response
                setRemainingPosts(data.remainingPosts);
                
                // Optional: Show success message
                // alert("Post created successfully!");
            } else {
                // Backend rejected (limit reached or other error)
                alert(data.message || "Failed to create post");
                console.error("Post creation failed:", data.message);
            }
            
        } catch (error) {
            console.error("Post creation failed:", error);
            
            // Restore input if post failed
            setPost(userPost.Post);
            setImageURL(userPost.Photo);
            
            alert("Failed to create post. Please try again.");
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
                        {loading ? (
                            <p>Uploading Image...</p>
                        ) : (
                            <p>
                                {imageURL ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}
                            </p>
                        )}
                    </label>
                    <input 
                        type="file" 
                        id="image" 
                        className="imageInput" 
                        onChange={handleUploadImage} 
                        accept="image/*" 
                    />
                    
                    {/* Optional: Show remaining posts */}
                    {remainingPosts !== null && (
                        <span style={{ marginRight: '10px', color: remainingPosts < 5 ? 'red' : 'gray' }}>
                            {remainingPosts} posts left
                        </span>
                    )}
                    
                    <Button 
                        className="tweetBox_tweetButton" 
                        type="submit"
                        disabled={loading}
                    >
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TweetBox;