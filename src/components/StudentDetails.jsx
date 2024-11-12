import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const StudentDetails = () => {
    const { id } = useParams();
    const [students, setStudents] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/getstudent/${id}`);
                setStudents(response.data);

            } catch (err) {
                setError('Student not found.');
                console.error(err);
            }
        };
        fetchStudent();
    }, [id]);

    if (error) {
        console.error(error);
    }

    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault()

        axios.delete('http://localhost:4000/deletestudent/' + id)
            .then(res => {
                toast.success("Student Deleted Successfully");
                navigate('/students/allstudents');
            })

            .catch(err => {
                toast.error('An error occured while deleting the student')
            })
    }

    return (
        <div className="view-student">

            {students && (
                <article>
                    <h2>Student Details</h2>

                    <p><strong>First Name :</strong> {students.firstname}</p>
                    <p><strong>Last Name :</strong> {students.lastname}</p>
                    <p><strong>Gender :</strong> {students.gender}</p>
                    {/* <p><strong>Course:</strong> {students.course}</p> */}


                    {/* buttons */}
                    <Link to="/students/allstudents">
                        <button className='view-btn'>All students</button>
                    </Link>

                    <Link to={`/students/updatestudent/${students._id}`}>
                        <button className='edit-btn'>
                            Edit Student
                        </button>
                    </Link>

                    <button className='delete-btn' onClick={handleDelete}>
                        Delete Student
                    </button >

                </article>
            )}

            <ToastContainer />

        </div>
    );
}

export default StudentDetails
