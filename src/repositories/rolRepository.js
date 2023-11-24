const sql_connect = require('../config/db.js');

async function crearRol(rol, callback) {
  try {
    const db = await sql_connect();
    const { nombre, estado } = rol;
    const query = 'INSERT INTO rol (nombre, estado) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [nombre, estado]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosRoles(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM rol';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerRol(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM rol WHERE id = ?';
    const [results] = await db.promise().query(query, [id]);
    await db.end();

    if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results[0]);
    }
  } catch (err) {
    callback(err, null);
  }
}

async function actualizarRol(id, rol, callback) {
  try {
    const db = await sql_connect();
    const { nombre, estado } = rol;
    const query = 'UPDATE rol SET nombre = ?, estado = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, estado, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarRol(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM rol WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearRol,
  obtenerTodosRoles,
  obtenerRol,
  actualizarRol,
  eliminarRol
};
