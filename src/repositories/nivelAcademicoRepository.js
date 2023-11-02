const db = require('../config/db.js');

function crearNivelAcademico(nivelAcademico, callback) {
  const { nivel, tipo } = nivelAcademico;
  const query = 'INSERT INTO nivel_academico (nivel, tipo) VALUES (?, ?)';
  db.query(query, [nivel, tipo], callback);
}

function obtenerTodosNivelesAcademicos(callback) {
  const query = 'SELECT * FROM nivel_academico';
  db.query(query, (err, results) => {
    callback(err, results);
  });
}

function obtenerNivelAcademico(id, callback) {
  const query = 'SELECT * FROM nivel_academico WHERE id = ?';
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

function actualizarNivelAcademico(id, nivelAcademico, callback) {
  const { nivel, tipo } = nivelAcademico;
  const query = 'UPDATE nivel_academico SET nivel = ?, tipo = ? WHERE id = ?';
  db.query(query, [nivel, tipo, id], callback);
}

function eliminarNivelAcademico(id, callback) {
  const query = 'DELETE FROM nivel_academico WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  crearNivelAcademico,
  obtenerTodosNivelesAcademicos,
  obtenerNivelAcademico,
  actualizarNivelAcademico,
  eliminarNivelAcademico
};