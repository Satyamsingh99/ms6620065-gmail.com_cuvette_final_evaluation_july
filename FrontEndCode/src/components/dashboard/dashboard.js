import React from 'react'
import './dashboard.css';
import { useEffect, useState } from "react";
import BoardContent from './BoardContent';
import SettingsContent from './SettingContent';
import AnalyticsContent from './AnalyticsContent';
import { handleGetData } from './dashboard.action';
import { initialState } from './dashboard.action';
import PopUp from './popUp';
import { SlSettings } from "react-icons/sl";
import { IoLogOutOutline } from "react-icons/io5";
import { LuLayout } from "react-icons/lu";
import { SiNginxproxymanager } from "react-icons/si";
import { BiCoinStack } from "react-icons/bi";

const Dashboard = ({ user, setLoginUser }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false);
  const [getAllData, setGetAllData] = useState([])
  const [selectedDates,setSelectedDates]=useState('')
  

  const [selectedNavItem, setSelectedNavItem] = useState("board");


  const handleNavItemChange = (navItem) => {
    setSelectedNavItem(navItem);
  };

  return (
    <>
      <div className='dashBoard' >
        <div className="dashBoard-nav">
          <div className="sidebar">
            <div className='sidetabs'>
              <a><h3><SiNginxproxymanager /> Pro Manage</h3></a>
              <a className={selectedNavItem === "board" ? "active" : ""}
                onClick={() => handleNavItemChange("board")}
              ><LuLayout /> Board</a>
              <a className={selectedNavItem === "analytics" ? "active" : ""}
                onClick={() => handleNavItemChange("analytics")}
              ><BiCoinStack /> Analytics</a>
              <a className={selectedNavItem === "settings" ? "active" : ""}
                onClick={() => handleNavItemChange("settings")}
              ><SlSettings /> Setting</a>
            </div>
            <div className='button' onClick={() => {setIsLogoutPopupVisible(true)}} ><IoLogOutOutline /> Logout</div>
          </div>
        </div>

        <div className="main-container">
          {selectedNavItem === "board" && <BoardContent user={user}
            getAllData={getAllData} setGetAllData={setGetAllData} isPopupVisible={isPopupVisible} selectedDates={selectedDates}
             setIsPopupVisible={setIsPopupVisible} setSelectedDates={setSelectedDates}/>}
          {selectedNavItem === "analytics" && <AnalyticsContent user={user} />}
          {selectedNavItem === "settings" && <SettingsContent user={user} />}
        </div>

      </div>
      {isPopupVisible ?
        <>
          <div className='card-background'></div>
          <PopUp getAllData={getAllData} setGetAllData={setGetAllData} selectedDates={selectedDates} setSelectedDates={setSelectedDates}
           setIsPopupVisible={setIsPopupVisible} user={user} />
        </>
        : ""}
        
            {isLogoutPopupVisible ?
            <>
            <div className='card-background'></div>
          <div className='logout-popup'>
            <p>Are you sure you want to Logout?</p>
            <div className='logout-buttons'>
              <button className='logout' onClick={() => setLoginUser({})} >Yes, Logout</button>
              <button className='cancel' onClick={() => setIsLogoutPopupVisible(false)}>Cancel</button>
            </div>
          </div> </>
            : ""  }
    </>
  );
}


export default Dashboard;