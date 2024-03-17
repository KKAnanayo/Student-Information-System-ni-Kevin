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
  const [error, setError] = useState("");

  async function handleAddStudent() { 
    if (!First || !Last || !ID || !Course) {
      setError("Please fill out all Box.");
      return;
    }

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
        setError("");
        alert(result.message);
      } else {
        alert("Failed to add student. Please try again.")
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }
  }

  function handleYearChange(event) {
    const { value } = event.target;
    if (value >= 1 && value <= 5) {
      setYear(value);
    }
  }

  function handleIDChange(event) {
    const { value } = event.target;
    if (/^\d{0,8}$/.test(value)) { 
      setID(value);
    }
  }

  function handleCourseChange(event) {
    const { value } = event.target;
    if (/^[A-Za-z]+$/.test(value) || value === '') { 
      setCourse(value);
    }
  }
  
function handleFirstNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { 
    setFirst(value);
  }
}


function handleLastNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { 
    setLast(value);
  }
}

function handleMiddleNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { 
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
            onChange={handleIDChange} 
            sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
            error={error && !ID} 
            helperText={error && !ID ? error : ""}
          />

        <TextField 
          id="outlined-basic" 
          label="First Name" 
          variant="outlined" 
          value={First} 
          onChange={handleFirstNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
          error={error && !First} 
          helperText={error && !First ? error : ""}
        />


        <TextField 
          id="outlined-basic" 
          label="Last Name" 
          variant="outlined" 
          value={Last} 
          onChange={handleLastNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
          error={error && !Last} 
          helperText={error && !Last ? error : ""}
        />

        <TextField 
          id="outlined-basic" 
          label="Middle Name" 
          variant="outlined" 
          value={Middle} 
          onChange={handleMiddleNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
        />

        <TextField 
        id="outlined-basic" 
        label="Course" 
        variant="outlined" 
        value={Course} 
        onChange={handleCourseChange}
        sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
        error={error && !Course} 
        helperText={error && !Course ? error : ""}
        />

            <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            value={Year}
            onChange={handleYearChange} 
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
