import React, { useState,useEffect } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";




function Post({ p }) {
  const { Name, Username,Photo, Post,bt, Profile } = p


  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={Profile} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{Name}{" "}
              <span className="post__headerSpecial">
                {bt?<VerifiedUserIcon className="post__badge" />:''} {Username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{Post}</p>
          </div>
        </div>
        <img src={Photo} alt="" height='400' width='500' />
        <div className="post__footer">
          <ChatBubbleOutlineIcon className="post__footer__icon" fontSize="small" />
          <RepeatIcon className="post__footer__icon" fontSize="small" />
          <FavoriteBorderIcon className="post__footer__icon" fontSize="small"/>
          <PublishIcon className="post__footer__icon" fontSize="small" />
        </div>
      </div>
    </div>
  );
}


export default Post;