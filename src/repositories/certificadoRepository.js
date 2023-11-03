const sql_connect = require('../config/db.js');

// Función para crear un certificado
async function crearCertificado(certificado, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id } = certificado;
    const query = 'INSERT INTO certificado (codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener todos los certificados
async function obtenerTodosCertificados(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM certificado';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener un certificado por ID
async function obtenerCertificado(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM certificado WHERE id = ?';
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

// Función para actualizar un certificado
async function actualizarCertificado(id, certificado, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { codigo, creditos, horas, lugar, fecha_creacion } = certificado;
    const query = 'UPDATE certificado SET codigo = ?, creditos = ?, horas = ?, lugar = ?, fecha_creacion = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [codigo, creditos, horas, lugar, fecha_creacion, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para eliminar un certificado por ID
async function eliminarCertificado(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM certificado WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearCertificado,
  obtenerTodosCertificados,
  obtenerCertificado,
  actualizarCertificado,
  eliminarCertificado
};
