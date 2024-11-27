import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";

const AllStudents = () => {
    const [records, setRecords] = useState([]);
    const [courses, setCourses] = useState({});
    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();

    const loadEdit = (id) => {
        navigate(`/students/updatestudent/${id}`);
    };

    const LoadStudent = (id) => {
        navigate(`/students/studentdetails/${id}`);
    };

    if (unauthorized) {
        toast.error('Admin privileges required')
    }

    // Fetch all students and all courses
    useEffect(() => {
        const fetchStudentsAndCourses = async () => {
            const userToken = sessionStorage.getItem('accessToken');
            try {
                // Fetch students
                const studentRes = await axios.get('http://localhost:4000/getallstudents', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        "Content-Type": "application/json",
                    },
                });
                setRecords(studentRes.data);

                // Fetch courses
                const courseRes = await axios.get('http://localhost:4000/getallcourses', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        "Content-Type": "application/json",
                    },
                });

                // Map course_id to course name for easier lookup
                const courseMap = {};
                courseRes.data.forEach((course) => {
                    courseMap[course.course_id] = course.course;
                });
                setCourses(courseMap);

            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setUnauthorized(true);
                    toast.error('Admin permissions required')
                }
            }
        };

        fetchStudentsAndCourses();
    }, []);

    return (
        <div className='class="d-flex justify-content-center mx-auto col-md-12" table'>
            <div className="mt-3">
                <h3 className="mb-4 text-center">All Students Details</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-md">
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.firstname}</td>
                                    <td>{r.lastname}</td>
                                    <td>{r.gender}</td>
                                    <td>{courses[r.course_id] || "Unknown Course"}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="default" id="dropdown-basic" size="md">
                                                Perform Actions
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Link
                                                    to={`/students/studentdetails/${r.student_id}`}
                                                    className="dropdown-item"
                                                    onClick={(e) => { e.preventDefault(); LoadStudent(r.student_id); }}
                                                >
                                                    Details
                                                </Link>
                                                <Link
                                                    to={`/students/updatestudent/${r.student_id}`}
                                                    className="dropdown-item"
                                                    onClick={(e) => { e.preventDefault(); loadEdit(r.student_id); }}
                                                >
                                                    Edit Student
                                                </Link>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllStudents;
