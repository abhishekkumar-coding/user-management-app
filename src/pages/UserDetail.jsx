// src/pages/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch user details on component mount
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details.</p>;

  return (
    <div>
      <h2>User Detail</h2>
      <Link to="/">← Back to Home</Link>
      <div className="user-detail">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
        <p><strong>Address:</strong> {`${user.address.street}, ${user.address.city}`}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
      </div>
    </div>
  );
};

export default UserDetail;
