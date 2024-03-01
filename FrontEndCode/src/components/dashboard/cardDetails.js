import React from 'react'
import './cardDetails.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { handleCardDelete, handleSaveToChangeStatus } from './dashboard.action';
import PopUpEdit from './popUpEdit';


const CardDetails = ({ itemData, setGetAllData, collapseAll, setCollapseAll, props,selectedDates,user }) => {
    const [checklists, setChecklists] = useState([]);
    const [checklistExpand, setChecklistsExpand] = useState(false);
    const [isActionPopupVisible, setIsActionPopupVisible] = useState(false);    
    const [isPopupEditVisible, setIsPopupEditVisible] = useState(false);

    // useEffect(() => {
    //     let handler = ()=>{
    //         setIsActionPopupVisible(false);
    //     };

    //     document.addEventListener("mousedown", handler);
    // })

    useEffect(() => {
        setChecklists(itemData.checklists);
    }, [])
    useEffect(() => {
        if (collapseAll !== "" && itemData.status == collapseAll) {
            setChecklistsExpand(false)
            setCollapseAll("")
        }
    }, [collapseAll])

    const handleStatusButtonClick = (itemdata) => {
        handleSaveToChangeStatus(itemdata, setGetAllData,selectedDates,user);
    }

    const handleChecklistToggle = (index) => {
        const newChecklists = [...checklists];
        newChecklists[index].checked = !newChecklists[index].checked;
        setChecklists(newChecklists);
    };

    const handleChecklistChange = (index, newText) => {
        const newChecklists = [...checklists];
        newChecklists[index].text = newText;
        setChecklists(newChecklists);
    };

    let dueDate = itemData.dueDate !== null ? new Date(itemData.dueDate) : null;
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let bulletColor = "red";
    if (itemData.priority === 'High') {
        bulletColor = "red";
    }
    else if (itemData.priority === 'Low'|| itemData.priority ==="") {
        bulletColor = "green";
    }
    else {
        bulletColor = "blue";
    }


    const [currentDate, setCurrentDate] = useState("");

    const [dueButton, setDueButton] = useState("");
    useEffect(() => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date().toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);
        if (itemData.dueDate == null) {
            setDueButton("")
        }
        else if (itemData.status === "done") {
            setDueButton("green")
        }
        else if (new Date() >new Date(itemData.dueDate)) {
            setDueButton("red")
        }
        else if (new Date() <= new Date(itemData.dueDate)) {
            setDueButton("gray")
        }
    }, []);

    const [cardUrl, setCardUrl] = useState('');
    const handleShare = async () => {
        debugger
        try {
          const response = await axios.post('/api/cards', {  });
          setCardUrl(response.data.cardUrl);
          navigator.clipboard.writeText(response.data.cardUrl);
          alert('Link copied!');
        } catch (error) {
          console.error(error);
          alert('Error sharing card');
        }
      };


    return (<>
        <div className='card'>
            <div className='card-top'>
                <div className='card-priority'><span className={bulletColor}>• </span>{itemData.priority ==""?"Low":itemData.priority} Priority</div>
                <div className='card-actions-container'>
                <h3 onClick={() => { setIsActionPopupVisible(!isActionPopupVisible) }} >...</h3>

                {isActionPopupVisible ?
                    <div className='card-actions'>
                        <a onClick={()=>{setIsPopupEditVisible(true)}}>Edit</a>

                        <a onClick={handleShare} >Share</a>
                        {cardUrl && (
                            <div>
                            <p>Shared Link: {cardUrl}</p>
                            </div>
                        )}

                        <span onClick={()=>{handleCardDelete(itemData._id,setGetAllData)
                        setIsActionPopupVisible(false)
                        }} className='sction-delete'><a>Delete</a></span>
                    </div>
                    : ""}
                </div>
            </div>
            <div className='card-title'>{itemData.title}</div>
            <div className='card-checkList'>
                <div className='checklists-feild'>
                    <div className='card-checklist-header-container' key={"" + itemData._id}>
                        <div>Checklist ({checklists.filter(checklist => checklist.checked).length}/{checklists.length})</div>
                        {checklistExpand ?
                            <div className='arrow' onClick={() => setChecklistsExpand(false)}><span><MdKeyboardArrowUp /></span></div> :
                            <div className='arrow' onClick={() => setChecklistsExpand(true)}><span><MdKeyboardArrowDown /></span></div>}
                    </div>
                    {checklistExpand ? checklists.map((checklist, index) => (
                        <div key={index} className="checklist-item2">
                            <div className='check-input2'>
                                <input className='checkbox' type="checkbox" checked={checklist.checked} onChange={() => handleChecklistToggle(index)} />
                                <input className='checklist-text-1' type="text" value={checklist.text} onChange={(e) => handleChecklistChange(index, e.target.value)} />
                            </div>
                        </div>
                    )) : ""}
                </div>
            </div>
            <div className='card-buttons'>
                <div className={dueButton}>
                    {itemData.dueDate !== null ? month[dueDate.getMonth()] + " " + dueDate.getDate() : ""}
                </div>
                <div>

                    {itemData.status !== "todo" ? <button className='btn1' onClick={() => {
                        itemData.status = "todo"
                        handleStatusButtonClick(itemData)
                    }}>To-Do</button> : ""}
                    {itemData.status !== "backlog" ? <button className='btn1' onClick={() => {
                        itemData.status = "backlog"
                        handleStatusButtonClick(itemData)
                    }}>Backlog</button> : ""}
                    {itemData.status !== "inprogress" ? <button className='btn1' onClick={() => {
                        itemData.status = "inprogress"
                        handleStatusButtonClick(itemData)
                    }}>Progress</button> : ""}
                    {itemData.status !== "done" ? <button className='btn1' onClick={() => {
                        itemData.status = "done"
                        handleStatusButtonClick(itemData)
                    }} >Done</button> : ""}

                </div>
            </div>

        </div>{isPopupEditVisible?
        <PopUpEdit setGetAllData={setGetAllData} itemData={itemData} isPopupEditVisible={isPopupEditVisible}setIsPopupEditVisible={setIsPopupEditVisible} selectedDates={selectedDates}
        user={user}
        setIsActionPopupVisible={setIsActionPopupVisible}/>:""}
    </>);
}
export default CardDetails;
