import { useState } from 'react';
import Button from '@mui/material/Button';
import "./Plan.css";
import "../Page.css"; // Import the provided page.css

const Plan = () => {
  // const [user] = useState({ email: 'user@example.com' }); // Mock user for demo
  const [selectedPlan, setSelectedPlan] = useState(null);
  // const email = user?.email;

  const checkouthandler = async (amount) => {
    setSelectedPlan(amount);
    console.log(`Processing payment for ₹${amount}`);
    // Your existing checkout logic here
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
                <h3 className="plan-name">Basic</h3>
                <div className="plan-price">
                  <span className="price">₹449</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <ul className='plan-features'>
                <li>120 tweets/month</li>
                <li>Ad-free experience</li>
                <li>Basic analytics</li>
              </ul>
              <Button 
                variant="contained" 
                size="small"
                className="plan-btn"
                disabled={selectedPlan === 449}
                onClick={(e) => {e.preventDefault(); checkouthandler(449);}}
                sx={{
                  backgroundColor: 'var(--twitter-primary)',
                  '&:hover': { backgroundColor: 'var(--twitter-primary-hover)' },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                {selectedPlan === 449 ? 'Processing...' : 'Subscribe'}
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
                  <span className="price">₹1,249</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <ul className='plan-features'>
                <li>500 tweets/month</li>
                <li>Blue tick verification</li>
                <li>Ad-free + Analytics</li>
                <li>Priority support</li>
              </ul>
              <Button 
                variant="contained" 
                size="small"
                className="plan-btn premium-btn"
                disabled={selectedPlan === 1249}
                onClick={(e) => {e.preventDefault(); checkouthandler(1249);}}
                sx={{
                  background: 'linear-gradient(45deg, var(--twitter-primary), #9c27b0)',
                  '&:hover': { background: 'linear-gradient(45deg, var(--twitter-primary-hover), #7b1fa2)' },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                {selectedPlan === 1249 ? 'Processing...' : 'Subscribe'}
              </Button>
            </label>
          </div>

          <div className='plan-card pro'>
            <input type="radio" name='plan' id='pro' className='plan-radio'/>
            <label htmlFor='pro' className='plan-label'>
              <div className="plan-header">
                <h3 className="plan-name">Pro</h3>
                <div className="plan-price">
                  <span className="price">₹1,669</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <ul className='plan-features'>
                <li>Unlimited tweets</li>
                <li>Blue tick + Branding</li>
                <li>Full analytics suite</li>
                <li>24/7 support</li>
              </ul>
              <Button 
                variant="contained" 
                size="small"
                className="plan-btn"
                disabled={selectedPlan === 1669}
                onClick={(e) => {e.preventDefault(); checkouthandler(1669);}}
                sx={{
                  backgroundColor: '#424242',
                  '&:hover': { backgroundColor: '#212121' },
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                {selectedPlan === 1669 ? 'Processing...' : 'Subscribe'}
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