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
        gender: ""
    });


    useEffect(() => {

        const fetchStudent = async () => {

            try {
                const response = await axios.get(`http://localhost:4000/getstudent/${id}`);
                setStudent({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    gender: response.data.gender,
                });

            } catch (err) {
                setError('Could not fetch student data');
                console.log(error);
            }
        };
        fetchStudent();

    }, [id]);


    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:4000/updatestudent/${id}`, student);
            toast.success('Student Updated Successfully')

            navigate('/students/allstudents');
        } catch (err) {
            setError('Could not update student');
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

                <div className="button-group">
                    <button className='view-btn' type="submit">Update Student</button>

                    <button className='delete-btn' type="button" onClick={() => navigate('/students/allstudents')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStudent;
