const sql_connect = require('../config/db.js');

async function crearUnidadDidactica(unidadDidactica, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = unidadDidactica;
    const query = 'INSERT INTO unidad_didactica (nombre) VALUES (?)';
    const [result] = await db.promise().query(query, [nombre]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodosUnidadesDidactica(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM unidad_didactica';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerUnidadDidactica(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM unidad_didactica WHERE id = ?';
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

async function actualizarUnidadDidactica(id, unidadDidactica, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre } = unidadDidactica;
    const query = 'UPDATE unidad_didactica SET nombre = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarUnidadDidactica(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM unidad_didactica WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearUnidadDidactica,
  obtenerTodosUnidadesDidactica,
  obtenerUnidadDidactica,
  actualizarUnidadDidactica,
  eliminarUnidadDidactica
};
