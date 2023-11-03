const sql_connect = require('../config/db.js');

// Función para crear una institución
async function crearIns(institucion, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre, codigo, url_logo, responsable, sector } = institucion;
    const query = 'INSERT INTO ins (nombre, codigo, url_logo, responsable, sector) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [nombre, codigo, url_logo, responsable, sector]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener todas las instituciones
async function obtenerTodosIns(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM ins';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener una institución por ID
async function obtenerIns(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM ins WHERE id = ?';
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

// Función para actualizar una institución
async function actualizarIns(id, institucion, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre, codigo, url_logo, responsable, sector } = institucion;
    const query = 'UPDATE ins SET nombre = ?, codigo = ?, url_logo = ?, responsable = ?, sector = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, codigo, url_logo, responsable, sector, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para eliminar una institución por ID
async function eliminarIns(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM ins WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearIns,
  obtenerTodosIns,
  obtenerIns,
  actualizarIns,
  eliminarIns
};
