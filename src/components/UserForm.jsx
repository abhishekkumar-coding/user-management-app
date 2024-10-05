// src/components/UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ onClose, onSubmit, user }) => {
  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});

  // Populate form if editing
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setUsername(user.username || '');
      setStreet(user.address?.street || '');
      setCity(user.address?.city || '');
      setCompanyName(user.company?.name || '');
      setWebsite(user.website || '');
    } else {
      // If creating, generate username as 'USER-name' and make it non-editable
      setUsername('USER-');
    }
  }, [user]);

  // Handle input changes
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    // Name: Required, minimum 3 characters
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    // Email: Required, valid format
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      newErrors.email = 'Invalid email format.';
    }

    // Phone: Required, valid format (simple regex)
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (
      !/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(phone.trim())
    ) {
      newErrors.phone = 'Invalid phone number.';
    }

    // Username: Required, minimum 3 characters, non-editable
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    // Address: Street and City are required
    if (!street.trim()) {
      newErrors.street = 'Street is required.';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required.';
    }

    // Company Name: Optional, if provided, at least 3 characters
    if (companyName && companyName.trim().length > 0 && companyName.trim().length < 3) {
      newErrors.companyName = 'Company name must be at least 3 characters.';
    }

    // Website: Optional, if provided, must be valid URL
    if (website && website.trim().length > 0) {
      // Simple URL validation
      try {
        new URL(website.trim());
      } catch (e) {
        newErrors.website = 'Invalid URL.';
      }
    }

    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Prepare user data
      const userData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        username: username.trim(),
        address: {
          street: street.trim(),
          city: city.trim(),
        },
        company: {
          name: companyName.trim(),
        },
        website: website.trim(),
      };
      onSubmit(userData);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{user ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={handleChange(setName)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={handleChange(setEmail)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="text"
              value={phone}
              onChange={handleChange(setPhone)}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Username */}
          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              value={
                user
                  ? username
                  : `USER-${name.trim().replace(/\s+/g, '').toLowerCase()}`
              }
              onChange={handleChange(setUsername)}
              readOnly={!!user} // Make non-editable if editing
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          {/* Address: Street */}
          <div className="form-group">
            <label>Street *</label>
            <input
              type="text"
              value={street}
              onChange={handleChange(setStreet)}
            />
            {errors.street && (
              <span className="error">{errors.street}</span>
            )}
          </div>

          {/* Address: City */}
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              value={city}
              onChange={handleChange(setCity)}
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          {/* Company Name */}
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={handleChange(setCompanyName)}
            />
            {errors.companyName && (
              <span className="error">{errors.companyName}</span>
            )}
          </div>

          {/* Website */}
          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              value={website}
              onChange={handleChange(setWebsite)}
            />
            {errors.website && (
              <span className="error">{errors.website}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit">{user ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
