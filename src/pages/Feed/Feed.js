import React, { useState, useEffect } from 'react'
import Post from "../Feed/Post/Post";
import "./Feed.css";
import TweetBox from './TweetBox/TweetBox'
import useUserAuth from "../../Context/UserAuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUserAuth(); // Assuming you have access to user/token

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoad(false);
        setError(null);
        
        const response = await fetch(`https://tweetmaster.onrender.com/post`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
        setLoad(true);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoad(true);
      }
    };
    
    // Only fetch if we have a user/token
    if (user) {
      fetchPosts();
    }
  }, [user]); // Dependency on user instead of makeAuthenticatedRequest

  // Dynamic styling based on time (consider moving to CSS variables)
  const date = new Date();
  const hour = date.getHours();
  const isNightTime = hour >= 19 || hour < 6;
  
  const headerStyles = {
    backgroundColor: isNightTime ? 'white' : 'rgb(2, 40, 57)',
    color: isNightTime ? 'black' : 'white'
  };

  return (
    <div className="feed">
      <div className="feed__header" style={headerStyles}>
        <h2>Home</h2>
      </div>
      
      <div className="feed__content">
        <TweetBox />
        {
          !load ? (
            <div className="feed__loading">
              <div className="loading-spinner"></div>
              Loading posts...
            </div>
          ) : error ? (
            <div className="feed__error">
              <p>Failed to load posts: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="feed__empty">
              <p>No posts available</p>
            </div>
          ) : (
            posts.map(p => <Post key={p._id} p={p}/>)
          )
        }
      </div>
    </div>
  )
}

export default Feed