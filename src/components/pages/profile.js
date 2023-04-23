// src/components/ProfilePage.js
import React from 'react';
import './profilePage.css';

const ProfilePage = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-page">
            <h2>Your Profile</h2>
            <div className="profile-details">
                <div className="profile-row">
                    <label>Username:</label>
                    <span>{loggedInUser.userName}</span>
                </div>
                <div className="profile-row">
                    <label>Email:</label>
                    <span>{loggedInUser.email}</span>
                </div>
                {/* Add more fields as needed */}
            </div>
        </div>
    );
};

export default ProfilePage;
