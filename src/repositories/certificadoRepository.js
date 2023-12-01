const sql_connect = require('../config/db.js');

// Función para crear un certificado
async function crearCertificado(certificado, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombre_certificado, tipo, estado_certificado, codigo, creditos, horas, lugar, fecha_creacion, documento_id, estudiante_id } = certificado;
    const query = 'INSERT INTO certificado (nombre_certificado, tipo, estado_certificado, codigo, creditos, horas, lugar, fecha_creacion, documento_id, estudiante_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [nombre_certificado, tipo, estado_certificado, codigo, creditos, horas, lugar, fecha_creacion, documento_id, estudiante_id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function actualizarDocumentoDesdeCertificado(certificadoId, nuevoDocumento, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos

    // Obtiene el ID del documento asociado al certificado
    const obtenerDocumentoIdQuery = 'SELECT documento_id FROM certificado WHERE id = ?';
    const [documentoIdResult] = await db.promise().query(obtenerDocumentoIdQuery, [certificadoId]);

    if (documentoIdResult.length === 0) {
      // El certificado no existe
      throw new Error('Certificado no encontrado');
    }

    const documentoId = documentoIdResult[0].documento_id;

    // Actualiza el documento en la base de datos
    const { url_doc, estado } = nuevoDocumento;
    const actualizarDocumentoQuery = 'UPDATE documento SET url_doc = ?, estado = ? WHERE id = ?';
    const [resultado] = await db.promise().query(actualizarDocumentoQuery, [url_doc, estado, documentoId]);

    // Cierra la conexión después de usarla
    await db.end();

    // Llama al callback con el resultado
    callback(null, resultado);
  } catch (err) {
    callback(err, null);
  }
}

async function crearDocumentoYCertificado(documento, certificado, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos

    // Inserta el documento en la base de datos
    console.log(documento);
    console.log(certificado);
    const { url_doc, estado } = documento;
    const documentoQuery = 'INSERT INTO documento (url_doc, estado) VALUES (?, ?)';
    const [documentoResult] = await db.promise().query(documentoQuery, [url_doc, estado]);

    // Obtiene el ID del documento recién creado
    const documento_id = documentoResult.insertId;

    // Inserta el certificado en la base de datos con el ID del documento
    const { nombre_certificado, tipo, estado_certificado, codigo, creditos, horas, lugar, fecha_inicio, fecha_fin, fecha_creacion, estudiante_id } = certificado;
    const certificadoQuery = 'INSERT INTO certificado (nombre_certificado, tipo, estado_certificado, codigo, creditos, horas, lugar, fecha_inicio, fecha_fin, fecha_creacion, documento_id, estudiante_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [certificadoResult] = await db.promise().query(certificadoQuery, [nombre_certificado, tipo, estado_certificado, codigo, creditos, horas, lugar, fecha_inicio, fecha_fin, fecha_creacion, documento_id, estudiante_id]);

    // Cierra la conexión después de usarla
    await db.end();

    // Llama al callback con el resultado
    callback(null, { documento: documentoResult, certificado: certificadoResult });
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
      'certificado.estado_certificado AS certificado_estado, ' +
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
      'documento.url_doc ' + // Eliminé la coma innecesaria al final de esta línea

      'FROM certificado ' +
      'JOIN estudiante ON certificado.estudiante_id = estudiante.id ' +
      'JOIN documento ON certificado.documento_id = documento.id ';

    if (id) {
      query += ' WHERE certificado.id LIKE ?';
    }

    const [results] = await db.promise().query(query, id ? [`${id}%`] : null);
    await db.end(); // Cierra la conexión después de usarla

    if (id && results.length === 0) {
      callback(null, null);
    } else {
      callback(null, id ? results[0] : results);
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
  eliminarCertificado,
  crearDocumentoYCertificado,
  actualizarDocumentoDesdeCertificado
};