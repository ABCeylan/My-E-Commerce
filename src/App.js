import React, { useState, useEffect } from 'react';
import { fetchItems, fetchItemsByCategory, loginUser } from './api';
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ItemPage from '../src/components/itemPage';
import ProfilePage from './components/pages/profile';
import Navbar from './components/navbar';
import HomePage from './components/pages/homePage';

function App() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      console.log("user: ", user);
      setLoggedInUser(user);
    } catch (err) {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (loggedInUser) {
      console.log("item: ", item)
      navigate(`/items/${item._id}`);
    } else {
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
    <div className="app">
      <Navbar loggedInUser={loggedInUser} />
      <h1>My Shop</h1>

      {/* Render login form if user is not logged in */}
      {!loggedInUser && (
        <div className="login-form">
          <h2>Login</h2>
          <div className="input-row">
            <div className="input-group">
              <label>
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}

      {/* Render logout button if user is logged in */}
      {loggedInUser && (
        <div className="user-info">
          <span>Welcome, {loggedInUser.userName}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div className="app-container">
        <div className="sidebar">
          <Navbar loggedInUser={loggedInUser} />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage loggedInUser={loggedInUser} />} />
            <Route path="/items/:id" element={<ItemPage loggedInUser={loggedInUser} />} />
            <Route path="/profile" element={<ProfilePage loggedInUser={loggedInUser} />} />
            {/* <Route path="/admin" element={<AdminPage loggedInUser={loggedInUser} />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
