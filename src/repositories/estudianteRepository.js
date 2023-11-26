const sql_connect = require('../config/db.js');

// Función para crear un estudiante
async function crearEstudiante(estudiante, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id } = estudiante;
    const query = 'INSERT INTO estudiante (nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(query, [nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function crearUsuarioYEstudiante(datos, callback) {
  try {
    const db = await sql_connect();

    const { nombre, correo, clave, estado, nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento } = datos;

    const usuarioQuery = 'INSERT INTO usuario (nombre, correo, clave, estado) VALUES (?, ?, ?, ?)';
    const [usuarioResult] = await db.promise().query(usuarioQuery, [nombre, correo, clave, estado]);

    const usuarioId = usuarioResult.insertId;

    const estudianteQuery = 'INSERT INTO estudiante (nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [estudianteResult] = await db.promise().query(estudianteQuery, [nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, usuarioId]);

    await db.end();
    callback(null, { usuario: usuarioResult, estudiante: estudianteResult });
  } catch (err) {
    callback(err, null);
  }
}

async function actualizarUsuarioYEstudiante(idUsuario, datos, callback) {
  try {
    const db = await sql_connect();

    const { nombre, correo, clave, estado, nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento } = datos;

    // Actualizar datos del usuario
    const usuarioQuery = 'UPDATE usuario SET nombre=?, correo=?, clave=?, estado=? WHERE id=?';
    await db.promise().query(usuarioQuery, [nombre, correo, clave, estado, idUsuario]);
    console.log(idUsuario);
    // Obtener el ID del estudiante asociado al usuario
    const estudianteIdQuery = 'SELECT * FROM estudiante WHERE usuario_id=?';
    const [estudianteIdResult] = await db.promise().query(estudianteIdQuery, [idUsuario]);
    const estudianteId = estudianteIdResult[0].id;

    // Actualizar datos del estudiante
    const estudianteQuery = 'UPDATE estudiante SET nombres=?, apellidos=?, foto=?, dni=?, codigo_universitario=?, fecha_nacimiento=? WHERE id=?';
    await db.promise().query(estudianteQuery, [nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, estudianteId]);

    await db.end();
    callback(null, { mensaje: 'Usuario y estudiante actualizados exitosamente' });
  } catch (err) {
    callback(err, null);
  }
}

async function eliminarEstudianteYUsuario(idUsuario, callback) {
  try {
    const db = await sql_connect();

    // Obtener el ID del estudiante asociado al usuario
    const estudianteIdQuery = 'SELECT * FROM estudiante WHERE usuario_id=?';
    const [estudianteIdResult] = await db.promise().query(estudianteIdQuery, [idUsuario]);
    const estudianteId = estudianteIdResult[0].id;

    // Eliminar datos del estudiante
    const eliminarEstudianteQuery = 'DELETE FROM estudiante WHERE id=?';
    await db.promise().query(eliminarEstudianteQuery, [estudianteId]);

    // Eliminar datos del usuario
    const eliminarUsuarioQuery = 'DELETE FROM usuario WHERE id=?';
    await db.promise().query(eliminarUsuarioQuery, [idUsuario]);

    await db.end();
    callback(null, { mensaje: 'Estudiante y usuario eliminados exitosamente' });
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener todos los estudiantes
async function obtenerTodosEstudiantes(callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM estudiante';
    const [results] = await db.promise().query(query);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, results);
  } catch (err) {
    callback(err, null);
  }
}

// Función para obtener un estudiante por ID
async function obtenerEstudiante(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'SELECT * FROM estudiante WHERE id = ?';
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

// Función para obtener un estudiante y la relación con su usuario
async function obtenerEstudianteUsuario(callback) {
  try {
    const db = await sql_connect();
    const query = `
      SELECT estudiante.*, usuario.nombre, usuario.correo, usuario.clave, usuario.estado
      FROM estudiante
      INNER JOIN usuario ON estudiante.usuario_id = usuario.id
    `;
    const [results] = await db.promise().query(query);
    await db.end();
    if (results.length === 0) {
      callback(null, results);
    } else {
      callback(null, results);
    }
  } catch (err) {
    callback(err, null);
  }
}

async function obtenerEstudianteUsuarioPorCod(cod, callback) {
  try {
    const db = await sql_connect();
    const query = `
      SELECT estudiante.*, usuario.nombre, usuario.correo, usuario.clave, usuario.estado
      FROM estudiante
      INNER JOIN usuario ON estudiante.usuario_id = usuario.id
      WHERE estudiante.codigo_universitario LIKE ?
    `;
    const [results] = await db.promise().query(query, [`${cod}%`]);
    await db.end();
    if (results.length === 0) {
      callback(null, null);
    } else {
      callback(null, results);
    }
  } catch (err) {
    callback(err, null);
  }
}

// Función para actualizar un estudiante
async function actualizarEstudiante(id, estudiante, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const { nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento } = estudiante;
    const query = 'UPDATE estudiante SET nombres = ?, apellidos = ?, foto = ?, dni = ?, codigo_universitario = ?, fecha_nacimiento = ? WHERE id = ?';
    const [result] = await db.promise().query(query, [nombres, apellidos, foto, dni, codigo_universitario, fecha_nacimiento, id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

// Función para eliminar un estudiante por ID
async function eliminarEstudiante(id, callback) {
  try {
    const db = await sql_connect(); // Establece una conexión a la base de datos
    const query = 'DELETE FROM estudiante WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    await db.end(); // Cierra la conexión después de usarla
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  crearEstudiante,
  obtenerTodosEstudiantes,
  obtenerEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudianteUsuario,
  obtenerEstudianteUsuarioPorCod,
  crearUsuarioYEstudiante,
  actualizarUsuarioYEstudiante,
  eliminarEstudianteYUsuario
};
