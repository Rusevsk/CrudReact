const { Pool } = require('pg');

// Configuración del pool de conexiones a PostgreSQL
const pool = new Pool({
  user: 'postgres',          // Tu usuario de PostgreSQL
  host: 'localhost',           // Host donde corre PostgreSQL
  database: 'CapitalPress', // Nombre de tu base de datos
  password: '123456',   // Tu contraseña de PostgreSQL
  port: 5432,                  // Puerto donde corre PostgreSQL (el puerto predeterminado es 5432)
});

module.exports = pool;
