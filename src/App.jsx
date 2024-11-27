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
import UserManagement from './pages/UserManagement';
import CourseManagement from './pages/CourseManagement';
import AllCourses from './components/AllCourses';
import AddCourses from './components/AddCourses';
import CourseDetails from './components/CourseDetails';
import UpateCourse from './components/UpateCourse';

const App = () => {
  return (
    <>
      <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/logout" element={<LogOut />} />

          <Route path="/students" element={<StudentManagement />} />
          <Route path="/students/addstudent" element={<AddStudent />} />
          <Route path="/students/allstudents" element={<AllStudents />} />
          <Route path="/students/studentdetails/:id" element={<StudentDetails />} />
          <Route path="/students/updatestudent/:id" element={<UpdateStudent />} />

          <Route path="/users" element={<UserManagement />} />

          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/courses/addcourse" element={<AddCourses />} />
          <Route path="/courses/allcourses" element={<AllCourses />} />
          <Route path='/courses/coursedetails/:id' element={<CourseDetails />} />
          <Route path='/courses/editcourse/:id' element={<UpateCourse />} />


        </Routes>
        <ToastContainer />
      </div >
    </>
  );
};

export default App;
