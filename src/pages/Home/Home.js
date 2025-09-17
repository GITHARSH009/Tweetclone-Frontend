import React, { useState, useEffect } from 'react';
import "./home.css";
import Sidebars from '../Sidebars/Sidebars';
import { Outlet } from 'react-router-dom';
import { auth } from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useAuthState(auth);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close sidebar when switching to desktop
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSidebarItemClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar when item is clicked on mobile
    }
  };

  return (
    <>
      <div className="app">
        {/* Hamburger Menu Button - Only visible on mobile */}
        {isMobile && (
          <button 
            className="hamburger-btn" 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isSidebarOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        )}

        {/* Overlay for mobile when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}

        {/* Sidebar */}
        <div className={`sidebar-container ${isMobile ? (isSidebarOpen ? 'mobile-open' : 'mobile-closed') : ''}`}>
          <Sidebars 
            handleLogout={handleLogout} 
            user={user} 
            closeSidebar={closeSidebar}
            onItemClick={handleSidebarItemClick}
            isMobile={isMobile}
          />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;