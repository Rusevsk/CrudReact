import React, { useEffect, useState } from 'react';
import axios from 'axios';


function UserList({ selectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users') // Asegúrate de usar la URL correcta
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const fetchUsers = () => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error:', error));
  };

  const deleteUser = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => {
        fetchUsers(); // Actualiza la lista después de eliminar
      })
      .catch(error => console.error('Error:', error));
  };

 
}

export default UserList;
