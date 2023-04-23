import React, { useState, useEffect } from 'react';
import { fetchItems, fetchItemsByCategory, loginUser } from './api';
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ItemPage from '../src/components/itemPage';
import ProfilePage from './components/pages/profile';
import LoginPage from './components/pages/loginPage';
import Navbar from './components/navbar';
import HomePage from './components/pages/homePage';
import AdminPage from './components/pages/adminPage';


function App() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLogin = (user) => {
    setLoggedInUser(user);
    navigate('/profile');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const navigate = useNavigate();

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


  return (
    <div className="app">
      <Navbar loggedInUser={loggedInUser} />
      <h1>My Shop</h1>
      <div className="app-container">
        <div className="sidebar">
          <Navbar loggedInUser={loggedInUser} />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage loggedInUser={loggedInUser} />} />
            <Route path="/items/:id" element={<ItemPage loggedInUser={loggedInUser} />} />
            <Route path="/profile" element={<ProfilePage loggedInUser={loggedInUser} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/admin" element={<AdminPage loggedInUser={loggedInUser} />} />
          </Routes>
        </div>
      </div>
    </div >
  );
}

export default App;
