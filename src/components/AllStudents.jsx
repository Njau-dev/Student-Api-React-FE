import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const AllStudents = () => {
    const [records, setRecords] = useState([]);
    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();

    const loadEdit = (id) => {
        navigate(`/students/updatestudent/${id}`);
    }

    const LoadStudent = (id) => {
        navigate(`/students/studentdetails/${id}`);
    }

    useEffect(() => {
        const userToken = sessionStorage.getItem('accessToken');
        axios
            .get('http://localhost:4000/getallstudents', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            })

            .then((res) => {
                setRecords(res.data);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setUnauthorized(true);
                }
            })
            .finally(() => {

            });
    }, []);

    return (
        <div className='class="d-flex justify-content-center mx-auto col-md-12'>

            <div className="mt-3">

                <h3 className="mb-4 text-center"> All Students Details </h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-md">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.firstname}</td>
                                    <td>{r.lastname}</td>
                                    <td>{r.gender}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="default" id="dropdown-basic" size="md">
                                                Perform Actions
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Link to={`/students/studentdetails/${r._id}`} className="dropdown-item" onClick={(e) => { e.preventDefault(); LoadStudent(r._id) }}>
                                                    Details
                                                </Link>
                                                <Link to={`/students/updatestudent/${r._id}`} className="dropdown-item" onClick={(e) => { e.preventDefault(); loadEdit(r._id) }} >
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