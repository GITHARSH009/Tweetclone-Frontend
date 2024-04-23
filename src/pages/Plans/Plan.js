import React, { useState } from 'react'
import Button from '@mui/material/Button';
import "./Plan.css"
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import axios from 'axios';


const Plan = () => {
  const [user]=useAuthState(auth);
  const email=user?.email;

  const checkouthandler =async(amount)=>{
    const {data:{key}}=await axios.get("https://tweetmaster.onrender.com/api/getkey")
    const {data:{order}}=await axios.post("https://tweetmaster.onrender.com/checkout",{amount,email})
    console.log(window);
    const options ={
      key,
      amount,
      currency:"INR",
      name:"Twitter",
      description:"Twitter Clone",
      image:"https://ibb.co/3hXY2sR",
      order_id:order.id,
      callback_url:`https://tweetmaster.onrender.com/paymentverification`,
      prefill:{
        name:"Twitter",
        email:"harsh@gmail.com",
        contact:"1234567890"
      },
      notes:{
        "address":"razorapy official"
      },
      theme:{
        "color":"#3399cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }
  return (
    <div className='container'>
        <div className='col'>
          <h2 style={{'display':'flex','justifyContent':'start'}}>Special Plans For You</h2>
          <form className='singh'>
            <label htmlFor='sub' className='harsh'>
            <input type="radio" name='plan' id='sub' style={{'display':'none'}}/>
            <span>BASIC <small style={{'fontSize':'0.9rem','color':'rgba(147, 35, 35, 0.851)'}}>only at Rs.449/Month</small></span>
                <ul className='miracle'>
                    <li >ACCESS TO 120 TWEETS PER MONTH</li>
                    <li>Add Free</li>
                </ul>
                <Button variant="contained" onClick={(e)=>checkouthandler(449)} >Subscribe</Button>
            </label>

            <label htmlFor='sub1' className='harsh'>
            <input type="radio" name='plan' id='sub1' style={{'display':'none'}}/>
            <span>PREMIUM <small style={{'fontSize':'0.9rem','color':'rgba(147, 35, 35, 0.851)'}}>only at Rs.1249/Month</small></span>
            <ul className='miracle'>
                    <li >ACCESS TO 500 TWEETS PER MONTH</li>
                    <li >Blue tick on your profile</li>
                    <li>Add Free</li>
            </ul>
            <Button variant="contained" onClick={(e)=>checkouthandler(1249)}>Subscribe</Button>
            </label>

            <label htmlFor='sub2' className='harsh'>
            <input type="radio" name='plan' id='sub2'style={{'display':'none'}}/>
            <span>PRO <small style={{'fontSize':'0.9rem','color':'rgba(147, 35, 35, 0.851)'}}>only at Rs.1669/Month</small></span>
            <ul className='miracle'>
                    <li >ACCESS TO UNLIMITED TWEETS</li>
                    <li >Blue tick on your profile</li>
                    <li>Add Free</li>
            </ul>
            <Button variant="contained" onClick={(e)=>checkouthandler(1669)}>Subscribe</Button>
            </label>
          </form>
        </div>
    </div>
  )
}

export default Plan