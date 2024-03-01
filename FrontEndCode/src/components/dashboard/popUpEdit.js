import React from 'react'
import './dashboard.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { handleGetData, handleSaveToChangeStatus } from './dashboard.action';


const PopUpEdit = ({ itemData, setGetAllData, isPopupEditVisible, setIsPopupEditVisible, setIsActionPopupVisible, user, selectedDates, props }) => {

    const [title, setTitle] = useState(itemData.title);
    const [priority, setPriority] = useState(itemData.priority);
    const [checklists, setChecklists] = useState(itemData.checklists);
    const [dueDate, setDueDate] = useState(() => {
        if (itemData.dueDate == null)
            return ""
        let date = new Date(itemData.dueDate)
        return date.toISOString().slice(0, 10)
    });
    const [status, setStatus] = useState(itemData.status);
    const [_id, setItemId] = useState(itemData._id);

    useEffect(() => {
        if (!isPopupEditVisible)
            handleGetData(setGetAllData, selectedDates, user)
    }, [isPopupEditVisible])


    const handleAddChecklist = () => {
        setChecklists([...checklists, { text: '', checked: false }]);
    };

    const handleChecklistChange = (index, newText) => {
        const newChecklists = [...checklists];
        newChecklists[index].text = newText;
        setChecklists(newChecklists);
    };

    const handleChecklistToggle = (index) => {
        const newChecklists = [...checklists];
        newChecklists[index].checked = !newChecklists[index].checked;
        setChecklists(newChecklists);
    };

    const handleChecklistDelete = (index) => {
        const newChecklists = checklists.filter((_, i) => i !== index);
        setChecklists(newChecklists);
    };

    const handleSave = async () => {
        let itemData1 = {
            title: title,
            priority: priority,
            checklists: checklists,
            dueDate: dueDate,
            status: status, _id: _id,
            user: user
        }
        await handleSaveToChangeStatus(itemData1, setGetAllData, selectedDates, user);
        setIsPopupEditVisible(false)
        setIsActionPopupVisible(false)

    };

    return (<>
        <div className="popup">
            <div className='title-feild'>
                <label>Title</label>
                <input type="text" value={title} placeholder="Enter Task Title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="priority-buttons">
                <label>Select Priority</label>
                <button className={priority === 'High' ? 'selected' : ''} onClick={() => setPriority('High')}><span class="red">•</span> HIGH PRIORITY</button>
                <button className={priority === 'Moderate' ? 'selected' : ''} onClick={() => setPriority('Moderate')}><span class="blue">•</span> MODERATE PRIORITY</button>
                <button className={priority === 'Low' ? 'selected' : ''} onClick={() => setPriority('Low')}><span class="green">•</span> LOW PRIORITY</button>
            </div>
            <div className="checklists">
                <div className='checklists-feild'>
                    <label>Checklist ({checklists.filter(checklist => checklist.checked).length}/{checklists.length})</label>
                    {/* <button onClick={handleAddChecklist}>+ Add New</button> */}
                    {checklists.map((checklist, index) => (
                        <div key={index} className="checklist-item">
                            <div className='check-input'>
                                <input className='checkbox' type="checkbox" checked={checklist.checked} onChange={() => handleChecklistToggle(index)} />
                                <input className='checklist-text' type="text" value={checklist.text} onChange={(e) => handleChecklistChange(index, e.target.value)} />
                            </div>
                            <button onClick={() => handleChecklistDelete(index)}><MdDelete /></button>
                        </div>
                    ))}
                    <button onClick={handleAddChecklist}>+ Add New</button>
                </div>
            </div>
            <div className='act-btn'>
                {/* <button  className='btn'>Select Due Date</button> */}
                <input placeholder="Select Due Date" className="btn" type="date" id="date" onChange={(e) => setDueDate(e.target.value)} value={
                    dueDate
                } />
                <div className="action-buttons">
                    <button className='btn' onClick={() => { setIsPopupEditVisible(false); setIsActionPopupVisible(false) }}>Cancel</button>
                    <button className='btn' onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>

    </>);

}
export default PopUpEdit;