import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddStudent from "./Pages/AddStudent";
import Sidebar from "./Pages/Sidebar";
import ViewStudents from "./Pages/ViewStudents";
import ViewUsers from "./Pages/ViewUsers";
import Login from "./Pages/Login";
import ManageStudent from "./Pages/ManageStudent";
import Student from "./Pages/Student";
import SearchTab from "./Pages/SearchTab";
import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/viewstudents" element={<ViewStudents />} />
          <Route path="/managestudent" element={<ManageStudent />} />
          <Route path="/viewusers" element={<ViewUsers />} />
          <Route path="/student" element={<Student />} />
          <Route path="/searchtab" element={<SearchTab />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
