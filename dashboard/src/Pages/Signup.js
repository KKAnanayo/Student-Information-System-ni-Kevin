import React, {useState, useEffect} from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import axios from "axios";

function Signup() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [editFirst, setEditFirst] = useState("");
    const [editLast, setEditLast] = useState("");
    const [editMiddle, setEditMiddle] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);  
    const [emailRequiredError, setEmailRequiredError] = useState(false);
    const [emailUniqueError, setEmailUniqueError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function handleAdd ()  {
        setModalOpen(true);
    };
    function handleCloseModal () {
        setModalOpen(false);
        setEditModalOpen(false);
        setEditedUser(null);
        setEmailUniqueError(false);
        setEmailRequiredError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setPasswordError(false);
        setEditFirst("");
        setEditLast("");
        setEditMiddle("");
        setEditEmail("");
        setEditPassword("");
        
    };

  

    function handleAddUser () {
        
        if (!editFirst) {
            setFirstNameError(true);
            return;
        } else {
            setFirstNameError(false);
        }

         
        if (!editLast) {
            setLastNameError(true);
            return;
        } else {
            setLastNameError(false);
        }

        if (!editEmail) {
            setEmailRequiredError(true);
            return;
        } else {
            setEmailRequiredError(false);
        }

        if (!editPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        
        const userData = {
            First: editFirst,
            Last: editLast,
            Middle: editMiddle,
            Email: editEmail,
            Password: editPassword,
        };

        axios.post("http://localhost:1337/addUser", userData)
        .then(response => {
    
            console.log("User added successfully:", response.data);
            setEditFirst("");
            setEditLast("");
            setEditMiddle("");
            setEditEmail("");
            setEditPassword("");
            setModalOpen(false); 
            fetchData();

            setEmailUniqueError(false);
        })
        .catch(error => {
            console.error("Error adding user:", error);
            setEmailUniqueError(true);
            });
    }

  return (
    <div className="view-container">
            <h3>View Users</h3>
            <Button variant="contained" onClick={handleAdd}>ADD USER</Button>
            <h6>MUI Table</h6>
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" component="h2" fontWeight="bold" align="left">Add User  Information</Typography>
                    <div style={{ marginBottom: '16px' }} />
                    
                    <TextField variant="outlined" 
                    label="First Name" 
                    value={editFirst} onChange={(e) => 
                    setEditFirst(e.target.value)} 
                    error={firstNameError}
                    helperText={firstNameError && "First Name is required"}
                    />
                    <div style={{ marginBottom: '16px' }}/>
                    <TextField variant="outlined" 
                    label="Last Name" 
                    value={editLast} 
                    onChange={(e) => setEditLast(e.target.value)} 
                    error={lastNameError}
                    helperText={lastNameError && "Last Name is required"}
                    />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" 
                    label="Middle Name" 
                    value={editMiddle} 
                    onChange={(e) => setEditMiddle(e.target.value)} 
                    />
    
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" 
                    label="Email" 
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)} 
                    error={emailRequiredError || emailUniqueError}
                    helperText={
                        (emailRequiredError && "Email is required") ||
                        (emailUniqueError && "Email must be unique")
                    }
                    />
                    <div style={{ marginBottom: '16px' }} 
                    />
                    <TextField type="password" 
                    variant="outlined" 
                    label="Password" 
                    value={editPassword} 
                    onChange={(e) => setEditPassword(e.target.value)} 
                    error={passwordError}
                    helperText={passwordError && "Password is required"}
                    />
                    <div style={{ marginBottom: '16px' }} />

                    <Button variant="contained" onClick={handleAddUser}>Add User</Button>
                </Box>
            </Modal>
            </div>
  );
}

export default Signup;
