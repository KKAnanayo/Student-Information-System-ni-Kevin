import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField } from "@mui/material";
import axios from 'axios';
import './Student.css';

function Student() {
  const [avatar, setAvatar] = useState("");
  const storedID = localStorage.getItem('id');

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://localhost:1337/viewManageStudent`)
      .then((response) => {
        const studentsData = response.data;
        const studentWithID = studentsData.find(student => student.ID === storedID);
        setStudent(studentWithID);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='view-container'>
      {student && (
        <>
          <h2>Student ID: {storedID}</h2>
          <input type="file" onChange={handleChange} />
          <div>
            <img src={avatar} className="img" alt="" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>ID</b></TableCell>
                    <TableCell align="center"><b>First Name</b></TableCell>
                    <TableCell align="center"><b>Last Name</b></TableCell>
                    <TableCell align="center"><b>Middle Name</b></TableCell>
                    <TableCell align="center"><b>Course</b></TableCell>
                    <TableCell align="center"><b>Year</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={student.ID}>
                    <TableCell align="center">{student.ID}</TableCell>
                    <TableCell align="center">{student.First}</TableCell>
                    <TableCell align="center">{student.Last}</TableCell>
                    <TableCell align="center">{student.Middle}</TableCell>
                    <TableCell align="center">{student.Course}</TableCell>
                    <TableCell align="center">{student.Year}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Student;
