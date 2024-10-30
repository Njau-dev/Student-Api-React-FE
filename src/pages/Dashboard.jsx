import React from 'react';

const Dashboard = () => {
    const userToken = localStorage.getItem('accessToken');

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            {userToken && <p>Your token: {userToken}</p>}
        </div>
    );
};

export default Dashboard;
