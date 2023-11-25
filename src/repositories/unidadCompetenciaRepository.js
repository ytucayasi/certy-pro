const sql_connect = require('../config/db.js');

async function crearUnidadCompetencia(unidadCompetencia, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = unidadCompetencia;
    const query = 'INSERT INTO unidad_competencia (nombre) VALUES (?)';
    const [result] = await db.promise().query(query, [nombre]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosUnidadesCompetencia(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM unidad_competencia';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerUnidadCompetencia(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM unidad_competencia WHERE id = ?';
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

async function actualizarUnidadCompetencia(id, unidadCompetencia, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = unidadCompetencia;
    const query = 'UPDATE unidad_competencia SET nombre = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarUnidadCompetencia(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM unidad_competencia WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearUnidadCompetencia,
  obtenerTodosUnidadesCompetencia,
  obtenerUnidadCompetencia,
  actualizarUnidadCompetencia,
  eliminarUnidadCompetencia
};
