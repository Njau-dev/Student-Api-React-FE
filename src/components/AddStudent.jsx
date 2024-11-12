import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS for styling

const AddStudent = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        gender: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const saveStudent = async (e) => {
        e.preventDefault();
        try {
            const userToken = sessionStorage.getItem('accessToken');
            await axios.post('http://localhost:4000/addstudent', data, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Student added successfully!");
        } catch (error) {
            toast.error("Failed to add student. Please try again.");
        }
    };


    return (
        <div className="form-container">
            <h2>Add New Student</h2>
            <form onSubmit={saveStudent}>
                <div>
                    <label>Firstname:</label>
                    <input type="text" name="firstname" placeholder="Enter first name" onChange={handleChange} required />
                </div>
                <div>
                    <label>Lastname:</label>
                    <input type="text" name="lastname" placeholder="Enter last name" onChange={handleChange} required />
                </div>
                <div>
                    <label>Gender:</label>
                    <input type="text" name="gender" placeholder="Enter gender" onChange={handleChange} required />
                </div>
                <button type="submit">Add Student</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddStudent;