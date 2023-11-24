const sql_connect = require('../config/db.js');

async function crearRU(ru, callback) {
  try {
    const db = await sql_connect();
    const { rol_id, usuario_id } = ru;
    const query = 'INSERT INTO ru (rol_id, usuario_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [rol_id, usuario_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosRU(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM ru';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerRU(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM ru WHERE id = ?';
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

async function actualizarRU(ru, callback) {
  try {
    const db = await sql_connect();
    const { id, rol_id, usuario_id } = ru;
    const query = 'UPDATE ru SET rol_id = ?, usuario_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [rol_id, usuario_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarRU(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM ru WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearRU,
  obtenerTodosRU,
  obtenerRU,
  actualizarRU,
  eliminarRU
};
