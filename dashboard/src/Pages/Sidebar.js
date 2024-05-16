import React, { useEffect } from 'react';
import './Sidebar.css';
import Home from '@mui/icons-material/Home';
import Info from '@mui/icons-material/Info';
import Add from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

<<<<<<< HEAD
function Sidebar() {
  const storedData = localStorage.getItem('email') ? 'email' : localStorage.getItem('id') ? 'id' : null;
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedID = localStorage.getItem('id');
    const isLoginPage = window.location.pathname === '/';


    if (!(storedEmail || storedID) && !isLoginPage) {
      window.location.href = "/";
    } else if (localStorage == null) {
=======
function Sidebar(){
    const storedData = localStorage.getItem('email') ? 'email' : localStorage.getItem('id') ? 'id' : null;
    const navigate = useNavigate();
    useEffect(() => {
      if(storedID){
        navigate('/student');
      }
    }, []);
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedID = localStorage.getItem('id');
    const isLoginPage = window.location.pathname === '/'; 
    
    

    if (!(storedEmail || storedID) && !isLoginPage) {
        window.location.href = "/";
    }    else if (localStorage == null){
>>>>>>> 95a4aec2fb03376f476779510f0bf30ecdfdf9aa
      window.location.href = "/";
    } 

  }, []);
  function handleLogout() {

    localStorage.removeItem('email');
    localStorage.removeItem('id');


<<<<<<< HEAD
    window.location.href = "/";
  }

=======
    }
    else if(localStorage = 'id'){
  
    };
}
>>>>>>> 95a4aec2fb03376f476779510f0bf30ecdfdf9aa

  const storedID = localStorage.getItem('id');

  return (
    <div className='sidebar'>
      <div className='h1'>
        <Link to="/Dashboard" style={{ justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none', pointerEvents: storedData === 'id' ? 'none' : 'auto', opacity: storedData === 'id' ? '0.5' : '1' }}><Home sx={{ fontSize: 30 }} />&nbsp;&nbsp;&nbsp;Home</Link>
        <br />
        <Link to="/addstudent" style={{ justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none', pointerEvents: storedData === 'id' ? 'none' : 'auto', opacity: storedData === 'id' ? '0.5' : '1' }}><Add sx={{ fontSize: 30 }} />&nbsp;&nbsp;&nbsp;Add Student</Link>
        <br />
        <Link to="/viewstudents" style={{ justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none', pointerEvents: storedData === 'id' ? 'none' : 'auto', opacity: storedData === 'id' ? '0.5' : '1' }}><Info sx={{ fontSize: 30 }} />&nbsp;&nbsp;&nbsp;View Student</Link>
        <br />
        <Link to="/viewusers" style={{ justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none', pointerEvents: storedData === 'id' ? 'none' : 'auto', opacity: storedData === 'id' ? '0.5' : '1' }}><VerifiedUserIcon sx={{ fontSize: 30 }} />&nbsp;&nbsp;&nbsp;View Users</Link>
        <br />
        <Link to="/managestudent" style={{ justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none', pointerEvents: storedData === 'id' ? 'none' : 'auto', opacity: storedData === 'id' ? '0.5' : '1' }}><AccountCircle sx={{ fontSize: 30 }} />&nbsp;&nbsp;&nbsp;Manage Student</Link>
        <br />
        <Link onClick={handleLogout} style={{ justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none' }}><Logout sx={{ fontSize: 30 }} />&nbsp;&nbsp;&nbsp;Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;