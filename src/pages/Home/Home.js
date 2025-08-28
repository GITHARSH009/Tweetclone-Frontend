// import React from 'react';
import "./home.css";
import Sidebars from '../Sidebars/Sidebars';
// import Widgets from '../Widgets/Widgets';
import { Outlet } from 'react-router-dom';
import { auth } from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useAuthState(auth);
  const navigate = useNavigate();
  // const date = new Date();
  // const h = date.getHours();

  // var text = "black";
  // var back = "white";
  // if (h >= 19 || h < 6) {
  //   text = "white";
  //   back = "rgb(2, 40, 57)";
  // }

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <div className="app" style={{ backgroundColor: 'aqua', color: 'white' }}>
        <Sidebars handleLogout={handleLogout} user={user} />
        <Outlet />
        {/* <Widgets /> */}
      </div>
    </>
  );
};

export default Home;
