const sql_connect = require('../config/db.js');

// Función para crear un documento
async function crearDocumento(documento, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { url_doc, estado } = documento;
    const query = 'INSERT INTO documento (url_doc, estado) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [url_doc, estado]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener todos los documentos
async function obtenerTodos(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM documento';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener un documento por ID
async function obtenerDocumento(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM documento WHERE id = ?';
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

// Función para actualizar un documento
async function actualizarDocumento(id, documento, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { url_doc, estado } = documento;
    const query = 'UPDATE documento SET url_doc = ?, estado = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [url_doc, estado, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para eliminar un documento por ID
async function eliminarDocumento(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM documento WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearDocumento,
  obtenerTodos,
  obtenerDocumento,
  actualizarDocumento,
  eliminarDocumento
};
