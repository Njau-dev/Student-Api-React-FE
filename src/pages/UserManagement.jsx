import React from 'react'
import { QueueListIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    return (
        <div className="student-management">
            <h2>User Management</h2>
            <ul className="student-management-list">
                <li><Link to="/students/adduser" className="student-link">Add User <UserPlusIcon /></Link></li>
                {/* <li><Link to="/students/updatestudent" className="student-link">Update Student</Link></li> */}
                <li><Link to="/students/allusers" className="student-link">All Users <QueueListIcon className='' /></Link></li>
            </ul>
        </div>
    )
}

export default UserManagement




