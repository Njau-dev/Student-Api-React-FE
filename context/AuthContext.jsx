import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const navigate = useNavigate();

    const login = async (email, password, onSuccess) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.post("http://localhost:4000/login", {
                email,
                password,
            });

            const token = response.data.accessToken;
            if (typeof token === "string") {
                setIsAuthenticated(true);
                sessionStorage.setItem("accessToken", token); // Save token
                onSuccess(); // Call success callback, like navigation
            } else {
                setError("Login failed: No token received.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed: An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export both as named exports
export { AuthContext, AuthProvider };