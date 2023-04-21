// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all items
export async function fetchItems() {
    const response = await axios.get(`${API_BASE_URL}/items`);
    return response.data;
}

// Fetch all users
export async function fetchUsers() {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
}