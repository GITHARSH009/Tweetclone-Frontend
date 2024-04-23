import React from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";

function Widgets() {
  const date=new Date();
  const h=date.getHours();
  var day="black";
  if(h>=19 || h<6){
    day="white";
  }
    else{
      day="black";
}

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text"/>
      </div>

      <div className="widgets__widgetContainer">
        <h2 style={{'color':day}}>What's happening</h2>

        <TwitterTweetEmbed tweetId={"1557187138352861186"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 400 }}
        />


      </div>
    </div>
  );
}

export default Widgets;