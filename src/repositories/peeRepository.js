const sql_connect = require('../config/db.js');

async function crearPEE(pee, callback) {
  try {
    const db = await sql_connect();
    const { estudiante_id, plan_estudio_id } = pee;
    const query = 'INSERT INTO pee (estudiante_id, plan_estudio_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [estudiante_id, plan_estudio_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosPEE(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pee';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerPEE(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pee WHERE id = ?';
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

async function actualizarPEE(pee, callback) {
  try {
    const db = await sql_connect();
    const { id, estudiante_id, plan_estudio_id } = pee;
    const query = 'UPDATE pee SET estudiante_id = ?, plan_estudio_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [estudiante_id, plan_estudio_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarPEE(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM pee WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPEE,
  obtenerTodosPEE,
  obtenerPEE,
  actualizarPEE,
  eliminarPEE
};
