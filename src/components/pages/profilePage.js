// src/components/ProfilePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profilePage.css';

const ProfilePage = ({ loggedInUser, onAfterLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onAfterLogout();
        navigate('/');
    };

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
                    <label>Rating:</label>
                    <span>{loggedInUser.averageRating}</span>
                </div>
                <button className='profile-button' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ProfilePage;
