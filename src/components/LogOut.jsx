import React from "react";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

const LogOut = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout(); // This will trigger both client-side and server-side logout
        } catch (error) {
            console.error(
                "Error during logout:",
                error.response?.data.error || error.message
            );
            // Handle error scenario, e.g., display an error message to the user
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <p>Are you sure you want to log out?</p>
                <button className="delete-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Adjust as needed
    },
    content: {
        textAlign: "center",
    },
};

export default LogOut;