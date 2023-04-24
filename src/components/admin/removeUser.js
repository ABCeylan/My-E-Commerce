import React, { useState, useEffect } from 'react';
import { fetchUsers, removeUser } from '../../api';

const RemoveUser = ({ loggedInUser }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // check if admin tries to remove himself and is logged in
            if (selectedUser !== loggedInUser._id && loggedInUser.isAdmin === "true") {
                await removeUser(selectedUser);
                setUsers(users.filter((user) => user._id !== selectedUser));
                setSelectedUser('');
                alert('User removed successfully');
            }
            else {
                alert('You cannot remove yourself');
            }
        } catch (err) {
            console.error('Error removing user:', err);
            alert('Failed to remove user');
        }
    };

    const userRatingCalculation = (user) => {
        let rating = 0;
        if (user.reviews.length > 0) {
            for (let i = 0; i < user.reviews.length; i++) {
                rating += user.reviews[i].rating;
            }
            rating = rating / user.reviews.length;
        }
        return rating.toFixed(2);
    }

    return (
        <div>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>User to remove:</label>
                    <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">--Choose a user--</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.userName} - {userRatingCalculation(user)}
                            </option>
                        ))}
                    </select>
                    <button className='admin-button' type="submit">Remove User</button>
                </form>
            )}
        </div>
    );
};

export default RemoveUser;
