require('dotenv').config(); // Cargar las variables de entorno desde .env

// sql_connect.js

const mysql = require('mysql2');

// Conexión a la base de datos
function sql_connect() {
  return new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE 
    });

    db.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

module.exports = sql_connect; // Exporta la función
