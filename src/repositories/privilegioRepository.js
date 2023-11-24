const sql_connect = require('../config/db.js');

// Función para crear un privilegio
async function crearPrivilegio(privilegio, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre, estado } = privilegio;
    const query = 'INSERT INTO privilegio (nombre, estado) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [nombre, estado]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener todos los privilegios
async function obtenerTodosPrivilegios(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM privilegio';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener un privilegio por ID
async function obtenerPrivilegio(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM privilegio WHERE id = ?';
    const [results] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla

    if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results[0]);
    }
  } catch (err) {
    callback(err, null);
  }
}

// Función para actualizar un privilegio
async function actualizarPrivilegio(id, privilegio, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre, estado } = privilegio;
    const query = 'UPDATE privilegio SET nombre = ?, estado = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, estado, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para eliminar un privilegio por ID
async function eliminarPrivilegio(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM privilegio WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPrivilegio,
  obtenerTodosPrivilegios,
  obtenerPrivilegio,
  actualizarPrivilegio,
  eliminarPrivilegio
};
