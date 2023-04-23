import React, { useState, useEffect } from 'react';
import { fetchItem } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import sundress from '../assets/sundress.jpeg';

const ItemPage = ({ loggedInUser }) => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchItemData = async () => {
            const itemData = await fetchItem(id);
            console.log("itemData:", itemData);
            setItem(itemData);

            // Navigate after the item data has been fetched and state has been set
            console.log("itemData: after fetch", itemData);
            navigate(`/items/${itemData._id}`);
        };

        console.log(loggedInUser);
        if (loggedInUser) {
            fetchItemData();
        }
    }, [id, loggedInUser, navigate]);

    if (!item) {
        return <div>Loading...</div>;
    }
    return (
        <div className="item-page">
            <h1>{item.name}</h1>
            <img src={sundress} alt={item.name} className="item-image" />
            <div className="item-details">
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Seller:</strong> {item.seller}</p>
                {item.size && <p><strong>Size:</strong> {item.size}</p>}
                {item.colour && <p><strong>Colour:</strong> {item.colour}</p>}
                {item.spec && <p><strong>Spec:</strong> {item.spec}</p>}
                <p><strong>Average Rating:</strong> {item.rating.toFixed(1)}</p>
            </div>
            <div className="reviews">
                <h2>Reviews</h2>
                {item.reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p>{review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemPage;