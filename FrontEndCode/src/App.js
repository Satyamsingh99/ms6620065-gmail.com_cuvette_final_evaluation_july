import'./App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import Register from './components/register/register';
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
  const [ user , setLoginUser]=useState ({ })
  return (
    <>
    <div className='app'>
       <Router>
          <Routes>
            <Route exact path="/" element={user && user._id ?<Dashboard  user={user}setLoginUser={setLoginUser}/>:<Login setLoginUser={setLoginUser} />} />
            <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
       </Router> 
    </div>

    </>
  );
};

export default App;
