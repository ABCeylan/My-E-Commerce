// src/api.js
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3001/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all items
export async function fetchItems() {
    const response = await axios.get(`${API_BASE_URL}/items`);
    console.log(response.data);
    return response.data;
}

// Fetch item by id
export async function fetchItem(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/items/${id}`);
        console.log(response.data);
        if (response.status !== 200) {
            throw new Error(`Error fetching item with ID: ${id}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error in fetchItem function:', error);
        throw error;
    }
}

// Fetch all users
export async function fetchUsers() {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
}

export async function fetchItemsByCategory(category) {
    const response = await axios.get(`${API_BASE_URL}/items/category/${category}`);
    return response.data;
}

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(API_BASE_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (err) {
        console.error('Error logging in:', err);
        throw err;
    }
};

export const addItem = async (itemData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/items`, itemData);
        console.log("addItem: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
};

// Remove an item by ID
export const removeItem = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/items/${id}`);
        return response.data;

    }
    catch (error) {
        console.error('Error removing item:', error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
}

// Remove an user by ID
export const removeUser = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error removing user:', error);
        throw error;
    }
};
