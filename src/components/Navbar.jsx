import { AcademicCapIcon, UserIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {


    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggle = (isOpen) => {
        setShowDropdown(isOpen);
    };

    const handleOptionClick = () => {
        // Close the dropdown when any option is clicked
        setShowDropdown(false);
    };

    return (
        <nav className="navbar-f">
            <AcademicCapIcon className='iconsss' />

            <div>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/students" className="navbar-link">Student Management</Link>
                <div>
                    <UserIcon className='profile-icon' />
                    <Dropdown show={showDropdown} onToggle={handleToggle}>
                        <Dropdown.Toggle variant="default" id="dropdown-basic" size="md">

                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link to={`/user`} className="dropdown-item" onClick={handleOptionClick}>
                                Profile
                            </Link>
                            <Link to={`/`} className="dropdown-item" onClick={handleOptionClick}>
                                Login
                            </Link>
                            <Link to={'/user/logout'} className="dropdown-item" onClick={handleOptionClick}>
                                Log out
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
