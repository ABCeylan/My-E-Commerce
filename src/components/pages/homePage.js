import React, { useState, useEffect } from 'react';
import { fetchItems, fetchItemsByCategory } from '../../api';
import { Link } from 'react-router-dom';
import sundress from "../../assets/sundress.jpeg";

const HomePage = ({ loggedInUser }) => {
    const [currentCategory, setCurrentCategory] = useState('All');
    const [filteredItems, setFilteredItems] = useState([]);

    const handleItemClick = (item) => {
        if (!loggedInUser) {
            alert('Please log in to view item details.');
        }
    };

    const filterItemsByCategory = async (category) => {
        setCurrentCategory(category);

        let items;
        if (category === 'All') {
            items = await fetchItems();
        } else {
            items = await fetchItemsByCategory(category);
        }
        setFilteredItems(items);
    };

    useEffect(() => {
        filterItemsByCategory(currentCategory);
    }, [currentCategory]);

    const categories = ['All', 'Clothing', 'Computer Components', 'Monitors', 'Snacks'];

    return (
        <div>
            {/* Render category buttons */}
            <div className="category-container">
                <div className="category-buttons">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-button${currentCategory === category ? ' active' : ''}`}
                            onClick={() => filterItemsByCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Render items */}
            <div className="item-buttons">
                {filteredItems.map((item) => (
                    <Link
                        key={item._id}
                        to={loggedInUser ? `/items/${item._id}` : '#'}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="item-container" onClick={() => handleItemClick(item)}>
                            <img src={sundress} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
