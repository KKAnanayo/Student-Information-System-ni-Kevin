import React,{useEffect} from 'react';
import './Sidebar.css';
import Home from '@mui/icons-material/Home';
import Info from '@mui/icons-material/Info';
import Add from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Link } from "react-router-dom";

function Sidebar(){
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const isLoginPage = window.location.pathname === '/'; 

   
    if (!(storedEmail ) && !isLoginPage) {
        window.location.href = "/";
    }
}, []);
function handleLogout() {
       
  localStorage.removeItem('email');

 
  window.location.href = "/";
}
    return (
        <div className='sidebar'>
          <div className='h1'>
          
          <Link to = "/Dashboard" style={{justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none'}}><Home sx={{ fontSize: 30 }}/>&nbsp;&nbsp;&nbsp;Home</Link>
          <br/>
          <Link to = "/addstudent" style={{justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none'}}><Add sx={{ fontSize: 30 }}/>&nbsp;&nbsp;&nbsp;Add Student</Link>
          <br/>
          <Link to = "/viewstudents" style={{justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none'}}><Info sx={{ fontSize: 30 }}/>&nbsp;&nbsp;&nbsp;View Student</Link>
          <br/>
          <Link to = "/viewusers" style={{justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none'}}><VerifiedUserIcon sx={{ fontSize: 30 }}/>&nbsp;&nbsp;&nbsp;View Users</Link>
          <br/>
          <Link to = "/managestudent" style={{justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none'}}><AccountCircle sx={{ fontSize: 30 }}/>&nbsp;&nbsp;&nbsp;Manage Student</Link>
          <br/>
          <Link onClick={handleLogout} style={{justifyContent: 'left', display: 'flex', color: '#FFFFFF', textDecoration: 'none'}}><Logout sx={{ fontSize: 30 }}/>&nbsp;&nbsp;&nbsp;Logout</Link>
          
          </div>
        </div>
    );
  };
  
  export default Sidebar;