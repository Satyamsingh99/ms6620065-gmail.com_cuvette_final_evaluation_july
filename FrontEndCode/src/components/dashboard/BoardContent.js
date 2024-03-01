import React from 'react'
import './dashboard.css';
import { useEffect, useState } from "react";
import CardDetails from "./cardDetails";
import { handleGetData } from './dashboard.action';
import { VscCollapseAll } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import {MdKeyboardArrowDown } from "react-icons/md";

const BoardContent = ({ user, props, getAllData, setGetAllData, isPopupVisible, setIsPopupVisible,selectedDates,setSelectedDates }) => {

    const [collapseAll, setCollapseAll] = useState("");

    const [selectedOption, setSelectedOption] = useState('This Week');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        handleGetData(setGetAllData,selectedOption,user)
    }, [selectedOption])

    // To get current date
    const [currentDate, setCurrentDate] = useState("");
    useEffect(() => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date().toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);
    }, []);

    
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    const filterDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <>
            <div className="board-content">
                <div className='head'>
                    <div>
                        <h1>Welcome {user.name}</h1>
                            <h3>Board</h3>
                            <div className="dropdown">
                                <div className="selected-option" onClick={filterDropdown}>
                                    {selectedOption} <span><MdKeyboardArrowDown /></span>
                                </div>
                                {isDropdownOpen ?
                                    <div className="options">
                                    <div onClick={() => handleOptionClick('Today')}>Today</div>
                                    <div onClick={() => handleOptionClick('This Week')}>This Week</div>
                                    <div onClick={() => handleOptionClick('This Month')}>This Month</div>
                                    </div>
                                :""}
                            </div>
                    </div>
                    <div className="date-box">
                        {currentDate}
                    </div>
                </div>
                <div className='boxes' >
                    <div className='box box-1'>
                        <div className='todoHeader'>
                            <h6>Backlog</h6>
                            <div className="add-button" onClick={() => setCollapseAll("backlog")}> <VscCollapseAll /></div>
                        </div>
                        <div className="box-container">
                            {getAllData.map(item => {
                                if (item.status === "backlog")
                                    return <>
                                        <CardDetails itemData={item} setGetAllData={setGetAllData} collapseAll={collapseAll} 
                                        setCollapseAll={setCollapseAll} selectedDates={selectedDates} user={user} />
                                    </>
                                else return;
                            })}
                        </div>
                    </div>
                    <div className='box box-2'>
                        <div>
                            <diV className={`todoHeader ${isPopupVisible ? 'blurred' : ''}`}>

                                <h6>To do</h6>
                                <div className="add-button" >
                                    <span onClick={() => {
                                        setIsPopupVisible(true)
                                    }}><GoPlus/></span>
                                    <span className="add-button" onClick={() => setCollapseAll("todo")}> <VscCollapseAll /></span></div>

                            </diV>
                        </div>
                        <div className="box-container">
                            {getAllData.map(item => {
                                if (item.status === "todo")
                                    return <>
                                        <CardDetails itemData={item} setGetAllData={setGetAllData} collapseAll={collapseAll} setCollapseAll={setCollapseAll} 
                                        selectedDates={selectedDates} user={user}/>
                                    </>
                                else return;
                            })}
                        </div>
                    </div>
                    <div className='box box-3'>
                        <diV className='todoHeader'>
                            <h6>In progress</h6>
                            <div className="add-button" onClick={() => setCollapseAll("inprogress")}> <VscCollapseAll /></div>
                        </diV>
                        <div className="box-container">
                            {getAllData.map(item => {
                                if (item.status === "inprogress")
                                    return <>
                                        <CardDetails itemData={item} setGetAllData={setGetAllData} collapseAll={collapseAll} setCollapseAll={setCollapseAll}
                                        selectedDates={selectedDates} user={user} />
                                    </>
                                else return;
                            })}
                        </div>
                    </div>
                    <div className='box box-4'>
                        <diV className='todoHeader'>
                            <h6>Done</h6>
                            <div className="add-button" onClick={() => setCollapseAll("done")}> <VscCollapseAll /></div>
                        </diV>
                        <div className="box-container">
                            {getAllData.map(item => {
                                if (item.status === "done")
                                    return <>
                                        <CardDetails itemData={item} setGetAllData={setGetAllData} collapseAll={collapseAll} setCollapseAll={setCollapseAll}
                                        selectedDates={selectedDates} user={user} />
                                    </>
                                else return;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BoardContent;  