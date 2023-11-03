const db = require('../config/db.js');

function crearUsuario(usuario, callback) {
  const { nombre, correo, clave, estado } = usuario;
  const query = 'INSERT INTO usuario (nombre, correo, clave, estado) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, correo, clave, estado], callback);
}

// Función para obtener todos los usuarios
function obtenerTodos(callback) {
  const query = 'SELECT * FROM usuario';
  db.query(query, (err, results) => {
    callback(err, results);
  });
}

// Función para obtener un usuario por ID
function obtenerUsuario(id, callback) {
  const query = 'SELECT * FROM usuario WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.length === 0) {
        // Devuelve null si no se encontró ningún usuario
        callback(null, null);
      } else {
        // Devuelve el usuario encontrado
        callback(null, results[0]);
      }
    }
  });
}

// Función para actualizar un usuario
function actualizarUsuario(id, usuario, callback) {
  const { nombre, correo, clave, estado } = usuario;
  const query = 'UPDATE usuario SET nombre = ?, correo = ?, clave = ?, estado = ? WHERE id = ?';
  db.query(query, [nombre, correo, clave, estado, id], callback);
}

// Función para eliminar un usuario por ID
function eliminarUsuario(id, callback) {
  const query = 'DELETE FROM usuario WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  crearUsuario,
  obtenerTodos,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
};