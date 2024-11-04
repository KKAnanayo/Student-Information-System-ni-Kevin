import React, { useState } from "react";
import "./SearchTab.css";
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
import axios from "axios";

function SearchTab() {
  const [searchQuery, setSearchQuery] = useState(""); // Renamed for general query
  const [studentData, setStudentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    setErrorMessage("");
    setStudentData(null);

    if (!searchQuery) {
      setErrorMessage("Please enter a valid ID number or last name.");
      return;
    }

    axios
      .get(`http://localhost:1337/viewManageStudent/${searchQuery}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setStudentData(response.data); // Expecting an array of students
        } else {
          setErrorMessage("Student not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        setErrorMessage("Error fetching student data.");
      });
  };

  return (
    <div className="main">
      <h2>Search for a Student</h2>
      <div className="search-container">
        <TextField
          label="Enter Student ID or Last Name"
          variant="outlined"
          value={searchQuery} // Updated to use searchQuery
          onChange={(e) => setSearchQuery(e.target.value)} // Updated to set searchQuery
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {studentData && (
        <TableContainer component={Paper} className="search-results">
          <Table>
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
              {studentData.map((student) => (
                <TableRow key={student.ID}>
                  <TableCell align="center">{student.ID}</TableCell>
                  <TableCell align="center">{student.First}</TableCell>
                  <TableCell align="center">{student.Last}</TableCell>
                  <TableCell align="center">{student.Middle}</TableCell>
                  <TableCell align="center">{student.Course}</TableCell>
                  <TableCell align="center">{student.Year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default SearchTab;
