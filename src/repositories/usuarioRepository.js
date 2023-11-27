const sql_connect = require('../config/db');

async function crearUsuario(usuario, callback) {
  try {
    const db = await sql_connect();
    const { nombre, correo, clave, estado } = usuario;
    const query = 'INSERT INTO usuario (nombre, correo, clave, estado) VALUES (?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [nombre, correo, clave, estado]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerUsuarioConRolPorCorreo(correo) {
  try {
    const db = await sql_connect();
    const query = `
      SELECT u.*, r.nombre as rol_nombre, r.estado as rol_estado
      FROM usuario u
      LEFT JOIN ru ON u.id = ru.usuario_id
      LEFT JOIN rol r ON ru.rol_id = r.id
      WHERE u.correo = ?;
    `;
    const [result] = await db.promise().query(query, [correo]);
    await db.end();
    return result.length > 0 ? result[0] : null;
  } catch (err) {
    throw err;
  }
}

async function iniciarSesionUsuario(correo, clave, callback) {
  try {
    const usuario = await obtenerUsuarioConRolPorCorreo(correo);

    if (usuario && usuario.clave === clave) {
      callback(null, usuario);
    } else {
      const error = new Error('Credenciales inválidas');
      callback(error, null);
    }
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerTodos(callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM usuario';
    const [results] = await db.promise().query(query);
    await db.end();
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerUsuario(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'SELECT * FROM usuario WHERE id = ?';
    const [results] = await db.promise().query(query, [id]);
    await db.end();

    if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results[0]);
    }
  } catch (err) {
    callback(err, null);
  }
}

async function actualizarUsuario(id, usuario, callback) {
  try {
    const db = await sql_connect();
    const { nombre, correo, clave, estado } = usuario;
    const query = 'UPDATE usuario SET nombre = ?, correo = ?, clave = ?, estado = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombre, correo, clave, estado, id]);
    await db.end();
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarUsuario(id, callback) {
  try {
    const db = await sql_connect();
    const query = 'DELETE FROM usuario WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end();
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
  eliminarUsuario,
  iniciarSesionUsuario
};