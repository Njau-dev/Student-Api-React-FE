import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './pages/Dashboard';
import StudentManagement from './pages/StudentManagement';
import Navbar from './components/Navbar';
import AddStudent from './components/AddStudent';

const App = () => {
  // State to track token
  const [userToken, setUserToken] = useState(localStorage.getItem('accessToken'));

  // Update token in state when it changes in local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserToken(localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className='app-container'>
        {/* Show Navbar if the user is logged in */}
        {userToken && <Navbar />}

        <Routes>
          {/* Redirect root to Dashboard if logged in, else show Login */}
          <Route path="/" element={userToken ? <Navigate to="/dashboard" /> : <Login setUserToken={setUserToken} />} />

          <Route path="/register" element={<Registration />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={userToken ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/students" element={userToken ? <StudentManagement /> : <Navigate to="/" />} />
          <Route path='/students/addstudent' element={userToken ? <AddStudent /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
