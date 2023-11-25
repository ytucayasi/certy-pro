const sql_connect = require('../config/db.js');

async function crearUDP(udp, callback) {
  try {
    const db = await sql_connect();
    const { unidad_didactica_id, periodo_id } = udp;
    const query = 'INSERT INTO udp (unidad_didactica_id, periodo_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [unidad_didactica_id, periodo_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosUDP(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM udp';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerUDP(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM udp WHERE id = ?';
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

async function actualizarUDP(udp, callback) {
  try {
    const db = await sql_connect();
    const { id, unidad_didactica_id, periodo_id } = udp;
    const query = 'UPDATE udp SET unidad_didactica_id = ?, periodo_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [unidad_didactica_id, periodo_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarUDP(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM udp WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearUDP,
  obtenerTodosUDP,
  obtenerUDP,
  actualizarUDP,
  eliminarUDP
};
