import React,{useState} from 'react'
import {useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import "../More.css"

const Homelive = () => {
   const [room,setRoom]=useState("");

    const handle=()=>{
      window.open(`https://twitter-rtr.netlify.app/room/${room}`);
      setRoom("");
    }

  return (
    <div className='penguin'>
        <input type='text' className='oscar' value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='Enter Your Room No.'/>
        <Button variant="text" onClick={handle}>JOIN ROOM</Button>
    </div>
  )
}

export default Homelive