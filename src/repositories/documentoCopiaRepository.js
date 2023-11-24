const sql_connect = require('../config/db.js');

async function crearDocumentoCopia(documentoCopia, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { url_doc, estado, tipo, documento_id } = documentoCopia;
    const query = 'INSERT INTO documento_copia (url_doc, estado, tipo, documento_id) VALUES (?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [url_doc, estado, tipo, documento_id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosDocumentosCopia(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM documento_copia';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerDocumentoCopia(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM documento_copia WHERE id = ?';
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

async function actualizarDocumentoCopia(id, documentoCopia, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { url_doc, estado, tipo, documento_id } = documentoCopia;
    const query = 'UPDATE documento_copia SET url_doc = ?, estado = ?, tipo = ?, documento_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [url_doc, estado, tipo, documento_id, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarDocumentoCopia(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM documento_copia WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearDocumentoCopia,
  obtenerTodosDocumentosCopia,
  obtenerDocumentoCopia,
  actualizarDocumentoCopia,
  eliminarDocumentoCopia
};
