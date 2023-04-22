import React, { useState } from 'react';
import Home from './components/home/home';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (authenticatedUser, isAdmin) => {
    setUser(authenticatedUser);
    setIsAdmin(isAdmin);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <div className="App">
      <h1>E-Commerce App</h1>
      {user ? (
        <div>
          <p>Welcome, {user.userName}! ({isAdmin ? 'Admin' : 'User'})</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Home onLogin={handleLogin} />
      )}
      {/* Add other components and routes here */}
    </div>
  );
}

export default App;
