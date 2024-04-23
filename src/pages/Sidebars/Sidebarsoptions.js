import React from 'react'
import "./Sidebaroptions.css"

const Sidebarsoptions = ({ active, text, Icon }) => {
  return (
    <div className={`sidebarOptions ${active && "sidebarOptions--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  )
}

export default Sidebarsoptions