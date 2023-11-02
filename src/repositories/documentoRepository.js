const db = require('../config/db.js');

function crearDocumento(documento, callback) {
  const { url_doc, estado } = documento;
  const query = 'INSERT INTO documento (url_doc, estado) VALUES (?, ?)';
  db.query(query, [url_doc, estado], callback);
}

function obtenerTodos(callback) {
  const query = 'SELECT * FROM documento';
  db.query(query, (err, results) => {
    callback(err, results);
  });
}

function obtenerDocumento(id, callback) {
  const query = 'SELECT * FROM documento WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results[0]);
    }
  });
}

function actualizarDocumento(id, documento, callback) {
  const { url_doc, estado } = documento;
  const query = 'UPDATE documento SET url_doc = ?, estado = ? WHERE id = ?';
  db.query(query, [url_doc, estado, id], callback);
}

function eliminarDocumento(id, callback) {
  const query = 'DELETE FROM documento WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  crearDocumento,
  obtenerTodos,
  obtenerDocumento,
  actualizarDocumento,
  eliminarDocumento
};