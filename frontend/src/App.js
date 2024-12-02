import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);

  // Define the fetchUsers function
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Call fetchUsers on component mount
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
