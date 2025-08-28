import React,{useState,useEffect} from 'react'
import Post from "../Feed/Post/Post";
import "./Feed.css";
import TweetBox from './TweetBox/TweetBox'

const Feed = () => {
  const [posts,setPosts]=useState([]);
  const [load,setLoad]=useState(false);
  
  useEffect(()=>{
    fetch(`https://tweetmaster.onrender.com/post`).then(res=>res.json()).then(data=>{
      setLoad(true);
      setPosts(data);
    })
  },[posts])

  const date=new Date();
  const h=date.getHours();
  var day="black";
  var opp="white"
  if(h>=19 || h<6){
    day="white";
    opp="rgb(2, 40, 57)";
  }
  else{
    day="black";
    opp="white";
  }

  return (
    <div className="feed">
      <div className="feed__header" style={{'backgroundColor':opp}}>
        <h2 style={{'color':day}}>Home</h2>
      </div>
      
      <div className="feed__content">
        <TweetBox />
        {
          load ? (
            posts.map(p => <Post key={p._id} p={p}/>)
          ) : (
            <div className="feed__loading">
              Loading posts...
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Feed