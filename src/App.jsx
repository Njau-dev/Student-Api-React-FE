import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './pages/Dashboard';
import StudentManagement from './pages/StudentManagement';
import Navbar from './components/Navbar';
import AddStudent from './components/AddStudent';
import AllStudents from './components/AllStudents';
import StudentDetails from './components/StudentDetails';
import UpdateStudent from './components/UpdateStudent';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import LogOut from './components/LogOut';

const App = () => {
  return (
    <>
      <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/students/addstudent" element={<AddStudent />} />
          <Route path="/students/allstudents" element={<AllStudents />} />
          <Route path="/students/studentdetails/:id" element={<StudentDetails />} />
          <Route path="/students/updatestudent/:id" element={<UpdateStudent />} />
          <Route path="/user/logout" element={<LogOut />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
