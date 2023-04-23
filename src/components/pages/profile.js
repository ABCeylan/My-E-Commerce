import React, { useState } from 'react';

const ProfilePage = ({ loggedInUser }) => {

    console.log("loggedInUser: ", loggedInUser);
    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <p><strong>Username:</strong> {loggedInUser.userName}</p>
            <p><strong>Average Rating:</strong> {loggedInUser.averageRating !== "" ? loggedInUser.averageRating.toFixed(1) : ""}</p>
            <div className="reviews">
                <h2>Reviews</h2>
                {loggedInUser.reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p>{review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
