// import React, { useState,useEffect } from 'react'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'

const CustomLink = ({children,to,...props}) => {
    let resolved=useResolvedPath(to);
    let match=useMatch({path:resolved.pathname,sensitive:true});
    const date=new Date();
    const h=date.getHours();
    var day="black";
    if(h>=19 || h<6){
      day="white";
    }
      else{
        day="black";
      }

  return (
    <Link style={{textDecoration:'none', color:match?'var(--twitter-color)':day}} to={to} {...props}>
     {children}
    </Link>
  )
}

export default CustomLink