import React, { useState } from 'react';
import axios from 'axios';

function UpdateUserForm({ user, onUserUpdated }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/users/${user.id}`, { name, email })
      .then(response => {
        console.log('User updated:', response.data);
        onUserUpdated();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">Update User</button>
    </form>
  );
}

export default UpdateUserForm;
