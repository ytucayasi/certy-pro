const sql_connect = require('../config/db.js');

async function crearProgramaEstudio(programaEstudio, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = programaEstudio;
    const query = 'INSERT INTO programa_estudio (nombre) VALUES (?)';
    const [result] = await db.promise().query(query, [nombre]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosProgramasEstudio(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM programa_estudio';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}



async function obtenerProgramaEstudio(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM programa_estudio WHERE id = ?';
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

async function actualizarProgramaEstudio(id, programaEstudio, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = programaEstudio;
    const query = 'UPDATE programa_estudio SET nombre = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarProgramaEstudio(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM programa_estudio WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearProgramaEstudio,
  obtenerTodosProgramasEstudio,
  obtenerProgramaEstudio,
  actualizarProgramaEstudio,
  eliminarProgramaEstudio,
};
