import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CourseDetails = () => {
    const { course_id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            const userToken = sessionStorage.getItem('accessToken'); // Get the token from session storage
            try {
                const response = await axios.get(`http://localhost:4000/getcourse/${course_id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`, // Pass the token here
                        "Content-Type": "application/json",
                    },
                });
                setCourse(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized access. Please log in as an admin.');
                } else {
                    setError('Course not found.');
                }
                console.error(err);
            }
        };
        fetchCourse();
    }, [course_id]);


    const handleDelete = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:4000/deletecourse/${course_id}`)
            .then(() => {
                toast.success("Course Deleted Successfully");
                navigate('/courses/allcourses');
            })
            .catch(() => {
                toast.error('An error occurred while deleting the course');
            });
    };

    return (
        <div className="view-course">
            {course && (
                <article>
                    <h2>Course Details</h2>
                    <p><strong>Course Name:</strong> {course.course}</p>
                    <p><strong>Class Time:</strong> {course.classtime}</p>
                    <p><strong>Intake:</strong> {course.intake}</p>

                    {/* Buttons */}
                    <Link to="/courses/allcourses">
                        <button className="view-btn">All Courses</button>
                    </Link>
                    <Link to={`/courses/editcourse/${course_id}`}>
                        <button className="edit-btn">Edit Course</button>
                    </Link>
                    <button className="delete-btn" onClick={handleDelete}>
                        Delete Course
                    </button>
                </article>
            )}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default CourseDetails;
