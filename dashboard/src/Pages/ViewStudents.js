import React, { useState, useEffect } from "react";
import './ViewStudents.css';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';

import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper,Button, TextField} from "@mui/material";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editedStudent, setEditedStudent] = useState(null); 

  // State to manage error messages
  const [errorMessages, setErrorMessages] = useState({
    Year: "",
    First: "",
    Last: "",
    Middle: "",
    Course: ""
  });

  useEffect(() => {
   //ajsdansdajnd
    axios.get(`http://localhost:1337/viewstudents`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  function handleEditStudent(student){
    setSelectedStudent(student);
    setEditedStudent({ ...student }); 
    setModalOpen(true);
  };

  function handleCloseModal (){
    setModalOpen(false);
    setEditedStudent(null); 
  };

    // Function to update edited student details
    function handleStudentChange(event) {
      const { name, value } = event.target;

  // Reset the error message for the current field
  setErrorMessages(prevState => ({
    ...prevState,
    [name]: ""
  }));

  // Validate the entered value based on the field name
  if (name === "Year") {
    if (value >= 1 && value <= 5) {
      setEditedStudent(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setErrorMessages(prevState => ({
        ...prevState,
        [name]: "Year must be between 1 and 5."
      }));
    }
  } else if (name === "First" || name === "Last" || name === "Middle" || name === "Course") {
    // Modify the regular expression pattern to allow spaces, underscores, and dots
    if (/^[A-Za-z\s_.-]+$/.test(value) || value === '') {
      setEditedStudent(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setErrorMessages(prevState => ({
        ...prevState,
        [name]: "Only letters, spaces, underscores, and dots are allowed."
      }));
    }
  } else {
    setEditedStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
}
//try
// Function to save edited student data
function handleSaveChanges() {
  axios.put(`http://localhost:1337/editStudent`, editedStudent)
    .then(response => {
      console.log("Student data updated successfully!");
      // Update the students array with the edited data
      const updatedStudents = students.map(student => {
        if (student.ID === editedStudent.ID) {
          return editedStudent;
        } else {
          return student;
        }
      });
      setStudents(updatedStudents); // Update the state with the new student data
      handleCloseModal(); // Close the modal after saving changes
    })
    .catch(error => {
      console.error("Error updating student data:", error);
      // Handle error, show error message to the user
    })
    .finally(() => {
      // This block will execute regardless of whether the request succeeded or failed
      // You can use it to show the success message
      alert("Student updated successfully!");
    });
}

function handleDelete() {
  axios.delete(`http://localhost:1337/deleteStudent/${editedStudent.ID}`)
    .then(response => {
      console.log("Student data deleted successfully!");
      // Remove the deleted student from the students array
      const updatedStudents = students.filter(student => student.ID !== editedStudent.ID);
      setStudents(updatedStudents); // Update the state with the new student data
      handleCloseModal(); // Close the modal after deleting the student
    })
    .catch(error => {
      console.error("Error deleting student data:", error);
      // Handle error, show error message to the user
    })
    .finally(() => {
      // This block will execute regardless of whether the request succeeded or failed
      // You can use it to show the success message
      alert("Student deleted successfully!");
    });
}

  return (
    <>
      <div className="view-container">
        <h1>View Students</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID Number</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Middle Name</TableCell>
                <TableCell align="center">Course</TableCell>
                <TableCell align="center">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row" align="center">{student.ID}</TableCell>
                  <TableCell align="center">{student.First}</TableCell>
                  <TableCell align="center">{student.Last}</TableCell>
                  <TableCell align="center">{student.Middle}</TableCell>
                  <TableCell align="center">{student.Course}</TableCell>
                  <TableCell align="center">{student.Year}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleEditStudent(student)}>EDIT</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
        <Modal open = { modalOpen }onClose = { handleCloseModal } >
        <Box sx = {{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 } } >
        <Typography variant = "h6"component = "h2"fontWeight = "bold"align = "left" > Student Information </Typography> 
        <div style = {{ marginBottom: '16px' } }/> 
        <TextField variant="outlined" label="ID Number" name="ID" value={editedStudent && editedStudent.ID}  enabled={false} />
        <div style = {{ marginBottom: '16px' } }/> 
        <TextField variant = "outlined"label = "First Name"name = "First"value = { editedStudent && editedStudent.First }onChange = { handleStudentChange }/> 
        <div style = {{ marginBottom: '16px' } }/> 
        <TextField variant = "outlined"label = "Last Name"name = "Last"value = { editedStudent && editedStudent.Last }onChange = { handleStudentChange }/> 
        <div style = {{ marginBottom: '16px' } }/> 
        <TextField variant = "outlined"label = "Middle Name"name = "Middle"value = { editedStudent && editedStudent.Middle }onChange = { handleStudentChange }/> 
        <div style = {{ marginBottom: '16px' } }/> 
        <TextField variant = "outlined" label = "Course"name = "Course" value = { editedStudent && editedStudent.Course }onChange = { handleStudentChange }/>
         <div style = {{ marginBottom: '16px' } }/> 
         <TextField variant = "outlined"label = "Year"name = "Year" type="number"  value = { editedStudent && editedStudent.Year }onChange = { handleStudentChange } />  
         <div style = {{ marginBottom: '16px' } }/>

          
         <Box sx={{ display: 'inline-flex',   gap: '8px'}}>
           <Button variant="contained"  onClick={handleSaveChanges}>Save</Button>
           <Button variant="contained" onClick={handleCloseModal}>Close</Button>
           <Button variant="contained" onClick={handleDelete}>Delete</Button>
        </Box>
            </Box> 
        </Modal> 
        </>
    );
              }
 //asdasda
export default ViewStudents;