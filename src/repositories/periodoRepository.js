const sql_connect = require('../config/db');

async function crearPeriodo(periodo, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre, horas, creditos } = periodo;
    const query = 'INSERT INTO periodo (nombre, horas, creditos) VALUES (?, ?, ?)';
    const [result] = await db.promise().query(query, [nombre, horas, creditos]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodos(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM periodo';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerPeriodo(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM periodo WHERE id = ?';
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

async function actualizarPeriodo(id, periodo, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre, horas, creditos } = periodo;
    const query = 'UPDATE periodo SET nombre = ?, horas = ?, creditos = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, horas, creditos, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarPeriodo(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM periodo WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPeriodo,
  obtenerTodos,
  obtenerPeriodo,
  actualizarPeriodo,
  eliminarPeriodo
};
