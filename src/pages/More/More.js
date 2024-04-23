import React from 'react'
import "./More.css"
import {useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const More = () => {
   const navigate=useNavigate();
   const usehandle=()=>{
    navigate('/Home/live');
   }

  return (
    <div className='penguin'>
            <h2 style={{'fontWeight':'bold','color':'aquamarine','fontSize':'2rem'}}>Welcome to More section</h2>
            <h3 style={{'fontSize':'1.8rem'}}>Click here to Start Live_Streming</h3>
            <Button variant="outlined" onClick={usehandle} style={{'color':'red'}}>Start LiveStreaming</Button>
        </div>
  )
}

export default More