import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setIsEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing && editingUser) {
      try {
        const response = await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, { name, email });
        const updatedUser = response.data;
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setMessage(`Usuario actualizado: ${updatedUser.name}`);
      } catch (error) {
        console.error('Error updating user:', error);
        setMessage('Error al actualizar usuario');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/users', { name, email });
        const newUser = response.data;
        setUsers([...users, newUser]);
        setMessage(`Usuario agregado: ${newUser.name}`);
      } catch (error) {
        console.error('Error creating user:', error);
        setMessage('Error al agregar usuario');
      }
    }
    setIsEditing(false);
    setName('');
    setEmail('');
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      setMessage('Usuario eliminado');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Card style={{ margin: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="h2">Administrar Usuarios</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            label="Nombre"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
          </Button>
        </form>

        {message && <Typography color="textSecondary">{message}</Typography>}

        <List>
          <TransitionGroup>
            {users.map((user) => (
              <CSSTransition key={user.id} timeout={500} classNames="user">
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditUser(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }>
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </List>
      </CardContent>
    </Card>
  );
}

export default UserManagement;
