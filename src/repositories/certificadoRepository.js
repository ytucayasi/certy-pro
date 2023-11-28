const sql_connect = require('../config/db.js');

// Función para crear un certificado
async function crearCertificado(certificado, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre_certificado, tipo, estado, codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id } = certificado;
    const query = 'INSERT INTO certificado (nombre_certificado, tipo, estado, codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [nombre_certificado, tipo, estado, codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerCertificados(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    let query =
      'SELECT ' +
      'certificado.id AS certificado_id, ' +
      'certificado.nombre_certificado, ' +
      'certificado.tipo AS certificado_tipo, ' +
      'certificado.estado AS certificado_estado, ' +
      'certificado.codigo, ' +
      'certificado.creditos, ' +
      'certificado.horas, ' +
      'certificado.lugar, ' +
      'certificado.fecha_creacion, ' +
      
      'estudiante.id AS estudiante_id, ' +
      'estudiante.nombres AS estudiante_nombres, ' +
      'estudiante.apellidos AS estudiante_apellidos, ' +
      'estudiante.dni AS estudiante_dni, ' +
      'estudiante.codigo_universitario, ' +
      'estudiante.usuario_id AS estudiante_usuario_id, ' +
      
      'documento.id AS documento_id, ' +
      'documento.url_doc, ' +
      
      'nivel_academico.id AS nivel_academico_id, ' +
      'nivel_academico.nivel ' +
      
      'FROM certificado ' +
      'JOIN estudiante ON certificado.estudiante_id = estudiante.id ' +
      'JOIN documento ON certificado.documento_id = documento.id ' +
      'JOIN nivel_academico ON certificado.nivel_academico_id = nivel_academico.id';

    if (id) {
      query += ' WHERE certificado.id LIKE ?';
    }

    const [results] = await db.promise().query(query, id ? [`${id}%`] : null);
    await db.end(); // Cierra la conexión después de usarla

    if (id && results.length === 0) {
      callback(null, null);
    } else {
      callback(null, id ? results : results);
    }
  } catch (err) {
    callback(err, null);
  }
}

// Función para actualizar un certificado
async function actualizarCertificado(id, certificado, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre_certificado, tipo, estado, codigo, creditos, horas, lugar, fecha_creacion } = certificado;
    const query = 'UPDATE certificado SET nombre_certificado = ?, tipo = ?, estado = ?, codigo = ?, creditos = ?, horas = ?, lugar = ?, fecha_creacion = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre_certificado, tipo, estado, codigo, creditos, horas, lugar, fecha_creacion, id]);
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
  obtenerCertificados,
  actualizarCertificado,
  eliminarCertificado
};
