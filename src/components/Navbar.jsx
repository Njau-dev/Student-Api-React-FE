import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Student App</h1>

            <div>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/students" className="navbar-link">Student Management</Link>
            </div>
        </nav>
    );
};

export default Navbar;
