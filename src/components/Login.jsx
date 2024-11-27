import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, error, loading } = useContext(AuthContext); // Get login function and error from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const loginUser = async (e) => {
        e.preventDefault();
        await login(email, password, () => navigate("/dashboard"));
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p onClick={() => navigate('/register')}>
                Don't have an account? <span>Register here.</span>
            </p>
        </div>
    );
}

export default Login;