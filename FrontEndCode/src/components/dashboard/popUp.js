import React from 'react'
import './dashboard.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { handleGetData } from './dashboard.action';


const PopUp = ({ getAllData,setGetAllData, setIsPopupVisible,user,selectedDates,setSelectedDates,props }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [checklists, setChecklists] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setStatus("todo")
        handleGetData(setGetAllData,selectedDates,user)
    }, [])
    

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
        // Send data to backend or handle save logic
        try {
            await axios.post("http://localhost:9002/save-todo", { title, priority, checklists, dueDate, status ,user})
            alert('Task saved successfully');
        } catch (error) {
            console.error('Error updating password:', error.response.data.error);
            alert('Error updating password:' + error.response.data.error);
            // setErrorMessage("error.response.data.error");
        }
        // Reset state after saving
        setTitle('');
        setPriority('');
        setChecklists([]);
        setDueDate('');
        setIsPopupVisible(false);
        handleGetData(setGetAllData,selectedDates,user)

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
                            <input placeholder="Select Due Date" className="btn" type="date" id="date" onChange={(e) => setDueDate(e.target.value)} />
                            <div className="action-buttons">
                                <button className='btn cancel' onClick={() => setIsPopupVisible(false)}>Cancel</button>
                                <button className='btn logout' onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                
    </>);

}
export default PopUp;