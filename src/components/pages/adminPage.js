import React, { useState } from 'react';
import AddItem from '../admin/addItem';
import RemoveItem from '../admin/removeItem';
import AddUser from '../admin/addUser';
import RemoveUser from '../admin/removeUser';
import './adminPage.css';


const AdminPage = ({ loggedInUser }) => {
    const [selectedAction, setSelectedAction] = useState('');

    const renderSelectedAction = () => {
        switch (selectedAction) {
            case 'addItem':
                return <AddItem />;
            case 'removeItem':
                return <RemoveItem />;
            case 'addUser':
                return <AddUser />;
            case 'removeUser':
                return <RemoveUser loggedInUser={loggedInUser} />;
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="admin-buttons-container">
                <button className='admin-button' onClick={() => setSelectedAction('addItem')}>Add Item</button>
                <button className='admin-button' onClick={() => setSelectedAction('removeItem')}>Remove Item</button>
                <button className='admin-button' onClick={() => setSelectedAction('addUser')}>Add User</button>
                <button className='admin-button' onClick={() => setSelectedAction('removeUser')}>Remove User</button>
            </div>
            <div className="admin-action-container">{renderSelectedAction()}</div>
        </div>
    );
};

export default AdminPage;