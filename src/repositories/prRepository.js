const sql_connect = require('../config/db.js');

async function crearPR(pr, callback) {
  try {
    const db = await sql_connect();
    const { privilegio_id, rol_id } = pr;
    const query = 'INSERT INTO pr (privilegio_id, rol_id) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [privilegio_id, rol_id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosPR(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pr';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerPR(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM pr WHERE id = ?';
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

async function actualizarPR(pr, callback) {
  try {
    const db = await sql_connect();
    const { id, privilegio_id, rol_id } = pr;
    const query = 'UPDATE pr SET privilegio_id = ?, rol_id = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [privilegio_id, rol_id, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarPR(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM pr WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPR,
  obtenerTodosPR,
  obtenerPR,
  actualizarPR,
  eliminarPR
};
