import React, { useState, useEffect } from 'react';
import './AdminNavbar.css';

import Order from './Order';

function AdminNavbar(props) {
    const [selectedNavBar, setSelectedNavBar] = useState('Order');
    const [open, setOpen] = useState(true);
    const username = sessionStorage.getItem('staffUsername');
    const Menus = [
      { title: "Order", src: "order" ,w:2,h:2 },
      { title: "Add Movie", src: "add" },
      { title: "Remove Movie", src: "remove",},
      { title: "Setting", src: "setting" },
    ];

    const allMenu = props.allMenu;
    const [currentMenu,setCurrentMenu] = useState(allMenu.Order) ;
    
    return(
  <div className="flex">

  <div className='sidebar-2'>

  <div className={` ${open ? "w-72" : "w-20 "} bg-white1 border-r-2  h-screen p-5 pt-8 fixed duration-300`}>
    
    <div className="ok"> 

      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-300 ${!open && "w-0 h-0"}`}
          style={{ width: open ? "100px" : "0", height: open ? "50px" : "0" }}/>
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 
          ${!open && "scale-0"}`}>
        </h1>
      </div>
        <img
        src="./src/assets/sidebar.png" 
        className={`absolute cursor-pointer top-9 w-7 rounded-full  
        ${!open ? "rotate-180" : ""} ${open ? "right-3" : "translate-x-1"}`} 
        onClick={() => setOpen(!open)}/>
      </div>

    <ul className="pt-6">
      {Menus.map((Menu, index) => (
        <li
          key={index}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-black1 text-black-400 font-semibold text-sm items-center gap-x-4  
          ${Menu.gap ? "mt-9" : "mt-2"} ${Menu.title === "Order" ? "mt-8" : "mt-2"} ${
            selectedNavBar === Menu.title?  "bg-black1" : "bg-light-white"} `}
          onClick={() => {
            setSelectedNavBar(Menu.title);
            setCurrentMenu(allMenu[Menu.title]) ;}}>

          <img src={`./src/assets/${Menu.src}.png`} className={'w-6 h-6'} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            {Menu.title}
          </span>
        </li>
      ))}
      
      <li className='jj absolute bottom-0'>
        <div className={`flex  rounded-md p-2   text-gray-300 text-sm items-center gap-x-4 mt-80 `}>
          <img src={`./src/assets/account.png`} className={'mt-15 w-6 h-6'} />
          <span className={`${!open && "hidden"} flex origin-left duration-200`}>
            <h1 className='username'>{username}</h1>
            <h1 className='dot'>...</h1>
          </span> 
         
          </div>
         
        </li>
    </ul>
  </div>
  </div>

<div className='sidebar-3'>
  <div
    className={` ${
      open ? "w-72" : "w-20 "
    } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
  ></div></div>

{currentMenu}
  
</div>);
    
}

export default AdminNavbar ;