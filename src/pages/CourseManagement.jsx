import React from 'react'
import { DocumentPlusIcon, QueueListIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const CourseManagement = () => {
    return (
        <div className="student-management">
            <h2>Course Management</h2>
            <ul className="student-management-list">
                <li><Link to="/courses/addcourse" className="student-link">Add course <DocumentPlusIcon /></Link></li>
                <li><Link to="/courses/allcourses" className="student-link">All courses <QueueListIcon className='' /></Link></li>
            </ul>
        </div>
    )
}

export default CourseManagement




