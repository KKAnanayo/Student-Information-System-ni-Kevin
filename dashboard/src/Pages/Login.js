import React, {useState} from "react";
import{Modal, Box, Button, TextField} from '@mui/material';
import './Login.css';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const[passwordError, setPasswordError] =useState(false);
 
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleLogin = () => {
        if (!email & !password) {
            setEmailError(true);
            setPasswordError(true);
            return;
        } else {
            setEmailError(false);
            setPasswordError(false);
        }
        if (!email)  {
            setEmailError(true);
           
            return;
        } else {
            setEmailError(false);
            
        }
        if (!password) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }
            console.log('Email:', email);
            console.log('Password:', password);
            handleClose(true);
            window.location.href = "/dashboard"; 
       
    };
    return(
        
        <div className="loginBody">
        <Modal
        open={open}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
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
                error={emailError}
                helperText={
                    (emailError && "Email is required") }
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={passwordError}
                helperText={
                    (passwordError && "Password is required") }
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