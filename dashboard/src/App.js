import React,{useState} from 'react';
import{BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import AddStudent from './Pages/AddStudent';
import Sidebar from './Pages/Sidebar';
import ViewStudents from './Pages/ViewStudents';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/viewstudents" element={<ViewStudents />} />
          <Route path="*" element ={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
