import React,{useEffect, useState} from 'react'
import "./home.css"
import Feed from '../Feed/Feed'
import Sidebars from '../Sidebars/Sidebars'
import Widgets from '../Widgets/Widgets'
import { Outlet } from 'react-router-dom'
import auth from '../../firebase.init'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const Home2 = () => {
 const user=useAuthState(auth);
 const navigate=useNavigate();
 const [val,setVal]=useState('Nor');
 const API=`449a77d01160781df8970b0644175a74`;
 const date=new Date();
  const h=date.getHours();

  var text="black";
  var back="white";
  if(h>=19 || h<6){
    text="white";
    back=" rgb(2, 40, 57)";
  }
    else{
      text="black";
      back="white";
    }


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success,failure);
  },[user])



 function success(position){
  gettemperature(position.coords.latitude,position.coords.longitude);
}

function failure(){
   console.log('Failed to get location');
}

const gettemperature=(lat,lon)=>{
  const url=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`
  fetch(url)
  .then((res)=>{
      return res.json()
  })
  .then(data=>displaytemperature(data))
}
const displaytemperature=temperature =>{
  console.log(temperature.list[0]);
  const curtemp=(temperature.list[0].main.temp);
  const celsius=Math.round((parseInt(curtemp)-273.14 +1));
  console.log(celsius);
  let wthr=temperature.list[0].weather[0].main;
  console.log(wthr);
  if(wthr==="Rain"){
    setVal('rain');
  }
  else if(wthr==="Thunderstorm"){
    setVal('rain');
  }
  else if(wthr==="Snow"){
    setVal('snow');
  }
  else if(celsius>39 && h<17){
    setVal('sun');
  }
  console.log(val);
}
  

const handleLogout=()=>{
 signOut(auth);
 navigate('/login')
}

 return (
  <>
   <div className={val==='Nor'?'app':'non'} style={{'backgroundColor':back,'color':text}}>
     <Sidebars handleLogout={handleLogout} user={user}/>
     <Feed/>
     <Outlet/>
     <Widgets/>
   </div>

   <div className={val==='snow'?'snow':'non'}>
     <Sidebars handleLogout={handleLogout} user={user}/>
     <Feed/>
     <Outlet/>
     <Widgets/>
   </div>
  
   <div className={val==='sun'?'app':'non'} style={{'backgroundColor':back,'color':text}}>
     <div className="cont"></div>
     <Sidebars handleLogout={handleLogout} user={user}/>
     <Feed/>
     <Outlet/>
     <Widgets/>
   </div>

   <div className={val==='rain'?'rain':'non'}>
     <Sidebars handleLogout={handleLogout} user={user}/>
     <Feed/>
     <Outlet/>
     <Widgets/>
   </div>
  
  </>
 )
}

export default Home2

// style={{'backgroundImage':`url(${val})`}}







// style={{'backgroundImage':`url(${val})`}}

{/* <div className='app' style={{'backgroundColor':back,'color':text}}>
      <Sidebars handleLogout={handleLogout} user={user}/>
      <Feed/>
      <Outlet/>
      <Widgets/>
    </div> */}