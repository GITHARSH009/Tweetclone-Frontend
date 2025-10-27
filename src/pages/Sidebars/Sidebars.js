import React from 'react'
import Sidebarsoptions from './Sidebarsoptions'
import './Sidebars.css'
// import TwitterIcon from "@mui/icons-material/Twitter";
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PaidIcon from '@mui/icons-material/Paid';
import { useState } from 'react';
import CustomLink from './CustomLink';
import { Link } from 'react-router-dom';
import Useloggedinuser from '../../hooks/useloggedinuser';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"

const Sidebars = ({ handleLogout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser]=Useloggedinuser();

  const userprofilepic=loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    //console.log(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const date=new Date();
    const h=date.getHours();
    var day="black";
    if(h>=19 || h<6){
      day="white";
    }
      else{
        day="black";
    }

  const result = user[0]?.email?.split('@')[0];
  const blue=loggedInUser[0]?.bt;

  return (
    <div className="sidebar">
      <ChatIcon className="sidebar__twitterIcon" />
      <Link style={{'color':day,'textDecoration':'None'}} to='/home'>
      <Sidebarsoptions active Icon={HomeIcon} text="Home" />
      </Link>
      <CustomLink to='/Home/notifications'>
      <Sidebarsoptions Icon={NotificationsNoneIcon} text="Notifications" />
      </CustomLink>
      <CustomLink to='/Home/messages'>
      <Sidebarsoptions Icon={MailOutlineIcon} text="Messages" />
      </CustomLink>
      <CustomLink to='/Home/movies'>
      <Sidebarsoptions Icon={BookmarkBorderIcon} text="Movies" />
      </CustomLink>
      <CustomLink to='/Home/profile'>
      <Sidebarsoptions Icon={PermIdentityIcon} text="Profile" />
      </CustomLink>
      <CustomLink to='/Home/todolist'>
      <Sidebarsoptions Icon={PermIdentityIcon} text="List" />
      </CustomLink>
      <CustomLink to='/Home/news'>
      <Sidebarsoptions Icon={NewspaperIcon} text="News" />
      </CustomLink>
      <CustomLink to='/Home/plan'>
      <Sidebarsoptions Icon={PaidIcon} text="Subscription" />
      </CustomLink>
      <div className="Profile__info">
        <Avatar src={userprofilepic} />
        <div className="user__info">
          <h4>{
            loggedInUser[0]?.name?loggedInUser[0]?.name: user && user[0]?.displayName
          }
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton size="small"
          sx={{ ml: 2 }} aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}><MoreHorizIcon /></IconButton>
        <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose}>
          <MenuItem className="Profile__info1">
          <Avatar src={userprofilepic}/>
          {/* {loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} */}
            <div className="user__info subUser__info">
              <div>
              <h4>{
            loggedInUser[0]?.name?loggedInUser[0]?.name: user && user[0]?.displayName
          }
          </h4>
          <h5>@{result}{blue?<VerifiedUserIcon className="post__badge" />:''}</h5>
              </div>
              <ListItemIcon className="done__icon" color="blue"><DoneIcon /></ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
    </div>
    </div>
  )
}

export default Sidebars