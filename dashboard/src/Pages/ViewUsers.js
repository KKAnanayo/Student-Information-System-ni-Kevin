import React, { useState, useEffect } from "react";
import "./ViewUsers.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
} from "@mui/material";

function ViewUsers() {
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:1337/viewUsers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  function handleAdd() {
    setModalOpen(true);
  }

  function handleEdit(user) {
    setEditedUser(user);
    setEditFirst(user.First);
    setEditLast(user.Last);
    setEditMiddle(user.Middle);
    setEditEmail(user.Email);
    setEditPassword(user.Password);
    setEditModalOpen(true);
  }

  function handleCloseModal() {
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
  }

  function handleAddUser() {
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

    axios
      .post("http://localhost:1337/addUser", userData)
      .then((response) => {
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
      .catch((error) => {
        console.error("Error adding user:", error);
        setEmailUniqueError(true);
      });
  }

  function handleSaveEdit() {
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

    axios
      .put(`http://localhost:1337/editUser/${editedUser.Email}`, userData)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        setEditModalOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }

  return (
    <div className="view-container">
      <h3>View Users</h3>
      <Button variant="contained" onClick={handleAdd}>
        ADD USER
      </Button>
      <h6>MUI Table</h6>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            fontWeight="bold"
            align="left"
          >
            Add User Information
          </Typography>
          <div style={{ marginBottom: "16px" }} />

          <TextField
            variant="outlined"
            label="First Name"
            value={editFirst}
            onChange={(e) => setEditFirst(e.target.value)}
            error={firstNameError}
            helperText={firstNameError && "First Name is required"}
          />
          <div style={{ marginBottom: "16px" }} />
          <TextField
            variant="outlined"
            label="Last Name"
            value={editLast}
            onChange={(e) => setEditLast(e.target.value)}
            error={lastNameError}
            helperText={lastNameError && "Last Name is required"}
          />
          <div style={{ marginBottom: "16px" }} />
          <TextField
            variant="outlined"
            label="Middle Name"
            value={editMiddle}
            onChange={(e) => setEditMiddle(e.target.value)}
          />

          <div style={{ marginBottom: "16px" }} />
          <TextField
            variant="outlined"
            label="Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            error={emailRequiredError || emailUniqueError}
            helperText={
              (emailRequiredError && "Email is required") ||
              (emailUniqueError && "Email must be unique")
            }
          />
          <div style={{ marginBottom: "16px" }} />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError && "Password is required"}
          />
          <div style={{ marginBottom: "16px" }} />

          <Button variant="contained" onClick={handleAddUser}>
            Add User
          </Button>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>First Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Last Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Middle Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Email</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.Email}>
                  <TableCell align="center">{user.First}</TableCell>
                  <TableCell align="center">{user.Last}</TableCell>
                  <TableCell align="center">{user.Middle}</TableCell>
                  <TableCell align="center">{user.Email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(user)}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalEditOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            fontWeight="bold"
            align="left"
          >
            User Information
          </Typography>
          <div style={{ marginBottom: "16px" }} />

          <TextField
            variant="outlined"
            label="First Name"
            value={editFirst}
            onChange={(e) => setEditFirst(e.target.value)}
            error={firstNameError}
            helperText={firstNameError && "First Name is required"}
          />
          <div style={{ marginBottom: "16px" }} />
          <TextField
            variant="outlined"
            label="Last Name"
            value={editLast}
            onChange={(e) => setEditLast(e.target.value)}
            error={lastNameError}
            helperText={lastNameError && "Last Name is required"}
          />
          <div style={{ marginBottom: "16px" }} />
          <TextField
            variant="outlined"
            label="Middle Name"
            value={editMiddle}
            onChange={(e) => setEditMiddle(e.target.value)}
          />
          <div style={{ marginBottom: "16px" }} />
          <TextField
            variant="outlined"
            label="Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            disabled
          />
          <div style={{ marginBottom: "16px" }} />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError && "Password is required"}
          />
          <div style={{ marginBottom: "16px" }} />

          <Button variant="contained" onClick={handleSaveEdit}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewUsers;
