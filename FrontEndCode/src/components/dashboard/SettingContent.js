import React from 'react'
import './dashboard.css';
import './SettingContent.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa";


function SettingsContent(user) {
    const [name, setName] = useState(user.user.name);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await axios.post("http://localhost:9002/update-password", { user, oldPassword, newPassword ,name})
            alert('Password updated successfully');
            // Clear form fields
            setName('');
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Error updating password:', error.response.data.error);
            setErrorMessage("error.response.data.error");
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    return (
        <div className="settings-content">
            <header>
                <h3>Settings</h3>
            </header>
            <section className='settings'>
                <FaRegUser className='setting-user-icon'/>
                <input type='text' name="name" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} required></input>
                <CiLock className='setting-loc1-icon'/>
                <input type={showPassword ? 'text' : 'password'} name="oldPassword" value={oldPassword} placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)} required></input>
                {showPassword ? <FaEyeSlash className='setting-eye-icon' onClick={togglePasswordVisibility} /> : <FaEye className='setting-eye-icon' onClick={togglePasswordVisibility} />}
                <CiLock className='setting-loc2-icon'/>
                <input type={showPassword1 ? 'text' : 'password'} name="newPassword" value={newPassword} placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} required></input>
                {showPassword1 ? <FaEyeSlash className='setting-eye-repas' onClick={togglePasswordVisibility1} /> : <FaEye className='setting-eye-repas' onClick={togglePasswordVisibility1} />}
                <button className='update-password-button updateButton' type="submit" onClick={handleSubmit}>Update</button>
                {/* <button className='updateButton' type="submit">Save</button> */}
                {errorMessage && <div className="error">{errorMessage}</div>}
            </section>
        </div>
    );
}
export default SettingsContent;