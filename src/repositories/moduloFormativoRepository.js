const sql_connect = require('../config/db.js');

async function crearModuloFormativo(moduloFormativo, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = moduloFormativo;
    const query = 'INSERT INTO modulo_formativo (nombre) VALUES (?)';
    const [result] = await db.promise().query(query, [nombre]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosModulosFormativo(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM modulo_formativo';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerModuloFormativo(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM modulo_formativo WHERE id = ?';
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

async function actualizarModuloFormativo(id, moduloFormativo, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = moduloFormativo;
    const query = 'UPDATE modulo_formativo SET nombre = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarModuloFormativo(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM modulo_formativo WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearModuloFormativo,
  obtenerTodosModulosFormativo,
  obtenerModuloFormativo,
  actualizarModuloFormativo,
  eliminarModuloFormativo
};
