const sql_connect = require('../config/db.js');

async function crearUCUD(ucud, callback) {
  try {
    const db = await sql_connect();
    const { unidad_competencia_id, unidad_didactica_id } = ucud;
    const query = 'INSERT INTO ucud (unidad_competencia_id, unidad_didactica_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [unidad_competencia_id, unidad_didactica_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosUCUD(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM ucud';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerUCUD(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM ucud WHERE id = ?';
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

async function actualizarUCUD(ucud, callback) {
  try {
    const db = await sql_connect();
    const { id, unidad_competencia_id, unidad_didactica_id } = ucud;
    const query = 'UPDATE ucud SET unidad_competencia_id = ?, unidad_didactica_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [unidad_competencia_id, unidad_didactica_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarUCUD(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM ucud WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearUCUD,
  obtenerTodosUCUD,
  obtenerUCUD,
  actualizarUCUD,
  eliminarUCUD
};
