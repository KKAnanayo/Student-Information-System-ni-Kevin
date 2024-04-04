import React, { useEffect } from "react";
import { Button } from "@mui/material";
import './Dashboard.css';

function Dashboard() {
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
        <div className='main'>
            <h1>Welcome to Saint Mary's University</h1>
            <div className="Logout">
                <Button variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default Dashboard;
