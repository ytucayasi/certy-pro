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
      SELECT estudiante.*, usuario.nombre AS nombre_usuario, usuario.correo, usuario.clave, usuario.estado
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
      SELECT estudiante.*, usuario.nombre AS nombre_usuario, usuario.correo, usuario.clave, usuario.estado
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
  obtenerEstudianteUsuarioPorCod
};
