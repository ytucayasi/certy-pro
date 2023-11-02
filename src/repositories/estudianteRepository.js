const db = require('../config/db.js');

function crearEstudiante(estudiante, callback) {
  const { nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id } = estudiante;
  const query = 'INSERT INTO estudiante (nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id], callback);
}

function obtenerTodosEstudiantes(callback) {
  const query = 'SELECT * FROM estudiante';
  db.query(query, (err, results) => {
    callback(err, results);
  });
}

function obtenerEstudiante(id, callback) {
  const query = 'SELECT * FROM estudiante WHERE id = ?';
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

function actualizarEstudiante(id, estudiante, callback) {
  const { nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento } = estudiante;
  const query = 'UPDATE estudiante SET nombres = ?, apellidos = ?, foto = ?, dni = ?, codigo_universitario = ?, fecha_nacimiento = ? WHERE id = ?';
  db.query(query, [nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, id], callback);
}

function eliminarEstudiante(id, callback) {
  const query = 'DELETE FROM estudiante WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  crearEstudiante,
  obtenerTodosEstudiantes,
  obtenerEstudiante,
  actualizarEstudiante,
  eliminarEstudiante
};
