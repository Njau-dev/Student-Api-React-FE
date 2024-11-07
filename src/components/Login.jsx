// In Login.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Login = ({ setUserToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:4000/login', { email, password });
            const accessToken = response.data.accessToken;

            // Set token in local storage and update state in App
            localStorage.setItem('accessToken', accessToken);
            setUserToken(accessToken);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p onClick={() => navigate('/register')}>
                Don't have an account? <span>Register here.</span>
            </p>
        </div>
    );
};

export default Login;
