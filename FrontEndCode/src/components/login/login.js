import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const Login = ({ setLoginUser }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const login = () => {
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                navigate("/")

            })
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className='login-container'>
            <div className='welcome-img'>
                <img src='/welcome-img.png' alt='img-wel'></img>
            </div>
            <div className='login-reg login-content'>
                <h1 className='title'>Login</h1>
                <MdOutlineEmail className='email-icon' />
                <input type='text' name="email" value={user.email} placeholder='Enter Your Email' onChange={handleChange}></input>
                <CiLock className='lock-icon' />
                <input type={showPassword ? 'text' : 'password'} name="password" value={user.password} placeholder='Enter Your Password' onChange={handleChange}></input>
                {showPassword ? <FaEyeSlash className='eye-icon' onClick={togglePasswordVisibility} /> : <FaEye className='eye-icon' onClick={togglePasswordVisibility} />}
                {/* <div className='button-login' onClick={login}>Login</div> */}
                <button className='button-1' onClick={login}>Login</button>
                <p>Have no account yet?</p>
                {/* <div className='button-reg' onClick={()=>navigate("/register")}>Register</div> */}
                <button className='button-2' onClick={() => navigate("/register")}>Register</button>
            </div>
        </div>
    );
}

export default Login;
