const sql_connect = require('../config/db.js');

async function crearPEPE(pepe, callback) {
  try {
    const db = await sql_connect();
    const { plan_estudio_id, programa_estudio_id } = pepe;
    const query = 'INSERT INTO pepe (plan_estudio_id, programa_estudio_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [plan_estudio_id, programa_estudio_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosPEPE(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pepe';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerPEPE(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pepe WHERE id = ?';
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

async function actualizarPEPE(pepe, callback) {
  try {
    const db = await sql_connect();
    const { id, plan_estudio_id, programa_estudio_id } = pepe;
    const query = 'UPDATE pepe SET plan_estudio_id = ?, programa_estudio_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [plan_estudio_id, programa_estudio_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarPEPE(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM pepe WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPEPE,
  obtenerTodosPEPE,
  obtenerPEPE,
  actualizarPEPE,
  eliminarPEPE
};
