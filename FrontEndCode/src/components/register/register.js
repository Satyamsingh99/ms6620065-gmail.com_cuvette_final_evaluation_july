import React  ,{ useState}from 'react';
import'./register.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const navigate=useNavigate()
    const[ user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    })
    const handleChange=e=>{
        const {name,value}=e.target
        setUser({
            ...user,
            [name]:value
        })
    }
    const register=()=>{
        debugger
        const{name,email,password,reEnterPassword}=user
        if(name && email && password && (password===reEnterPassword)){
            axios.post("http://localhost:9002/register",user)
            .then( res => {
                 alert(res.data.message)
                 navigate("/login")

            })
        }
        else{
            alert("invalid input")
        }
        
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

  return (
    <div className='login-container'>
        <div className='welcome-img'>
            <img src='/welcome-img.png' alt='img-wel'></img>
        </div>
        <div className='login-reg reg-content'>
            <h1 className='title'>Register</h1>
            
            <FaRegUser className='reg-user-icon'/>
            <input type='text' name="name" value={user.name} placeholder='Name' onChange={handleChange}></input>
            
            
            <MdOutlineEmail className='reg-email-icon'/>
            <input type='text'  name="email" value={user.email} placeholder='Email'  onChange={handleChange}></input>
            
            
            <CiLock className='reg-lock-icon'/>
            <input type={showPassword ? 'text' : 'password'} name="password" value={user.password} placeholder='Password'  onChange={handleChange}></input>
            {showPassword ? <FaEyeSlash className='reg-eye-icon' onClick={togglePasswordVisibility} /> : <FaEye className='reg-eye-icon' onClick={togglePasswordVisibility} />}
            
            
            <CiLock className='lock-repas'/>
            <input type={showPassword1 ? 'text' : 'password'} name="reEnterPassword" value={user.reEnterPassword}  placeholder='Confirm Password'  onChange={handleChange}></input>
            {showPassword1 ? <FaEyeSlash className='eye-repas' onClick={togglePasswordVisibility1} /> : <FaEye className='eye-repas' onClick={togglePasswordVisibility1} />}
            
            <button className='button-1' onClick={register}>Register</button>
            <p>Have an account ?</p>
            {/* <div className='button-reg' onClick={()=>navigate("/register")}>Register</div> */}
            <button className='button-2' onClick={()=>navigate("/login")}>Login</button>
        </div>
    </div>
  );
}

export default Register;
