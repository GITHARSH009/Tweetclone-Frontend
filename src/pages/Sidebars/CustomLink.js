// import React, { useState,useEffect } from 'react'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'

const CustomLink = ({children,to,...props}) => {
    let resolved=useResolvedPath(to);
    let match=useMatch({path:resolved.pathname,sensitive:true});

  return (
    <Link style={{textDecoration:'none', color:match?'var(--twitter-color)':"black"}} to={to} {...props}>
     {children}
    </Link>
  )
}

export default CustomLink