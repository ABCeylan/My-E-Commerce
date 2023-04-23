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
                console.log("usersResponse:", usersData);
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
                                {user.userName} - {user.averageRating}
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
