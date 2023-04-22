import React, { useEffect, useState } from 'react';
import { fetchItems, fetchUsers } from './api';

function App() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const itemsData = await fetchItems();
      setItems(itemsData);
      const usersData = await fetchUsers();
      setUsers(usersData);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;