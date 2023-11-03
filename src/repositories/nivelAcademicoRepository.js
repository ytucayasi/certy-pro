const sql_connect = require('../config/db');

// Función para crear un nivel académico
async function crearNivelAcademico(nivelAcademico, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nivel, tipo } = nivelAcademico;
    const query = 'INSERT INTO nivel_academico (nivel, tipo) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [nivel, tipo]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener todos los niveles académicos
async function obtenerTodosNivelesAcademicos(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM nivel_academico';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener un nivel académico por ID
async function obtenerNivelAcademico(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM nivel_academico WHERE id = ?';
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

// Función para actualizar un nivel académico
async function actualizarNivelAcademico(id, nivelAcademico, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nivel, tipo } = nivelAcademico;
    const query = 'UPDATE nivel_academico SET nivel = ?, tipo = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nivel, tipo, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para eliminar un nivel académico por ID
async function eliminarNivelAcademico(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM nivel_academico WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearNivelAcademico,
  obtenerTodosNivelesAcademicos,
  obtenerNivelAcademico,
  actualizarNivelAcademico,
  eliminarNivelAcademico
};