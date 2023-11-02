const db = require('../config/db.js');

function crearCertificado(certificado, callback) {
  const { codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id } = certificado;
  const query = 'INSERT INTO certificado (codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [codigo, creditos, horas, lugar, fecha_creacion, nivel_academico_id, documento_id, estudiante_id], callback);
}

function obtenerTodosCertificados(callback) {
  const query = 'SELECT * FROM certificado';
  db.query(query, (err, results) => {
    callback(err, results);
  });
}

function obtenerCertificado(id, callback) {
  const query = 'SELECT * FROM certificado WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.length === 0) {
        callback(null, null);
      } else {
        callback(null, results[0]);
      }
    }
  });
}

function actualizarCertificado(id, certificado, callback) {
  const { codigo, creditos, horas, lugar, fecha_creacion } = certificado;
  const query = 'UPDATE certificado SET codigo = ?, creditos = ?, horas = ?, lugar = ?, fecha_creacion = ? WHERE id = ?';
  db.query(query, [codigo, creditos, horas, lugar, fecha_creacion, id], callback);
}

function eliminarCertificado(id, callback) {
  const query = 'DELETE FROM certificado WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  crearCertificado,
  obtenerTodosCertificados,
  obtenerCertificado,
  actualizarCertificado,
  eliminarCertificado
};
