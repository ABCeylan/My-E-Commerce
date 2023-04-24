import React, { useState, useEffect } from 'react';
import { fetchItem, submitReviewAndUpdateItem } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import './itemPage.css';

const ItemPage = ({ loggedInUser }) => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchItemData = async () => {
            const itemData = await fetchItem(id);
            console.log("itemData:", itemData);
            setItem(itemData);

            console.log("itemData: after fetch", itemData);
            navigate(`/items/${itemData._id}`);
        };

        console.log(loggedInUser);
        if (loggedInUser) {
            fetchItemData();
        }
    }, [id, loggedInUser, navigate]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await submitReviewAndUpdateItem(item._id, loggedInUser, reviewText, rating);
            setItem(response);
            console.log("response:", response);
            // Clear the input fields after submission
            setReviewText('');
            setRating(0);
            alert('Review submitted successfully');
            setReviewText('');
            setRating(1);
            // Fetch updated item data and update the state (e.g., reviews and ratings)
            // ...
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review');
        }
    };

    if (!item) {
        return <div>Loading...</div>;
    }
    return (
        <div className="item-page">
            <h1>{item.name}</h1>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Seller:</strong> {item.seller}</p>
                {item.size && <p><strong>Size:</strong> {item.size}</p>}
                {item.colour && <p><strong>Colour:</strong> {item.colour}</p>}
                {item.spec && <p><strong>Spec:</strong> {item.spec}</p>}
                <p><strong>Average Rating:</strong> {item.rating?.toFixed(1)}</p>
            </div>
            <div className="reviews-container">

                {item.reviews ? item.reviews.map((review, index) => (
                    <div key={index} className="review">
                        <div className="review-header">
                            <strong>User:</strong> {review.userName}
                        </div>
                        <div className="review-header">
                            <strong>Rating:</strong> {review.rating}
                        </div>
                        <div className="review-body">
                            <strong>Review:</strong> {review.text}
                        </div>
                    </div>
                )) : null}
                {loggedInUser && (
                    <div className="submit-review">
                        <h3>Submit a Review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <div>
                                <label htmlFor="review-text">Review:</label>
                                <textarea
                                    id="review-text"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="rating">Rating:</label>
                                <select
                                    id="rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    required
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <button type="submit">Submit Review</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemPage;
