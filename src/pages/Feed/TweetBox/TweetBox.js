import React, { useState,useEffect } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import axios from 'axios'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Useloggedinuser from "../../../hooks/useloggedinuser";
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from "../../../firebase.init";

const TweetBox = () => {
    const [user]=useAuthState(auth);
    const [post, setPost] = useState('')
    const [imageURL, setImageURL] = useState('');
    const [loading,setisloading]=useState(false);
    const [loggedInUser]=Useloggedinuser();
    var [name,setName]=useState('');
    var [username,setUsername]=useState();
    var [blue,Setblue]=useState(0);

const date=new Date();
var fir=date.getDate();
fir=fir.toString();
var home=fir;
var sec=date.getMonth();
var another=date.getMonth()+1;
sec=sec%12;
fir=fir+sec;
home=home+another;


    const expdate=loggedInUser[0]?.Exp;

    useEffect(()=>{
        if(expdate===fir){
            const update={
                count:60,
                bt:0,
                Exp:another,
            }
            fetch(`https://tweetmaster.onrender.com/exp/${email}`,{
                method: "PATCH",
                     headers: {
                       'content-type': 'application/json'
                     },
                body: JSON.stringify(update),
            }).then((res)=>{
                res.json()
            }).then(data=>{
                console.log(data);
            })
        }
      },[user])

    const userprofilepic=loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
    const email=user?.email;
    var cnt=loggedInUser[0]?.count;


    const handleuploadImage = e => {
        setisloading(true);

        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image)

        axios.post("https://api.imgbb.com/1/upload?key=5e6e901d825a19640b4eb55de239348d", formData)
            .then(res => {
                setImageURL(res.data.data.display_url);
                setisloading(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleTweet = (e) => {
        e.preventDefault();
        if(user.providerData[0].providerId==='password'){
            console.log("Reached here");
            fetch(`https://tweetmaster.onrender.com/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setName(data[0]?.Name)
                setUsername(data[0]?.Username);
                Setblue(data[0]?.bt);
            })
             blue=loggedInUser[0].bt;
             username=username?username:email?.split('@')[0];
             username=username?username:loggedInUser[0].Username;
             name=loggedInUser[0].Name;
        }

        if(cnt<=0){
            alert('You have reached the maximum limit of monthly post, take subscription to increase your post limit')
        }
            if(user && cnt>0){
                const userpost={
                    Profile:userprofilepic,
                    Post:post,
                    Photo:imageURL,
                    Username:username,
                    Name:name,
                    Email:email,
                    bt:blue,
                }
                setPost('');
                setImageURL('');
                console.log(userpost);
                fetch(`https://tweetmaster.onrender.com/post`,{
                    method:"POST",
                    headers:{
                        'content-type':"application/json"
                    },
                    body:JSON.stringify(userpost)
                }).then(res=>res.json()).then(data=>{
                    console.log(data);
                });
                    cnt=cnt-1;
                    const updates={
                        count:cnt
                    }
                    console.log(cnt);
                    fetch(`https://tweetmaster.onrender.com/updone/${email}`,{
                        method: "PATCH",
                        headers: {
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(updates),
                    }).then((res)=>{
                          res.json()
                    }).then(data=>{
                        console.log(data);
                    })
            }
    }

  return (
    <div className="tweetBox">
        <form onSubmit={handleTweet}>
            <div className="tweetBox__input">
                <Avatar src={userprofilepic} />
                <input
                    type="text"
                    placeholder="What's happening?"
                    onChange={(e) => setPost(e.target.value)}
                     style={{outline:'none'}}
                     value={post}
                    required
                />

            </div>
            <div className="imageIcon_tweetButton">
             <label htmlFor="image" className="imageIcon">
             {
               loading?<p>Uploading Image</p>:<p>{imageURL?'image uploaded':<AddPhotoAlternateOutlinedIcon/>}</p>
             }
             </label>
             <input type="file" id="image" className="imageInput" onChange={handleuploadImage}  accept="image/*"/>
             <Button className="tweetBox_tweetButton" type="submit">
                Tweet
             </Button>
            </div>
            </form>

    </div>
  )
}

export default TweetBox