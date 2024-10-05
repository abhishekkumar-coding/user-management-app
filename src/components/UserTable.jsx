// src/components/UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import ConfirmationModal from './ConfirmationModal';
import { Link } from 'react-router-dom';

const UserTable = () => {
  const [users, setUsers] = useState([]); // List of users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isFormOpen, setIsFormOpen] = useState(false); // Form modal visibility
  const [currentUser, setCurrentUser] = useState(null); // User being edited
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal visibility
  const [userToDelete, setUserToDelete] = useState(null); // User to delete
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
        setLoading(false);
      });
  };

  // Function to handle form submission (create/update)
  const handleFormSubmit = (user) => {
    if (currentUser) {
      // Update user
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`, user)
        .then((response) => {
          // Update user in state
          setUsers(
            users.map((u) => (u.id === currentUser.id ? response.data : u))
          );
          setIsFormOpen(false);
          setCurrentUser(null);
        })
        .catch((err) => {
          console.error('Error updating user:', err);
          alert('Failed to update user.');
        });
    } else {
      // Create new user
      axios
        .post('https://jsonplaceholder.typicode.com/users', user)
        .then((response) => {
          // Since JSONPlaceholder doesn't save the data, simulate ID
          const newUser = { ...response.data, id: users.length + 1 };
          setUsers([...users, newUser]);
          setIsFormOpen(false);
        })
        .catch((err) => {
          console.error('Error creating user:', err);
          alert('Failed to create user.');
        });
    }
  };

  // Function to open edit form
  const openEditForm = (user) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  // Function to open delete confirmation
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Function to handle delete confirmation
  const handleDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userToDelete.id}`)
      .then(() => {
        // Remove user from state
        setUsers(users.filter((u) => u.id !== userToDelete.id));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
        alert('Failed to delete user.');
      });
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="table-header">
        <button onClick={() => setIsFormOpen(true)}>Create User</button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            >
              <td>{user.id}</td>
              <td>
                <Link to={`/user/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => openEditForm(user)}>Edit</button>
                <button onClick={() => openDeleteModal(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Form Modal */}
      {isFormOpen && (
        <UserForm
          onClose={() => {
            setIsFormOpen(false);
            setCurrentUser(null);
          }}
          onSubmit={handleFormSubmit}
          user={currentUser}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${userToDelete.name}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
