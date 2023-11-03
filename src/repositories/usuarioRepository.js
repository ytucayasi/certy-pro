  const sql_connect = require('../config/db');

  // Función para crear un usuario
  async function crearUsuario(usuario, callback) {
    try {
      const db = await sql_connect(); // Establece una conexión a la base de datos
      const { nombre, correo, clave, estado } = usuario;
      const query = 'INSERT INTO usuario (nombre, correo, clave, estado) VALUES (?, ?, ?, ?)';
      const [result] = await db.promise().query(query, [nombre, correo, clave, estado]);
      await db.end(); // Cierra la conexión después de usarla
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  }

  // Función para obtener todos los usuarios
  async function obtenerTodos(callback) {
    try {
      const db = await sql_connect(); // Establece una conexión a la base de datos
      const query = 'SELECT * FROM usuario';
      const [results] = await db.promise().query(query);
      await db.end(); // Cierra la conexión después de usarla
      callback(null, results);
    } catch (err) {
      callback(err, null);
    }
  }

  // Función para obtener un usuario por ID
  async function obtenerUsuario(id, callback) {
    try {
      const db = await sql_connect(); // Establece una conexión a la base de datos
      const query = 'SELECT * FROM usuario WHERE id = ?';
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

  // Función para actualizar un usuario
  async function actualizarUsuario(id, usuario, callback) {
    try {
      const db = await sql_connect(); // Establece una conexión a la base de datos
      const { nombre, correo, clave, estado } = usuario;
      const query = 'UPDATE usuario SET nombre = ?, correo = ?, clave = ?, estado = ? WHERE id = ?';
      const [result] = await db.promise().query(query, [nombre, correo, clave, estado, id]);
      await db.end(); // Cierra la conexión después de usarla
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  }

  // Función para eliminar un usuario por ID
  async function eliminarUsuario(id, callback) {
    try {
      const db = await sql_connect(); // Establece una conexión a la base de datos
      const query = 'DELETE FROM usuario WHERE id = ?';
      const [result] = await db.promise().query(query, [id]);
      await db.end(); // Cierra la conexión después de usarla
      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  }

  module.exports = {
    crearUsuario,
    obtenerTodos,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
  };