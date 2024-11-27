import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();

    const loadEditCourse = (id) => {
        navigate(`/courses/editCourse/${id}`);
    };

    const loadCourseDetails = (id) => {
        navigate(`/courses/courseDetails/${id}`);
    };

    if (unauthorized) {
        toast.error('Admin privileges required')
    }

    useEffect(() => {
        const userToken = sessionStorage.getItem('accessToken');
        const response = axios.get('http://localhost:4000/getallcourses', {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => {
                if (err) {
                    setUnauthorized(true);
                    console.log(response.data);
                }
            });
    }, []);

    return (
        <div className="d-flex justify-content-center mx-auto col-md-12">
            <div className="mt-3">
                <h3 className="mb-4 text-center">All Courses</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-md">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Class Time</th>
                                <th>Intake</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.course}</td>
                                    <td>{course.classtime}</td>
                                    <td>{course.intake}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="default" id="dropdown-basic" size="md">
                                                Perform Actions
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Link
                                                    to={`/courses/coursedetails/${course.course_id}`}
                                                    className="dropdown-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        loadCourseDetails(course.course_id);
                                                    }}
                                                >
                                                    View Details
                                                </Link>
                                                <Link
                                                    to={`/courses/editcourse/${course.course_id}`}
                                                    className="dropdown-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        loadEditCourse(course.course_id);
                                                    }}
                                                >
                                                    Edit Course
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

export default AllCourses;
