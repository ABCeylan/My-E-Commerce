import React, { useState, useEffect } from 'react';
import { fetchItems, removeItem } from '../../api';

const RemoveItem = ({ loggedInUser }) => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const itemsData = await fetchItems();
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (loggedInUser.isAdmin === "true") {
                await removeItem(selectedItem);
                setItems(items.filter((item) => item._id !== selectedItem));
                setSelectedItem('');
                alert('Item removed successfully');
            }
            else {
                alert('You please login as admin to remove item');
            }
        } catch (err) {
            console.error('Error removing item:', err);
            alert('Failed to remove item');
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading items...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Item to remove:</label>
                    <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                        <option value="">--Choose an item--</option>
                        {items.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name} - {item.description}
                            </option>
                        ))}
                    </select>
                    <button className='admin-button' type="submit">Remove Item</button>
                </form>
            )}
        </div>
    );
};

export default RemoveItem;
