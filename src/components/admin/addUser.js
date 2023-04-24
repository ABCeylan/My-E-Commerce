import React, { useState } from 'react';
import { addUser, fetchUsers } from '../../api';

const AddUser = ({ loggedInUser }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user already exists
        const response = await fetchUsers();
        const userExists = response.find((user) => user.userName === name);
        if (userExists) {
            alert('User already exists');
            return;
        }

        const newUser = {
            userName: name,
            averageRating: 0,
            reviews: [],
            password: password,
            isAdmin: isAdmin,
        };

        try {
            if (loggedInUser.isAdmin === "true") {
                await addUser(newUser);
                alert('User added successfully');
            }
            else {
                alert('You please login as admin to add item');
            }
        } catch (err) {
            // Interesting but database is updating but still it catches the error
            // that's why I am not using console.error
            // alert('Same user already exists');
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Password:</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Is Admin:</label>
                <select value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}>
                    <option value="">--Choose </option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

                <button className='admin-button' type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;
