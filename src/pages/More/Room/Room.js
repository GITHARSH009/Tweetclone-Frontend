import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {useParams} from 'react-router-dom'
import { appid } from '../Live';
import { secret } from '../Live';

const Room = () => {

    const {roomid}=useParams();

    const Stream=(ele)=>{
        const appID =appid;
        const serverSecret =secret;
        const roomID=roomid;

        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(), "Harsh Singh");

        const zego= ZegoUIKitPrebuilt.create(kitToken);
        zego.joinRoom({
            container: ele,
            sharedLinks:[
                {
                    name:"Copy Url Link",
                    url:`https://twitter-rtr.netlify.app/room/${roomid}`
                }
            ],
            scenario: {
              mode: ZegoUIKitPrebuilt.LiveStreaming,
              showScreenSharingButton:true
            }
          })
    }

  return (
    <div style={{'justifyContent':'center','alignContent':'center','justifyItems':'center','display':'flex','height':'100vh','width':'100%'}}>
        <div ref={Stream}/>
    </div>
  )
}

export default Room