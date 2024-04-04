import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField } from '@mui/material';
import './Login.css';
import axios from "axios";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorNone, setEmailNone] = useState(false);
    const [passwordErrorWrong, setPasswordWrong] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
     
        if (storedEmail ) {
            window.location.href = "/dashboard";
        }
        else if(localStorage == null){
    
        window.location.href = "/Login"; 
    }
    }, []);

    function handleClose() {
        setOpen(false);
    };

    function handleLogin() {
        if (!email || !password) {
            setEmailError(!email);
            setPasswordError(!password);
            return;
        }

        axios.get(`http://localhost:1337/viewUsers`)
            .then((response) => {
                const users = response.data;
                const user = users.find(user => user.Email === email);
                if (user) {
                    if (user.Password === password) {
                        console.log('Login successful');
                    localStorage.setItem('email', email);
                        window.location.href = "/dashboard";
                    } else {
                        console.log('Incorrect password');
                        setPasswordWrong(true);
                        setEmailNone(false);
                    }
                } else {
                    console.log('User not found');
                    setEmailNone(true);
                    setPasswordWrong(true);
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    return (

        <div className="loginBody">
            <Modal
                open={open}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
                className="custom-modal"
            >
                <Box className="login-container">
                    <h2 id="login-modal-title">Login</h2>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={emailError || emailErrorNone}
                        helperText={
                            (emailError && "Email is required") ||
                            (emailErrorNone && "Email not found")
                        }
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={passwordError || passwordErrorWrong}
                        helperText={
                            (passwordError && "Password is required") ||
                            (passwordErrorWrong && "Password is wrong")
                        }
                    />
                    <div className="button-container">
                        <Button variant="contained" onClick={handleLogin} >
                            Login
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>

    );
}
export default Login;
