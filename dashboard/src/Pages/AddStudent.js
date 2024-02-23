import React, { useState } from "react";
import './AddStudent.css';
import { Grid, TextField, Button } from '@mui/material';

function AddStudent() {
  const [ID, setID] = useState("");
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [Middle, setMiddle] = useState("");
  const [Course, setCourse] = useState("");
  const [Year, setYear] = useState("1");
  

  async function handleAddStudent() { 
    const studentData = {
      ID,
      First,
      Last,
      Middle,
      Course,
      Year,
    };

    try {
      const response = await fetch("http://localhost:1337/addstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();

      if (result.success) {
        setID("");
        setFirst("");
        setLast("");
        setMiddle("");
        setCourse("");
        setYear("");
        alert(result.message);
      } else {
        alert("Failed to add student. Please try again.")
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // Function to handle changes in the "Year" TextField
  function handleYearChange(event) {
    const { value } = event.target;
    if (value >= 1 && value <= 5) {
      setYear(value);
    }
  }

  // Function to handle changes in the "ID Number" TextField
  function handleIDChange(event) {
    const { value } = event.target;
    if (/^\d{0,8}$/.test(value)) { // Using regex to allow only exactly 8 digits
      setID(value);
    }
  }

  function handleCourseChange(event) {
    const { value } = event.target;
    if (/^[A-Za-z]+$/.test(value) || value === '') { // Allow only letters or empty string
      setCourse(value);
    }
  }
  
  // Function to handle changes in the "First Name" TextField
function handleFirstNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { // Allow letters, spaces, hyphens, underscores, and dots or empty string
    setFirst(value);
  }
}

// Function to handle changes in the "Last Name" TextField
function handleLastNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { // Allow letters, spaces, hyphens, underscores, and dots or empty string
    setLast(value);
  }
}

// Function to handle changes in the "Middle Name" TextField
function handleMiddleNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { // Allow letters, spaces, hyphens, underscores, and dots or empty string
    setMiddle(value);
  }
}

  return (
    <div className='content'>
      <Grid container direction="row" justifyContent="left" alignItems="left">
        <Grid item xs={4}>
          <h4>ADD STUDENT</h4>
          <TextField
            id="outlined-basic"
            label="ID Number"
            variant="outlined"
            value={ID}
            onChange={handleIDChange} // Apply the validation function here
            sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
            type="number"
          />

        <TextField 
          id="outlined-basic" 
          label="First Name" 
          variant="outlined" 
          value={First} 
          onChange={handleFirstNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }} />


        <TextField 
          id="outlined-basic" 
          label="Last Name" 
          variant="outlined" 
          value={Last} 
          onChange={handleLastNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }} />

        <TextField 
          id="outlined-basic" 
          label="Middle Name" 
          variant="outlined" 
          value={Middle} 
          onChange={handleMiddleNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }} />

        <TextField 
        id="outlined-basic" 
        label="Course" 
        variant="outlined" 
        value={Course} 
        onChange={handleCourseChange}
        sx={{ width: '20vw', mb: 5, fontSize: '24px' }} />

            <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            value={Year}
            onChange={handleYearChange} // Apply the validation function here
            sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
            type="number"
          />

          <Button
            variant="contained"
            type="submit"
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddStudent;