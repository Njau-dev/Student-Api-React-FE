import React from 'react';
import { Link } from 'react-router-dom';

const StudentManagement = () => {
    return (
        <div className="student-management">
            <h2>Student Management</h2>
            <ul className="student-management-list">
                <li><Link to="/students/addstudent" className="student-link">Add Student</Link></li>
                <li><Link to="/students/updatestudent" className="student-link">Update Student</Link></li>
                <li><Link to="/students/allstudents" className="student-link">View All Students</Link></li>
            </ul>
        </div>
    );
};

export default StudentManagement;
