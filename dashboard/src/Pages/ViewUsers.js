import React, { useState, useEffect } from "react";
import './ViewUsers.css';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField } from "@mui/material";

function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [First, setFirst] = useState("");
    const [Last, setLast] = useState("");
    const [Middle, setMiddle] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:1337/viewUsers`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }

    const handleAdd = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAddUser = () => {
        const userData = {
            First,
            Last,
            Middle,
            Email,
            Password,
        };

        axios.post("http://localhost:1337/addUser", userData)
            .then(response => {
                console.log("User added successfully:", response.data);
                setFirst("");
                setLast("");
                setMiddle("");
                setEmail("");
                setPassword("");
                setModalOpen(false); // Close modal after adding user
                fetchData(); // Refresh the user list after adding a user
            })
            .catch(error => {
                console.error("Error adding user:", error);
                // Handle error, show error message to the user
            });
    }

    return (
        <div className="view-container">
            <h3>View Users</h3>
            <Button variant="contained" onClick={handleAdd}>ADD USER</Button>
            <h6>MUI Table</h6>
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2" fontWeight="bold" align="left">User Information</Typography>
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="First Name" value={First} onChange={(e) => setFirst(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Last Name" value={Last} onChange={(e) => setLast(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Middle Name" value={Middle} onChange={(e) => setMiddle(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField type="password" variant="outlined" label="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />

                    <Button variant="contained" onClick={handleAddUser}>Add User</Button>
                </Box>
            </Modal>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Middle Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Password</TableCell>
                            <TableCell align="center">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
                            <TableRow key={user.Email}>
                                <TableCell align="center">{user.First}</TableCell>
                                <TableCell align="center">{user.Last}</TableCell>
                                <TableCell align="center">{user.Middle}</TableCell>
                                <TableCell align="center">{user.Email}</TableCell>
                                <TableCell align="center">{user.Password}</TableCell>
                                <TableCell>
                                    <Button variant="contained">EDIT</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewUsers;
