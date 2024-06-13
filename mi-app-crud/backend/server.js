const express = require('express');
const app = express();
const pool = require('../database/db'); // Ajusta la ruta según tu estructura de proyecto
const cors = require('cors');
app.use(cors());


app.use(express.json()); // Middleware para parsear JSON

// Puerto donde correrá el servidor
const PORT = process.env.PORT || 5000;

// Endpoint para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    console.log("Fetching all users...");
    try {
      const { rows } = await pool.query('SELECT * FROM usuarios');
      console.log(`Retrieved ${rows.length} users.`);
      res.json(rows);
    } catch (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).send('Server error');
    }
  });
  
// Endpoint para crear un nuevo usuario
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    console.log(`Attempting to insert a new user: Name: ${name}, Email: ${email}`);
    try {
      const newUser = await pool.query(
        'INSERT INTO usuarios (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      console.log('User inserted:', newUser.rows[0]);
      res.status(201).json(newUser.rows[0]);
    } catch (err) {
      console.error("Error inserting new user:", err.message);
      res.status(500).send('Server error');
    }
  });

  

// Endpoint para actualizar un usuario
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateUser = await pool.query(
      'UPDATE usuarios SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    if (updateUser.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint para eliminar un usuario
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING *',
      [id]
    );
    if (deleteUser.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
