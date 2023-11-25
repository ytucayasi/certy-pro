const sql_connect = require('../config/db.js');

async function crearMFUC(mfuc, callback) {
  try {
    const db = await sql_connect();
    const { modulo_formativo_id, unidad_competencia_id } = mfuc;
    const query = 'INSERT INTO mfuc (modulo_formativo_id, unidad_competencia_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [modulo_formativo_id, unidad_competencia_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosMFUC(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM mfuc';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerMFUC(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM mfuc WHERE id = ?';
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

async function actualizarMFUC(mfuc, callback) {
  try {
    const db = await sql_connect();
    const { id, modulo_formativo_id, unidad_competencia_id } = mfuc;
    const query = 'UPDATE mfuc SET modulo_formativo_id = ?, unidad_competencia_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [modulo_formativo_id, unidad_competencia_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarMFUC(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM mfuc WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearMFUC,
  obtenerTodosMFUC,
  obtenerMFUC,
  actualizarMFUC,
  eliminarMFUC
};
