const db = require('../config/db.js');

function crearIns(ins, callback) {
  const { nombre, codigo, url_logo, responsable, sector } = ins;
  const query = 'INSERT INTO ins (nombre, codigo, url_logo, responsable, sector) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, codigo, url_logo, responsable, sector], callback);
}

function obtenerTodosIns(callback) {
  const query = 'SELECT * FROM ins';
  db.query(query, (err, results) => {
    callback(err, results);
  });
}

function obtenerIns(id, callback) {
  const query = 'SELECT * FROM ins WHERE id = ?';
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

function actualizarIns(id, ins, callback) {
  const { nombre, codigo, url_logo, responsable, sector } = ins;
  const query = 'UPDATE ins SET nombre = ?, codigo = ?, url_logo = ?, responsable = ?, sector = ? WHERE id = ?';
  db.query(query, [nombre, codigo, url_logo, responsable, sector, id], callback);
}

function eliminarIns(id, callback) {
  const query = 'DELETE FROM ins WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  crearIns,
  obtenerTodosIns,
  obtenerIns,
  actualizarIns,
  eliminarIns
};
