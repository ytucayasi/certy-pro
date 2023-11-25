const sql_connect = require('../config/db.js');

async function crearPlanEstudio(planEstudio, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = planEstudio;
    const query = 'INSERT INTO plan_estudio (nombre) VALUES (?)';
    const [result] = await db.promise().query(query, [nombre]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosPlanesEstudio(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM plan_estudio';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerPlanEstudio(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM plan_estudio WHERE id = ?';
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

async function actualizarPlanEstudio(id, planEstudio, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = planEstudio;
    const query = 'UPDATE plan_estudio SET nombre = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarPlanEstudio(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM plan_estudio WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearPlanEstudio,
  obtenerTodosPlanesEstudio,
  obtenerPlanEstudio,
  actualizarPlanEstudio,
  eliminarPlanEstudio
};
