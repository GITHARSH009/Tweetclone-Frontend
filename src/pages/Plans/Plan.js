import { useState } from 'react';
import Button from '@mui/material/Button';
import "./Plan.css";
import "../Page.css"; // Import the provided page.css
import axios from 'axios';
import useUserAuth from "../../Context/UserAuthContext";

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useUserAuth();
  const email = user?.email || "";

  const checkouthandler = async (amount) => {
    setSelectedPlan(amount);
    console.log(`Processing payment for ₹${amount}`);
    const {data:{key}}=await axios.get("https://tweetmaster.onrender.com/api/getkey")
    const {data:{order}}=await axios.post("https://tweetmaster.onrender.com/checkout",{amount,email})
    console.log(window);
    console.log(order);
    const options ={
      key,
      amount,
      currency:"INR",
      name:"CHAT TOWN",
      description:"CHAT TOWN",
      image:"https://ibb.co/3hXY2sR",
      order_id:order?order.id:'H3fj_2987h235991',
      callback_url:`https://tweetmaster.onrender.com/paymentverification`,
      prefill:{
        name:"CHAT TOWN",
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
    setTimeout(() => setSelectedPlan(null), 2000); // Reset after 2 seconds for demo
  };

  return (
    <div className='page'>
      <div className='page-content'>
        <h2 className='pageTitle'>Choose Your Plan</h2>
        
        <div className='plans-container'>
          <div className='plan-card basic'>
            <input type="radio" name='plan' id='basic' className='plan-radio'/>
            <label htmlFor='basic' className='plan-label'>
              <div className="plan-header">
                <h3 className="plan-name">Free Plan</h3>
                <div className="plan-price">
                  <span className="price">₹0</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <ul className='plan-features'>
                <li>20 tweets/month</li>
                <li>Ad-free experience</li>
                <li>Chat with other users</li>
                <li>Basic support</li>
              </ul>
              <Button 
                variant="contained" 
                size="small"
                className="plan-btn"
                sx={{
                  backgroundColor: 'var(--twitter-primary)',
                  '&:hover': { backgroundColor: 'var(--twitter-primary-hover)' },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                Free Plan
              </Button>
            </label>
          </div>

          <div className='plan-card premium popular'>
            <div className="popular-badge">Popular</div>
            <input type="radio" name='plan' id='premium' className='plan-radio'/>
            <label htmlFor='premium' className='plan-label'>
              <div className="plan-header">
                <h3 className="plan-name">Premium</h3>
                <div className="plan-price">
                  <span className="price">₹249</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <ul className='plan-features'>
                <li>30 tweets/month</li>
                <li>Blue tick forever</li>
                <li>Ad-free</li>
                <li>Priority support</li>
              </ul>
              <Button 
                variant="contained" 
                size="small"
                className="plan-btn premium-btn"
                disabled={selectedPlan === 249}
                onClick={(e) => {e.preventDefault(); checkouthandler(249);}}
                sx={{
                  background: 'linear-gradient(45deg, var(--twitter-primary), #9c27b0)',
                  '&:hover': { background: 'linear-gradient(45deg, var(--twitter-primary-hover), #7b1fa2)' },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                {selectedPlan === 249 ? 'Processing...' : 'Subscribe'}
              </Button>
            </label>
          </div>

          <div className='plan-card pro'>
            <input type="radio" name='plan' id='pro' className='plan-radio'/>
            <label htmlFor='pro' className='plan-label'>
              <div className="plan-header">
                <h3 className="plan-name">Pro</h3>
                <div className="plan-price">
                  <span className="price">₹449</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <ul className='plan-features'>
                <li>45 tweets/month</li>
                <li>Blue tick forever</li>
                <li>Create your to do list</li>
                <li>24/7 support</li>
              </ul>
              <Button 
                variant="contained" 
                size="small"
                className="plan-btn"
                disabled={selectedPlan === 449}
                onClick={(e) => {e.preventDefault(); checkouthandler(449);}}
                sx={{
                  backgroundColor: '#424242',
                  '&:hover': { backgroundColor: '#212121' },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                {selectedPlan === 449 ? 'Processing...' : 'Subscribe'}
              </Button>
            </label>
          </div>
        </div>

        <div className="trust-indicators">
          <span>✓ Secure Payment</span>
          <span>✓ Cancel Anytime</span>
          <span>✓ 24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default Plan;