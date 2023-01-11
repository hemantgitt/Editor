import React from 'react';
import "./LeftNav.css"
import { memo } from 'react';

const LeftNav = () => {
  return (
    <div className="Left-Sidebar-Container">
        <ul className="nav flex-column ">
          <li className="nav-item1" id="img">
            <img
              src="/Images/logo.png"
              width="40px"
              height="40px"
              alt="No img"
            />
          </li>
          <li className="nav-item-Translate" style={{width: "49px", height: "54px"}}>
         <div > <i id="translate-icon" className="fa-solid fa-pen-to-square"></i></div>
          </li>

            <li className="nav-item-Translate2" style={{width: "51px", height: "50px"}} >
            <i id="translate-icon" className="fa-solid fa-briefcase"></i>
          </li>
        </ul>
      </div>
  )
}

export default memo(LeftNav)