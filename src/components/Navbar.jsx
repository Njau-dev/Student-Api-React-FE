import { AcademicCapIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar-f">
            <AcademicCapIcon className='iconsss' />

            <div>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/students" className="navbar-link">Student Management</Link>
            </div>
        </nav>
    );
};

export default Navbar;
