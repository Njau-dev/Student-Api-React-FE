import { AcademicCapIcon, BookOpenIcon, PlusIcon, QueueListIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const userToken = localStorage.getItem('accessToken');

    return (
        <div className="student-management">
            <h2>Dashboard</h2>
            <ul className="student-management-list">
                <li><Link to="/students" className="student-link">Students <AcademicCapIcon /></Link></li>
                <li><Link to="/users" className="student-link">Users <UserGroupIcon /></Link></li>
                <li><Link to="/courses" className="student-link">Courses <BookOpenIcon className='' /></Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;
