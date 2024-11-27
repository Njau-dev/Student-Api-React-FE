import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState();
    const [student, setStudent] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        course_id: "",
    });

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchStudentAndCourses = async () => {
            try {
                // Fetch student details
                const studentResponse = await axios.get(`http://localhost:4000/getstudent/${id}`);
                const fetchedStudent = studentResponse.data;

                setStudent({
                    firstname: fetchedStudent.firstname,
                    lastname: fetchedStudent.lastname,
                    gender: fetchedStudent.gender,
                    course_id: fetchedStudent.course_id, // Pre-select the current course
                });

                // Fetch all courses
                const coursesResponse = await axios.get(`http://localhost:4000/getallcourses`);
                setCourses(coursesResponse.data); // Assuming the response is an array of course objects
            } catch (err) {
                setError('Could not fetch student or courses data');
                console.error(err);
            }
        };

        fetchStudentAndCourses();
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:4000/updatestudent/${id}`, student);
            toast.success('Student Updated Successfully');
            navigate('/students/allstudents');
        } catch (err) {
            setError('Could not update student');
            console.error(err);
        }
    };

    return (
        <div className="edit-student-container">
            <h2>Edit Student Details</h2>

            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstname"
                    value={student.firstname}
                    onChange={handleChange}
                />
                <br />

                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastname"
                    value={student.lastname}
                    onChange={handleChange}
                />
                <br />

                <label>Gender:</label>
                <input
                    type="text"
                    name="gender"
                    value={student.gender}
                    onChange={handleChange}
                />
                <br />

                <label>Course:</label>
                <select
                    name="course_id"
                    value={student.course_id} // Bind the selected course
                    onChange={handleChange} // Update the state on selection
                >
                    <option value="" disabled>
                        Select a course
                    </option>
                    {courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                            {course.course}
                        </option>
                    ))}
                </select>
                <br />

                <div className="button-group">
                    <button className="view-btn" type="submit">
                        Update Student
                    </button>

                    <button
                        className="delete-btn"
                        type="button"
                        onClick={() => navigate('/students/allstudents')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStudent;
