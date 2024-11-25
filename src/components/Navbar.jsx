import { AcademicCapIcon, UserIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="navbar-f">
            <AcademicCapIcon className='iconsss' />

            <div>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/students" className="navbar-link">Student Management</Link>
                <div>
                    <UserIcon className='profile-icon' />
                    <Dropdown>
                        <Dropdown.Toggle variant="default" id="dropdown-basic" size="md">

                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link to={`/user`} className="dropdown-item">
                                Profile
                            </Link>
                            <Link to={`/`} className="dropdown-item">
                                Login
                            </Link>
                            <Link to={'/user/logout'} className="dropdown-item">
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
