// src/components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserReviews } from '../../api';
import './profilePage.css';

const ProfilePage = ({ loggedInUser, onAfterLogout }) => {
    const navigate = useNavigate();
    const [userReviews, setUserReviews] = useState([]);
    const [userRating, setUserRating] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (loggedInUser) {
                try {
                    const reviews = await fetchUserReviews(loggedInUser._id);
                    setUserReviews(reviews);

                    let totalReviews = reviews.length;
                    let totalRating = 0;
                    for (let i = 0; i < totalReviews; i++) {
                        totalRating += reviews[i].rating;
                    }
                    let averageRating = totalRating / totalReviews;
                    setUserRating(averageRating);
                } catch (err) {
                    console.error("Error fetching user reviews:", err);
                }
            }
        };

        fetchReviews();
    }, [loggedInUser]);

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
                    <label>Average Rating:</label>
                    <span>{userRating}</span>
                </div>
                {userReviews.length > 0 ? userReviews.map((review, index) => (
                    <div key={index} className="review">
                        <div className="review-header">
                            <strong>Item:</strong> {review.itemName}
                        </div>
                        <div className="review-body">
                            <strong>Review:</strong> {review.reviewText}
                        </div>
                        <div className="review-body">
                            <strong>Rating:</strong> {review.rating}
                        </div>
                    </div>
                )) : <div>No reviews yet.</div>}
                <button className='profile-button' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ProfilePage;
