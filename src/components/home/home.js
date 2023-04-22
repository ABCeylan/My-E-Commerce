// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { fetchItems } from '../../api';
import Filter from './filter';

const categories = [
    'Clothing',
    'Computer Components',
    'Monitors',
    'Snacks',
];

function Home() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filter, setFilter] = useState('');
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
            setFilteredItems(fetchedItems);
        }

        fetchData();
    }, []);

    useEffect(() => {
        setFilteredItems(
            items.filter((item) =>
                filter === '' ? true : item.category === filter
            )
        );
    }, [filter, items]);

    const handleLogin = () => {
        // You can add more advanced authentication logic here
        if (username === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <Filter categories={categories} onChange={setFilter} />
            <div>
                <h3>Login</h3>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleLogin}>Submit</button>
            </div>
            {filteredItems.map((item) => (
                <div key={item._id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                    {isAdmin && <p>{item.seller}</p>}
                </div>
            ))}
        </div>
    );
}

export default Home;
