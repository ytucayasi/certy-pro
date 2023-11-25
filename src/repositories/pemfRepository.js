const sql_connect = require('../config/db.js');

async function crearPEMF(pemf, callback) {
  try {
    const db = await sql_connect();
    const { programa_estudio_id, modulo_formativo_id } = pemf;
    const query = 'INSERT INTO pemf (programa_estudio_id, modulo_formativo_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [programa_estudio_id, modulo_formativo_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosPEMF(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pemf';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerPEMF(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pemf WHERE id = ?';
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

async function actualizarPEMF(pemf, callback) {
  try {
    const db = await sql_connect();
    const { id, programa_estudio_id, modulo_formativo_id } = pemf;
    const query = 'UPDATE pemf SET programa_estudio_id = ?, modulo_formativo_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [programa_estudio_id, modulo_formativo_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarPEMF(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM pemf WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPEMF,
  obtenerTodosPEMF,
  obtenerPEMF,
  actualizarPEMF,
  eliminarPEMF
};
