import React,{useState} from "react";
import './AddStudent.css';
import {Grid, TextField, Button } from '@mui/material';

function AddStudent(){

  const [ID, setID] = useState("");
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [Middle, setMiddle] = useState("");
  const [Course, setCourse] = useState("");
  const [Year, setYear] = useState("");

  async function handleAddStudent(){
    const studentData= {
      ID,
      First,
      Last,
      Middle,
      Course,
      Year,
    };

    try{
      const response = await fetch("http://localhost:1337/addstudent",{
    method:"POST",
    headers:{
    "Content-Type":"application/json"
    },
    body: JSON.stringify(studentData),
    });

    const result = await response.json();

    if(result.success){
      setID("");
      setFirst("");
      setLast("");
      setMiddle("");
      setCourse("");
      setYear("");
      alert(result.message);
    }else{
      alert("Failed to add student. Please try again.")
    } 
    } catch (error){
      console.error("Error adding student:", error);
      alert("Ann error occured. Please try again.");
    }
  }



    
    return (

    <div className='content'>
      <Grid container direction="row"
        justifyContent="left"
        alignItems="left">
          <Grid item xs={4}>
          <h4>ADD STUDENT</h4>
      <TextField id ="outlined-basic" label = "ID Number" variant="outlined" value={ID} onChange={(e) => setID(e.target.value)} 
      sx={{ width: '20vw', mb: 5 ,fontSize: '24px'}}/>

      <TextField id ="outlined-basic" label = "First Name" variant="outlined" value={First} onChange={(e) => setFirst(e.target.value)} 
      sx={{ width: '20vw', mb: 5 ,fontSize: '24px'}}/>

      <TextField id ="outlined-basic" label = "Last Name" variant="outlined" value={Last} onChange={(e) => setLast(e.target.value)} 
      sx={{ width: '20vw', mb: 5 ,fontSize: '24px'}}/>

      <TextField id ="outlined-basic" label = "Middle Name" variant="outlined" value={Middle} onChange={(e) => setMiddle(e.target.value)} 
      sx={{ width: '20vw', mb: 5 ,fontSize: '24px'}}/>

      <TextField id ="outlined-basic" label = "Course" variant="outlined" value={Course} onChange={(e) => setCourse (e.target.value)} 
      sx={{ width: '20vw', mb: 5 ,fontSize: '24px'}}/>

      <TextField id ="outlined-basic" label = "Year" variant="outlined" value={Year} onChange={(e) => setYear(e.target.value)} 
      sx={{ width: '20vw', mb: 5 ,fontSize: '24px'}}/>

      <Button variant ="contained" type="submit" onClick={(handleAddStudent)}
      >Add Student</Button>
      </Grid>
      </Grid>
      
      </div>
  );
};

export default AddStudent; 