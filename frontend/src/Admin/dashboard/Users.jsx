import React, { useEffect, useState } from 'react';
import { getUsers, blockUser, unblockUser } from '../../services/api';
import './User.css'; // Import CSS for styling

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsers();
        setUsers(result?.users || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (id) => {
    try {
      await blockUser(id);
      setUsers(users.map(user => user._id === id ? { ...user, isBlocked: true } : user));
    } catch (err) {
      console.error("Error blocking user", err);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockUser(id);
      setUsers(users.map(user => user._id === id ? { ...user, isBlocked: false } : user));
    } catch (err) {
      console.error("Error unblocking user", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="users-container">
      <h2>All Users</h2>
      {users.length === 0 && <p>No users found</p>}

      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
              <td>
                {user.isBlocked ? (
                  <button className="unblock-btn" onClick={() => handleUnblock(user._id)}>Unblock</button>
                ) : (
                  <button className="block-btn" onClick={() => handleBlock(user._id)}>Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
